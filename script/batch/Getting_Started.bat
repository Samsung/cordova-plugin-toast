@echo off
echo ================ Getting Started with TOAST!
set projectName=""
set /p projectName="What's the root directory's name? (default is 'toast') "

if %projectName%=="" (
	set projectName=toast
)

echo ================ Copy repositories
mkdir %projectName%
cd %projectName%
git clone https://github.com/apache/cordova-js.git
git clone https://github.com/apache/cordova-browser.git
git clone https://github.com/Samsung/cordova-plugin-toast.git
git clone https://github.com/Samsung/cordova-sectv-orsay.git
git clone https://github.com/Samsung/cordova-sectv-tizen.git
git clone https://github.com/Samsung/cordova-tv-webos.git
git clone https://github.com/Samsung/grunt-cordova-sectv.git

echo ================ Install npm modules each repositories
cd cordova-js
call npm install
cd ..

cd cordova-sectv-orsay
call npm install
cd ..

cd cordova-sectv-tizen
call npm install
cd ..

cd cordova-tv-webos
call npm install
cd ..

cd cordova-plugin-toast
call npm install
cd ..

cd grunt-cordova-sectv
call npm install
cd ..

echo ================ Add compile task in 'Gruntfile.js'
cd cordova-js
call cscript ../../replace.vbs
cd ..

echo ================ Compile project
cd cordova-js
call grunt compile:sectv-orsay compile:sectv-tizen compile:tv-webos
cd ..

cd cordova-plugin-toast
call grunt compile:sectv-orsay compile:sectv-tizen compile:tv-webos
cd ..

echo ================ Create TestRunner cordova application
set templateSrc=""
set /p templateSrc="What's the source of template ? (default is empty project) "

if not %templateSrc%=="" (
	set templateSrc=--template=%templateSrc%
)

set applicationFolderName=""
set /p applicationFolderName="What's the application's folder name? (default is 'TestApp') "

if %applicationFolderName%=="" (
	set applicationFolderName=TestApp
)

echo ================ Create cordova project
call cordova create %applicationFolderName% %templateSrc%
cd %applicationFolderName%

xcopy ..\grunt-cordova-sectv\sample\* .\ /y /s
call npm install ../grunt-cordova-sectv

call npm install

call cordova platform add browser

call cordova plugin add cordova-plugin-device
call cordova plugin add cordova-plugin-network-information
call cordova plugin add cordova-plugin-globalization

call cordova plugin add ../cordova-plugin-toast

cd www/
call cscript ../../../delete.vbs
call cscript ../../../insert.vbs
cd ../

echo ================ Prepare for sectv-orsay platform
call grunt sectv-prepare:sectv-orsay

echo ================ Prepare for sectv-tizen platform
call grunt sectv-prepare:sectv-tizen

echo ================ Prepare for tv-webos platform
call grunt sectv-prepare:tv-webos


set temp=""
set /p temp="Please set some information for build with reference of wiki in github (Done:Enter) "

echo ================ Build and package for sectv-orsay platform
call grunt sectv-build:sectv-orsay

echo ================ Build and package for sectv-tizen platform
call grunt sectv-build:sectv-tizen

echo ================ Build and package for tv-webos platform
call grunt sectv-build:tv-webos

echo ================ Build and package on browser platform
call cordova build browser
call cordova emulate browser

cd ..