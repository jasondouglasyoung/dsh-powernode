[CmdletBinding()]
param(
    [ValidateRange(1, 65535)]
    [int]$Port = 3080,
    [ValidateNotNullOrEmpty()]
    [string]$Profile = 'web',
    [ValidateNotNullOrEmpty()]
    [string]$DshHome = (Join-Path ([Environment]::GetFolderPath('UserProfile')) '.dsh-workflow-dev'),
    [switch]$NoOpen
)

$ErrorActionPreference = 'Stop'
$PSNativeCommandUseErrorActionPreference = $false
$ProjectRoot = Split-Path -Parent $PSScriptRoot
Set-Location -LiteralPath $ProjectRoot
$VersionFile = Join-Path $ProjectRoot 'dsh-version.txt'
$DshVersion = (Get-Content -LiteralPath $VersionFile -Raw).Trim()
if ($DshVersion -notmatch '^\d+\.\d+\.\d+(?:-[0-9A-Za-z.-]+)?$') {
    throw "Invalid exact DSH version in $VersionFile"
}

$env:DSH_HOME = [System.IO.Path]::GetFullPath($DshHome)
$ProfileDirectory = Join-Path (Join-Path $env:DSH_HOME 'profiles') $Profile
$ProfileManifestPath = Join-Path $ProfileDirectory 'package.json'
$HasWebBundle = $Profile -eq 'web'
if (Test-Path -LiteralPath $ProfileManifestPath -PathType Leaf) {
    try {
        $ProfileManifest = Get-Content -LiteralPath $ProfileManifestPath -Raw -Encoding UTF8 | ConvertFrom-Json
    } catch {
        throw "Cannot read DSH profile manifest: $ProfileManifestPath"
    }
    $Bundles = @($ProfileManifest.dsh.profile.bundles)
    $HasWebBundle = $HasWebBundle -or ($Bundles -contains '@deepseek-ai/dsh-web-app')
} elseif ($Profile -ne 'web') {
    throw "DSH profile '$Profile' does not exist under the isolated DSH_HOME. Initialize it with the official DSH plugin command first."
}
if (-not $HasWebBundle) {
    throw "DSH profile '$Profile' does not mount @deepseek-ai/dsh-web-app, so it cannot serve a Web UI or listen on -Port. Use the shipped 'web' profile or a profile that includes this bundle."
}
New-Item -ItemType Directory -Force -Path $env:DSH_HOME | Out-Null
Write-Host "Starting @deepseek-ai/dsh@$DshVersion profile '$Profile'"
Write-Host "DSH_HOME=$env:DSH_HOME"
Write-Host 'Waiting for DSH Web startup; the listener is verified after its ready event.'
Write-Host 'Stop with Ctrl+C. This process does not modify your normal DSH home.'

$LaunchArgs = @('--profile', $Profile, '--port', [string]$Port)
if ($NoOpen) { $LaunchArgs += '--no-open' }
# DSH can print a one-time local browser access token in its startup URL.
# Filter access tokens and API-key-shaped strings before writing child output.
& npx.cmd --yes "@deepseek-ai/dsh@$DshVersion" @LaunchArgs 2>&1 | ForEach-Object {
    $Line = [string]$_
    $Line = $Line -replace '(?i)([?&](?:token|access_token|auth)=)\S+', '$1[redacted]'
    $Line = $Line -replace '(?i)\bsk-[A-Za-z0-9_-]{12,}\b', '[redacted-api-key]'
    Write-Output $Line
    $ReadyEvent = [regex]::Match($Line, '^dsh web: (?<uri>https?://(?<host>127\.0\.0\.1|localhost):(?<port>\d+))(?:/|\?|$)')
    if ($ReadyEvent.Success) {
        $Ready = $false
        for ($Attempt = 0; $Attempt -lt 15 -and -not $Ready; $Attempt++) {
            $Client = [System.Net.Sockets.TcpClient]::new()
            try {
                $Connect = $Client.ConnectAsync($ReadyEvent.Groups['host'].Value, [int]$ReadyEvent.Groups['port'].Value)
                if ($Connect.Wait(500)) {
                    $null = $Connect.GetAwaiter().GetResult()
                    $Ready = $Client.Connected
                }
            } catch {
                $Ready = $false
            } finally {
                $Client.Dispose()
            }
            if (-not $Ready) { Start-Sleep -Milliseconds 200 }
        }
        if ($Ready) {
            Write-Output "Verified listener: $($ReadyEvent.Groups['uri'].Value)"
        } else {
            Write-Warning "DSH reported a Web URL, but no TCP listener accepted a connection on port $($ReadyEvent.Groups['port'].Value)."
        }
    }
}
$ExitCode = $LASTEXITCODE
exit $ExitCode
