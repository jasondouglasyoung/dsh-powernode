[CmdletBinding()]
param(
    [Parameter(Mandatory)]
    [ValidateNotNullOrEmpty()]
    [string]$Tarball,
    [ValidateNotNullOrEmpty()]
    [string]$Profile = 'web',
    [ValidateNotNullOrEmpty()]
    [string]$DshHome = (Join-Path ([Environment]::GetFolderPath('UserProfile')) '.dsh-workflow-integration')
)

$ErrorActionPreference = 'Stop'
$PSNativeCommandUseErrorActionPreference = $false
$ProjectRoot = Split-Path -Parent $PSScriptRoot
$ResolvedTarball = [System.IO.Path]::GetFullPath((Join-Path $ProjectRoot $Tarball))
if (-not (Test-Path -LiteralPath $ResolvedTarball -PathType Leaf)) {
    throw "Package tarball not found: $ResolvedTarball"
}

$VersionFile = Join-Path $ProjectRoot 'dsh-version.txt'
$DshVersion = (Get-Content -LiteralPath $VersionFile -Raw -Encoding utf8).Trim()
if ($DshVersion -notmatch '^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$') {
    throw "Invalid exact DSH version in $VersionFile"
}

$env:DSH_HOME = [System.IO.Path]::GetFullPath($DshHome)
$ToolsDirectory = Join-Path $env:DSH_HOME 'tools'
$null = New-Item -ItemType Directory -Path $ToolsDirectory -Force
$ProfileDirectory = Join-Path (Join-Path $env:DSH_HOME 'profiles') $Profile
if (-not (Test-Path -LiteralPath $ProfileDirectory -PathType Container)) {
    $ShippedProfiles = @('acp', 'web', 'headless', 'sdk', 'sdk-minimal')
    if ($Profile -in $ShippedProfiles) {
        # Let the official plugin command initialize a shipped profile from its own template.
        Write-Host "DSH will initialize its shipped '$Profile' profile during plugin installation."
    } else {
        Write-Host "Initializing custom profile '$Profile' from the DSH web template"
        $PreviousErrorActionPreference = $ErrorActionPreference
        $ErrorActionPreference = 'Continue'
        & npx.cmd --yes "@deepseek-ai/dsh@$DshVersion" --profile $Profile --from-default-profile web --dump-config > $null
        $InitializeExitCode = $LASTEXITCODE
        $ErrorActionPreference = $PreviousErrorActionPreference
        if ($InitializeExitCode -ne 0) {
            throw "DSH web profile initialization failed with exit code $InitializeExitCode"
        }
    }
}

# DSH's profile plugin manager invokes pnpm by name. Corepack is installed here,
# but pnpm itself is not on PATH, so this profile-local shim forwards that call.
$PnpmShim = Join-Path $ToolsDirectory 'pnpm.cmd'
Set-Content -LiteralPath $PnpmShim -Encoding ascii -Value "@echo off`r`ncorepack pnpm %*`r`n"
$env:PATH = "$ToolsDirectory;$env:PATH"

$Address = "file:$($ResolvedTarball.Replace('\', '/'))"
Write-Host "Installing $Address into isolated DSH profile '$Profile'"
Write-Host "DSH_HOME=$env:DSH_HOME"
Write-Host "DSH version: $DshVersion"

$PreviousErrorActionPreference = $ErrorActionPreference
$ErrorActionPreference = 'Continue'
& npx.cmd --yes "@deepseek-ai/dsh@$DshVersion" plugin --profile $Profile add $Address 2>&1 | ForEach-Object {
    $Line = [string]$_
    $Line = $Line -replace '(?i)([?&](?:token|access_token|auth)=)\S+', '$1[redacted]'
    $Line = $Line -replace '(?i)\bsk-[A-Za-z0-9_-]{12,}\b', '[redacted-api-key]'
    Write-Output $Line
}
$ExitCode = $LASTEXITCODE
$ErrorActionPreference = $PreviousErrorActionPreference
if ($ExitCode -ne 0) {
    throw "DSH plugin install failed with exit code $ExitCode"
}
Write-Host 'Plugin install completed.'
