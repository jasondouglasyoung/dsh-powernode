[CmdletBinding()]
param(
    [string]$Destination,
    [switch]$NoOpen
)

$ErrorActionPreference = 'Stop'
$PackageRoot = $PSScriptRoot
$Manifest = Get-Content -LiteralPath (Join-Path $PackageRoot 'package.json') -Raw -Encoding UTF8 | ConvertFrom-Json
if ($Manifest.name -ne 'dsh-workflow-plugin' -or $Manifest.version -notmatch '^0\.1\.0-alpha\.\d+$') {
    throw 'This folder is not a supported DSH Powernode package. Extract the complete ZIP first.'
}
$RequiredFiles = @('package.json', 'cordis.patch.yml', 'README.md', 'LICENSE', 'THIRD_PARTY_NOTICES.md')
foreach ($Relative in @('lib/index.js', 'lib/client.js', 'lib/typert.host.js') + $RequiredFiles) {
    if (-not (Test-Path -LiteralPath (Join-Path $PackageRoot $Relative) -PathType Leaf)) {
        throw "Package is incomplete: $Relative. Extract the entire ZIP and retry."
    }
}
if ([string]::IsNullOrWhiteSpace($Destination)) {
    $Destination = Join-Path ([Environment]::GetFolderPath('LocalApplicationData')) "DSH\Plugins\dsh-workflow-plugin\$($Manifest.version)\package"
}
$InstallRoot = [IO.Path]::GetFullPath($Destination)
$SourceRoot = [IO.Path]::GetFullPath($PackageRoot).TrimEnd('\', '/')
if ($InstallRoot.TrimEnd('\', '/') -eq $SourceRoot) {
    throw 'Choose an installation folder different from the extracted download folder.'
}
# Refuse to overwrite an existing, different installation or unrelated files.
$Payload = @($RequiredFiles | ForEach-Object { Get-Item -LiteralPath (Join-Path $PackageRoot $_) }) + @(Get-ChildItem -LiteralPath (Join-Path $PackageRoot 'lib') -Recurse -File)
foreach ($File in $Payload) {
    $Relative = $File.FullName.Substring($SourceRoot.Length + 1)
    $Target = Join-Path $InstallRoot $Relative
    if (Test-Path -LiteralPath $Target) {
        if (-not (Test-Path -LiteralPath $Target -PathType Leaf) -or (Get-FileHash -LiteralPath $File.FullName).Hash -ne (Get-FileHash -LiteralPath $Target).Hash) {
            throw "An existing installation differs at $Relative. Keep it and choose a new installation folder."
        }
    }
}
$null = New-Item -ItemType Directory -Path $InstallRoot -Force
foreach ($File in $Payload) {
    $Relative = $File.FullName.Substring($SourceRoot.Length + 1)
    $Target = Join-Path $InstallRoot $Relative
    $null = New-Item -ItemType Directory -Path (Split-Path -Parent $Target) -Force
    Copy-Item -LiteralPath $File.FullName -Destination $Target
}
Set-Content -LiteralPath (Join-Path $PackageRoot 'INSTALL-PATH.txt') -Value $InstallRoot -Encoding UTF8
Write-Host ''
Write-Host "DSH Powernode $($Manifest.version) files are ready."
Write-Host 'Open Harness -> Plugins -> Add plugin, and select this folder:'
Write-Host $InstallRoot -ForegroundColor Green
Write-Host 'Then enable dsh-workflow-plugin. Keep the installed folder in place.'
Write-Host 'The path is also saved in INSTALL-PATH.txt next to this script.'
if (-not $NoOpen) { Invoke-Item -LiteralPath $InstallRoot }
