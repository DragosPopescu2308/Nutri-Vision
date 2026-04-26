@echo off
REM NutriVision - Quick Start Script for Windows

setlocal enabledelayedexpansion

echo 🥗 NutriVision - Application Launcher
echo ====================================
echo.
echo Alege o optiune:
echo 1) Porneste ambele (Backend + Frontend)
echo 2) Porneste doar Backend
echo 3) Porneste doar Frontend
echo 4) Instaleaza dependente Frontend
echo.

set /p choice="Introdu optiunea (1-4): "

if "%choice%"=="1" (
    echo Pornind Backend si Frontend...
    REM Backend in separate window
    start "NutriVision Backend" cmd /k "mvn spring-boot:run"
    timeout /t 5 /nobreak
    REM Frontend in separate window
    start "NutriVision Frontend" cmd /k "cd frontend && npm start"
    echo ✅ Backend si Frontend pornite!
) else if "%choice%"=="2" (
    echo Pornind Backend...
    mvn spring-boot:run
) else if "%choice%"=="3" (
    echo Pornind Frontend...
    cd frontend
    npm start
) else if "%choice%"=="4" (
    echo Instaland dependente Frontend...
    cd frontend
    npm install
    echo ✅ Instalare completa!
) else (
    echo Optiune invalida!
    exit /b 1
)

endlocal

