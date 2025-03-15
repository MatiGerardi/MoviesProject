@echo off
cd /d "C:\Users\Matias\Documents\PaginasWeb\backendPeliculas"
start cmd /k "node server.js"

timeout /t 2

cd /d "C:\Users\Matias\Documents\PaginasWeb\listadoPeliculas"
start cmd /k "npm run dev"

timeout /t 2

cd /d "C:\Users\Matias\Documents\PaginasWeb\listadoPeliculas"
start cmd /k "code ."
