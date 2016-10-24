echo "================ Getting Started with TOAST!"
echo -n "================ What's the root directory's name? (default is 'toast') "
read projectName
if [ -z "$projectName" ]
then
	projectName="toast"
fi

echo "================ Copy repositories"
mkdir "$projectName"
cd "$projectName"
git clone https://github.com/apache/cordova-js.git
git clone https://github.com/apache/cordova-browser.git
git clone https://github.com/Samsung/cordova-plugin-toast.git
git clone https://github.com/Samsung/cordova-sectv-orsay.git
git clone https://github.com/Samsung/cordova-sectv-tizen.git
git clone https://github.com/Samsung/cordova-tv-webos.git
git clone https://github.com/Samsung/grunt-cordova-sectv.git

echo "================ Install npm modules each repositories"
cd cordova-js
npm install
cd ..

cd cordova-sectv-orsay
npm install
cd ..

cd cordova-sectv-tizen
npm install
cd ..

cd cordova-tv-webos
npm install
cd ..

cd cordova-plugin-toast
npm install
cd ..

cd grunt-cordova-sectv
npm install
cd ..

echo "================ Add compile task in 'Gruntfile.js'"
cd cordova-js
sed -e "s/compile: {/compile: {\"sectv-orsay\": {},\"sectv-tizen\": {},\"tv-webos\": {},/g" Gruntfile.js > Gruntfile.js.tmp && mv Gruntfile.js.tmp Gruntfile.js
sed -e "s/\"cordova-platforms\": {/\"cordova-platforms\": {\"cordova-sectv-orsay\": \"..\/cordova-sectv-orsay\",\"cordova-sectv-tizen\": \"..\/cordova-sectv-tizen\",\"cordova-tv-webos\": \"..\/cordova-tv-webos\",/g" package.json > package.json.tmp && mv package.json.tmp package.json
cd ..

echo "================ Compile project"
cd cordova-js
grunt compile:sectv-orsay compile:sectv-tizen compile:tv-webos
cd ..

cd cordova-plugin-toast
grunt compile:sectv-orsay compile:sectv-tizen compile:tv-webos
cd ..

echo "================ Create TestRunner cordova application"

echo -n "================ What's the source of template ? (default is empty project) "
read templateSrc

if [ -n "$templateSrc" ]
then
	templateSrc="--template=$templateSrc"
fi

echo -n "================ What's the application's folder name? (default is 'TestApp')"
read applicationFolderName

if [ -z "$applicationFolderName" ]
then
	applicationFolderName="TestApp"
fi

echo -n "================ Create cordova project"
cordova create "$applicationFolderName" "$templateSrc"
cd $applicationFolderName

cp -rf ../grunt-cordova-sectv/sample/. ./
npm install ../grunt-cordova-sectv

npm install

cordova platform add browser

cordova plugin add cordova-plugin-device
cordova plugin add cordova-plugin-network-information
cordova plugin add cordova-plugin-globalization

cordova plugin add ../cordova-plugin-toast

cd www/
sed -e "/<meta http-equiv=\"Content-Security-Policy\"/d" index.html > index.html.tmp && mv index.html.tmp index.html
sed -e "/cordova.js/d" index.html > index.html.tmp && mv index.html.tmp index.html
sed -e "/toast.js/d" index.html > index.html.tmp && mv index.html.tmp index.html
sed -e "s/<\/body>/<script type=\"text\/javascript\" src=\"cordova.js\"><\/script>\n<script type=\"text\/javascript\" src=\"toast.js\"><\/script>\n<\/body>/g" index.html > index.html.tmp && mv index.html.tmp index.html

cd ../

echo "================ Prepare for sectv-orsay platform"
grunt sectv-prepare:sectv-orsay

echo "================ Prepare for sectv-tizen platform"
grunt sectv-prepare:sectv-tizen

echo "================ Prepare for tv-webos platform"
grunt sectv-prepare:tv-webos

echo -n "Please set some information for build with reference of wiki in github (Done:Enter) "
read temp

echo "================ Build and package for sectv-orsay platform"
grunt sectv-build:sectv-orsay

echo "================ Build and package for sectv-tizen platform"
grunt sectv-build:sectv-tizen

echo "================ Build and package for tv-webos platform"
grunt sectv-build:tv-webos

echo "================ Build and package on browser platform"
cordova build browser
cordova emulate browser

cd ..