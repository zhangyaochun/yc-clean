'use strict';

var rimraf = require('rimraf');
var fs = require('fs');
var path = require('path');

//exists
function exists() {
    var filepath = path.join.apply(path, arguments);
    return fs.existsSync(filepath);
}

function isDir() {
    var filepath = path.join.apply(path, arguments);
    return exists(filepath) && fs.statSync(filepath).isDirectory();
}

function isFile() {
    var filepath = path.join.apply(path, arguments);
    return exists(filepath) && fs.statSync(filepath).isFile();
}


function clean(filepath) {
    //check exist    
    if (!exists(filepath)) {
        return false;
    }

    //TODO now i don not check isPathCwd like grunt clean 
    rimraf.sync(filepath);
}


module.exports = function(filepath) {

    //check dir or just a file 
    if (isFile(filepath)) {
        //file
        clean(filepath);
    } else if(isDir(filepath)) {
        //dir
        fs.readdirSync(filepath).forEach(function(file){
            clean(filepath);
        });
    }

};

