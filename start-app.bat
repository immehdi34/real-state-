@echo off
set "PATH=C:\Users\khuee\.node-portable;%PATH%"
echo ========================================================
echo   Launching AuraEstates Full-Stack Portal
echo   React.js (Port 3000) + Express.js (Port 5000) + Supabase
echo ========================================================

start "AuraEstates Backend" cmd /k "cd /d \"%~dp0backend\" && node server.js"
start "AuraEstates Frontend" cmd /k "cd /d \"%~dp0frontend\" && npm run dev"

echo.
echo Servers starting up!
echo Frontend: http://localhost:3000
echo Backend:  http://localhost:5000/api/health
echo.
pause
