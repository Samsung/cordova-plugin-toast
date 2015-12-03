var fs = require('fs');
var path = require('path');
var xml2js = require('xml2js');
var grunt = require('grunt');

function trim (str) {
    return (str + '').replace(/^\s+|\s+$/g, '');
}

// Supporting dot('.') seperated expression. Not support array indexing.
function getValue(obj, expr, defaultVal) {
    if(typeof obj !== 'object' || typeof expr !== 'string') {
        throw new TypeError();
    }
    expr = trim(expr);
    var firstDot = expr.indexOf('.');
    if(expr.length === 0 || firstDot === 0) { // starting with '.' is not allowed also.
        return defaultVal || undefined;
    }
    if(firstDot === -1) {
        return obj[expr] || defaultVal || undefined;
    }
    var exp = expr.substr(0, firstDot);
    if(typeof obj[exp] !== 'undefined') {
        return getValue(obj[exp], expr.substr(firstDot+1), defaultVal);
    }
    else {
        return defaultVal || undefined;
    }
}

function prepareDir(dirPath) {
    dirPath = path.dirname(dirPath);
    var tmp = dirPath.split(path.sep);
    var chkPath = '';
    for(var i=0, len=tmp.length; i<len; i++) {
        chkPath += (i>0?path.sep:'') + tmp[i];
        if(!fs.existsSync(chkPath)) {
            try {
                fs.mkdirSync(chkPath);
            }
            catch(e) {
                grunt.fail.fatal('Fail to create directory at ' + path.resolve(chkPath));
            }
        }
    }
}

module.exports = function(grunt) {
    grunt.registerMultiTask('compile', 'build cordova-plugin-toast', function() {
        var platformName = this.target;
        var dest = this.data.dest || path.join('platform_www', platformName, 'toast.js');

        // convert the plugin.xml into JSON for making easy to access...
        var pluginXml = fs.readFileSync('./plugin.xml');
        var plugin = null;
        xml2js.parseString(pluginXml, {
            async: false
        }, function(err, result) {
            plugin = result;
        });

        var pluginId = getValue(plugin, 'plugin.$.id', '');

        var jsMods = [];
        var commMods = getValue(plugin, 'plugin.js-module', []);
        jsMods = jsMods.concat(commMods);
        var platforms = getValue(plugin, 'plugin.platform', []);
        for(var i=0; i<platforms.length; i++) {
            var pfmName = getValue(platforms[i], '$.name', null);
            if(pfmName && pfmName === platformName) {
                var pfmMods = getValue(platforms[i], 'js-module', []);
                jsMods = jsMods.concat(pfmMods);
                break;  // handle first found platform only.
            }
        }

        var TOAST_VERSION = 'N/A';
        var pkgConfPath  = path.resolve('package.json');
        var pkgConf = JSON.parse(fs.readFileSync(pkgConfPath));
        if(pkgConf && pkgConf.version) {
            TOAST_VERSION = pkgConf.version;
        }

        var content = '';
        var licensePath  = path.join(__dirname, 'LICENSE-for-js-file.txt');
        content += '/*\n' + fs.readFileSync(licensePath) + '\n*/\n';
        content += '/* Cordova plugin TOAST version '+TOAST_VERSION+' ('+grunt.template.today("yyyy-mm-dd HH:MM:ss Z")+') */\n';
        content += ';(function() {\n';
		content += '// jshint strict:false\n';
        content += 'var require = cordova.require,\n';
        content += '    define = cordova.define;\n\n';

        var lstClobbers = [],
            lstMerges = [],
            lstRuns = [];
        for(var i=0; i<jsMods.length; i++) {
            var src = getValue(jsMods[i], '$.src', null);
            var name = getValue(jsMods[i], '$.name', null);
            if(!src || !name) {
                grunt.fail.warn('Invalid js-module definition- src: ' + src + ', name: ' + name);
            }
            var modId = pluginId + '.' + name;
            try {
                var srcContent = fs.readFileSync(src, 'utf-8');
                srcContent = (srcContent+'').replace(/^\s*((\/\*)[\S\s]*?(\*\/))/, '');
            }
            catch(e) {
                grunt.fail.warn('Fail to read file at ' + path.resolve(src)
                    + '. Please check that the file exists. This path is retrived from plugin.xml.');
            }
            content += '// file: ' + src + '\n';
            content += wrapWithDefine(modId, srcContent) + '\n';

            var clobbers = getValue(jsMods[i], 'clobbers', null);
            var merges = getValue(jsMods[i], 'merges', null);
            var runs = getValue(jsMods[i], 'runs', null);
            if(clobbers) {
                for(var c=0; c<clobbers.length; c++) {
                    var target = getValue(clobbers[c], '$.target', null);
                    if(target) {
                        lstClobbers.push({
                            id: modId,
                            target: target
                        });
                    }
                }
            }
            if(merges) {
                for(var m=0; m<merges.length; m++) {
                    var target = getValue(merges[m], '$.target', null);
                    if(target) {
                        lstMerges.push({
                            id: modId,
                            target: target
                        });
                    }
                }
            }
            if(runs) {  // runs is allowed only once
                lstRuns.push(modId);
            }
        }

        if(lstClobbers.length > 0 || lstMerges.length > 0 || lstRuns.length > 0) {
            content += 'var moduleMapper = require(\'cordova/modulemapper\');\n';
            for(var i=0; i<lstClobbers.length; i++) {
                content += 'moduleMapper.clobbers(\''+lstClobbers[i].id+'\', \''+lstClobbers[i].target+'\');\n';
            }
            for(var i=0; i<lstMerges.length; i++) {
                content += 'moduleMapper.merges(\''+lstMerges[i].id+'\', \''+lstMerges[i].target+'\');\n';
            }
            for(var i=0; i<lstRuns.length; i++) {
                content += 'moduleMapper.runs(\''+lstRuns[i]+'\');\n';
            }
            content += 'moduleMapper.mapModules(window);\n';
            content += 'window.toast.version = \'' + TOAST_VERSION + '\';\n'
        }

        content += '})();\n\n';

        //console.log(content);

        prepareDir(dest);
        fs.writeFileSync(dest, content);
        console.log('Created at: ' + dest);

    });
};

function wrapWithDefine(id, content) {
    var PRE_LINES = [
        'define(\''+id+'\', function(require, exports, module) {'
    ];
    var POST_LINES = [
        '});'
    ];
    return PRE_LINES.join('\n') + '\n' + content + '\n' + POST_LINES.join('\n') + '\n';
}
