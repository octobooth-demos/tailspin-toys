# Starts the Flask API (port 5100) and Astro client (port 4321) on Windows.
$ErrorActionPreference = 'Stop'
$root = Resolve-Path (Join-Path $PSScriptRoot '..')

# Create venv and install dependencies if needed
$venvPython = Join-Path $root 'venv\Scripts\python.exe'
if (-not (Test-Path $venvPython)) {
    Write-Host 'Creating virtual environment...'
    # 'python' on this machine is the Microsoft Store stub; use the py launcher
    py -3 -m venv (Join-Path $root 'venv')
}
Write-Host 'Installing Python dependencies...'
& $venvPython -m pip install -q -r (Join-Path $root 'server\requirements.txt')

Write-Host 'Installing client dependencies...'
Push-Location (Join-Path $root 'client')
npm install
Pop-Location

Write-Host 'Starting API (Flask) server...'
$env:FLASK_DEBUG = '1'
$env:FLASK_PORT = '5100'
$server = Start-Process -FilePath $venvPython -ArgumentList 'app.py' `
    -WorkingDirectory (Join-Path $root 'server') -NoNewWindow -PassThru

Write-Host 'Starting client (Astro)...'
$client = Start-Process -FilePath 'npm.cmd' -ArgumentList 'run', 'dev', '--', '--no-clearScreen' `
    -WorkingDirectory (Join-Path $root 'client') -NoNewWindow -PassThru

Start-Sleep -Seconds 5
Write-Host "`nServer (Flask) running at: http://localhost:5100" -ForegroundColor Green
Write-Host "Client (Astro) server running at: http://localhost:4321`n" -ForegroundColor Green
Write-Host 'Ctrl-C to stop the servers'

try {
    Wait-Process -Id $server.Id, $client.Id -ErrorAction SilentlyContinue
}
finally {
    Write-Host 'Shutting down servers...'
    foreach ($p in @($server, $client)) {
        if ($p -and -not $p.HasExited) { taskkill /PID $p.Id /T /F | Out-Null }
    }
}
