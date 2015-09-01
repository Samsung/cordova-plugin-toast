var fs = require('fs');
var path = require('path');
var xml2js = require('xml2js');
function trim (str) {
    return (str + "").replace(/^\s+|\s+$/g, '');
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

module.exports = function(grunt) {
    grunt.registerMultiTask('compile', 'build cordova-plugin-toast', function() {
        var platformName = this.target;
        //console.log(this);
        var dest = this.data.dest || path.join('platform_www', platformName, 'toast.js');
        //var done = this.async();

        // convert the plugin.xml into JSON for making easy to access...
        var pluginXml = fs.readFileSync('./plugin.xml');
        var plugin = null;
        xml2js.parseString(pluginXml, {
            async: false
        }, function(err, result) {
            plugin = result;
        });
        //console.log(JSON.stringify(plugin, null, 2));

        var pluginId = getValue(plugin, "plugin.$.id", "");

        var jsMods = [];
        var commMods = getValue(plugin, "plugin.js-module", []);
        jsMods = jsMods.concat(commMods);
        var platforms = getValue(plugin, "plugin.platform", []);
        for(var i=0; i<platforms.length; i++) {
            var pfmName = getValue(platforms[i], "$.name", null);
            if(pfmName && pfmName === platformName) {
                var pfmMods = getValue(platforms[i], "js-module", []);
                jsMods = jsMods.concat(pfmMods);
                break;  // handle first found platform only.
            }
        }

        var content = '';
        for(var i=0; i<jsMods.length; i++) {
            var src = getValue(jsMods[i], "$.src", null);
            var name = getValue(jsMods[i], "$.name", null);
            var clobbers = getValue(jsMods[i], "clobbers", null);
            var merges = getValue(jsMods[i], "merges", null);
            var runs = getValue(jsMods[i], "runs", null);
            if(!src || !name) {
                console.warn("Invalid js-module definition- src: " + src + ", name: " + name);
                continue;
            }
            var modId = pluginId + "." + name;
            var srcContent = fs.readFileSync(src);
            content += '// file: ' + src + '\n';
            content += wrapWithDefine(modId, srcContent) + '\n';

            if(clobbers || merges || runs) {
                content += ';(function () {\n';
                content += 'var moduleMapper = require("cordova/modulemapper");\n';
                if(clobbers) {
                    for(var c=0; c<clobbers.length; c++) {
                        var target = getValue(clobbers[c], "$.target", null);
                        if(target) {
                            content += 'moduleMapper.clobbers(\"'+modId+'\", \"' + target + '\");\n';
                        }
                    }
                }
                if(merges) {
                    for(var m=0; m<merges.length; m++) {
                        var target = getValue(merges[m], "$.target", null);
                        if(target) {
                            content += 'moduleMapper.merges(\"'+modId+'\", \"' + target + '\");\n';
                        }
                    }
                }
                if(runs) {  // runs is allowed only once
                    content += 'moduleMapper.runs(\"'+modId+'\");\n';
                }
                content += '})();\n\n';
            }
        }

        //console.log(content);

        fs.writeFileSync(dest, content);
        console.log('Created at: ' + dest);

        //done();
    });
};

function wrapWithDefine(id, content) {
    var PRE_LINES = [
        "cordova.define(\""+id+"\", function(require, exports, module) {"
    ];
    var POST_LINES = [
        "});"
    ];
    return PRE_LINES.join('\n') + '\n' + content + '\n' + POST_LINES.join('\n') + '\n';
}