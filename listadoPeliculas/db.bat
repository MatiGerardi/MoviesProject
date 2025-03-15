@echo off
REM Cambia estas variables según sea necesario
set MYSQL_PATH="C:\Program Files\MySQL\MySQL Server 9.0\bin\mysql.exe"
set DATABASE_NAME=moviesdb
set SQL_FILE="C:\Users\Matias\Documents\PaginasWeb\listadoPeliculas\sql\moviesdb.sql"
set USERNAME=root
set PASSWORD=43740254

REM Ejecutar el script SQL
%MYSQL_PATH% -u %USERNAME% -p%PASSWORD% %DATABASE_NAME% < %SQL_FILE%

echo Script SQL ejecutado con exito.
pause