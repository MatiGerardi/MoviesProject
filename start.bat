@echo off
cd /d "C:\Users\Matias\Documents\PaginasWeb\Peliculas\backendPeliculas"
start cmd /k "node --watch server.js"

timeout /t 2

cd /d "C:\Users\Matias\Documents\PaginasWeb\Peliculas\listadoPeliculas"
start cmd /k "npm run dev"

timeout /t 2

cd /d "C:\Users\Matias\Documents\PaginasWeb\Peliculas"
start cmd /k "code ."

exit