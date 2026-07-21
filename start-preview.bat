@echo off
cd /d "%~dp0"
set PORT=3002
echo Starting LitBuy local preview...
echo.
echo Open this URL in your browser:
echo http://127.0.0.1:3002/finds.html
echo.
"C:\Users\chu\.cache\codex-runtimes\codex-primary-runtime\dependencies\node\bin\node.exe" serve.js
echo.
echo Preview server stopped.
pause
