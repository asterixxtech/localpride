@echo off

set nhc=apps\nhcolor.exe
set hidec=apps\hidec.exe
set nginx=apps\nginx\nginx.exe
set mysql=apps\mysql\bin\mysqld.exe
set mysql_config=apps\mysql\my.ini
set mysql_log=var\log\mysql
set php_cgi=apps\php\php-cgi.exe

:Menu
set Mode =
cls
%nhc% 04 ==================================
%nhc% 04 LOCALPRIDE FOR WINDOWS
%nhc% 01 Welcome back, %USERNAME%
%nhc% 04 ==================================

%nhc% 04 ==== CONTROL MENU
echo 1. Start All                  6. Start Harp  
echo 2. Stop All                   
echo 3. Start NGINX
echo 4. Start MySQL
echo 5. Start PHP FCGI

%nhc% 04 ==== TOOLS MENU
echo 7. Project Generator
%nhc% 04 ==== OTHER MENU
echo 0. Exit

set /P Mode=Please choose a option:
if "%MODE%"=="0" exit
if "%MODE%"=="1" goto StartAll
if "%MODE%"=="2" goto StopAll
if "%MODE%"=="3" goto StartNginx
if "%MODE%"=="4" goto StartMysql
if "%MODE%"=="5" goto StartFcgi
if "%MODE%"=="6" goto StartHarp
if "%MODE%"=="7" goto ProjectGenerator
if "%MODE%"=="" goto NotFound

:StartAll
echo Starting NGINX...
start apps\nginx\nginx.exe
echo Starting MySQL...
start %hidec% /w %mysql% --defaults-file=%mysql_config% --log-error=%mysql_log% --console
echo Starting PHP FCGI...
start %hidec% /w %php_cgi% -b 127.0.0.1:9000
echo Server started successfully!
echo Please Wait 30 second to make sure MySQL is running.
pause
goto Menu

:StopAll
echo Stopping all services...
taskkill /F /IM nginx.exe
taskkill /F /IM nginx.exe
taskkill /F /IM nginx.exe
taskkill /F /IM mysqld.exe
taskkill /F /IM php-cgi.exe
echo Done.
pause
goto Menu

:StartNginx
echo Starting NGINX...
start apps\nginx\nginx.exe
echo Done.
pause
goto Menu

:StartMysql
echo Starting MySQL...
start %hidec% /w %mysql% --defaults-file=%mysql_config% --log-error=%mysql_log% --console
echo Done.
echo Please Wait 30 second to make sure MySQL is running.
pause
goto Menu

:StartFcgi
echo Starting PHP FCGI...
start %hidec% /w %php_cgi% -b 127.0.0.1:9000
echo Done.
pause
goto Menu

:StartHarp
start harp --port 1000 www/html

:ProjectGenerator
call apps\generator.bat

:NotFound
echo Not found
pause
goto Menu