@echo off
setlocal
set SCRIPT_DIR=%~dp0
if "%BROWSER%"=="" set BROWSER=builder
if "%PORT%"=="" set PORT=8000
python "%SCRIPT_DIR%serve.py" %*
