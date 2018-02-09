var fs = require('fs');
var path = require('path');
var _ = require('underscore');
const { URL } = require('url');
/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  htmlPage: path.join(__dirname, '../web/public/index.html'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt'),
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(callback) {
  fs.readFile(exports.paths.list, 'utf8', (err, data) => {
    if (err) {
      throw err;
    } else {
      //convert to array 
      var array = data.split('\n');
      //give away formatted array to whatever needs it 
      callback(err, array);
    }
  });
};

exports.isUrlInList = function(url, callback) {
  fs.readFile(exports.paths.list, 'utf8', (err, data) => {
    var array = data.split('\n');
    var boolean = false;
    if (array.includes(url)) {
      boolean = true;
    }
    callback(err, boolean);
  });   
};

exports.addUrlToList = function(url, callback) {
  fs.writeFile(exports.paths.list, url, 'utf8', (err) => {
    if (err) {
      throw err;
    }
    callback(err);
  });  
};

exports.isUrlArchived = function(url, callback) {
  return fs.access(exports.paths.archivedSites + '/' + url, (err) => {
    if (!err) {
      callback(null, true);
    } else if (err.code === 'ENOENT') {
      callback(null, false);
    } else {
      callback(err, null);
    }
  });

};

exports.downloadUrls = function(urls) {
  urls.forEach(url => {
    exports.isUrlArchived(url, (err, data) => {
      if (!data) {
        fs.writeFile(exports.paths.archivedSites + '/' + url, (err) => {
          if (err) {
            throw err;
          }
        });
      }
    });
  });
};
