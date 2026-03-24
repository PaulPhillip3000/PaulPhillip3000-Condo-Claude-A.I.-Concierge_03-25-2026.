@echo off
echo Starting CondoClaw AI Concierge...
echo.

:: ── Kill any old backend process on port 8000 ─────────────────────────────
echo Stopping any running backend...
for /f "tokens=5" %%a in ('netstat -aon 2^>nul ^| findstr ":8000 " ^| findstr "LISTENING"') do (
    taskkill /f /pid %%a >nul 2>&1
)
timeout /t 2 /nobreak >nul

:: ── Kill any old frontend process on port 5173 ────────────────────────────
for /f "tokens=5" %%a in ('netstat -aon 2^>nul ^| findstr ":5173 " ^| findstr "LISTENING"') do (
    taskkill /f /pid %%a >nul 2>&1
)
timeout /t 1 /nobreak >nul

:: ── Clear ALL stale Python bytecode cache ─────────────────────────────────
if exist "%~dp0__pycache__" (
    rmdir /s /q "%~dp0__pycache__"
    echo Cleared stale bytecode cache.
)

:: ── Use full Python 3.12 path to avoid Windows App Store stub ─────────────
set PYTHON312=C:\Users\gz144\AppData\Local\Programs\Python\Python312\python.exe

:: ── Start Backend ──────────────────────────────────────────────────────────
start "CondoClaw Backend" cmd /k "cd /d %~dp0 && "%PYTHON312%" backend.py"

:: ── Start Frontend ─────────────────────────────────────────────────────────
start "CondoClaw Frontend" cmd /k "cd /d %~dp0\frontend && npm run dev"

echo Waiting for services to start...
timeout /t 6 /nobreak >nul

echo Opening Dashboard...
start http://localhost:5173

echo.
echo Everything is running! Keep the two black windows open while you work.
pause
