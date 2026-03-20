@echo off
REM ═══════════════════════════════════════════════════════════════
REM  Archificials Report Renderer
REM
REM  HOW TO USE:
REM    1. Drag and drop a .md file onto this icon
REM    2. The branded HTML infographic appears next to the .md file
REM
REM  Or double-click to be prompted for the file path.
REM ═══════════════════════════════════════════════════════════════

set SCRIPT_DIR=%~dp0
set RENDERER=%SCRIPT_DIR%engine\render-report.js

if "%~1"=="" (
    echo.
    echo   Archificials Report Renderer
    echo   ────────────────────────────
    echo.
    echo   Drag a .md file onto this icon, or paste the path below.
    echo.
    set /p INPUT_FILE="  File path: "
) else (
    set INPUT_FILE=%~1
)

if "%INPUT_FILE%"=="" (
    echo   No file provided. Exiting.
    pause
    exit /b 1
)

echo.
node "%RENDERER%" "%INPUT_FILE%"
echo.
pause
