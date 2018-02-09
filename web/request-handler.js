var fs = require('fs');
var path = require('path');
var archive = require('../helpers/archive-helpers');

// require more modules/folders here!

var defaultCorsHeaders = {
  'access-control-allow-origin': '*',
  'access-control-allow-methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'access-control-allow-headers': 'content-type, accept',
  'access-control-max-age': 10 // Seconds.
};

exports.handleRequest = function (req, res) {
   
  req.headers = defaultCorsHeaders;
  
  if (req.method === 'GET') {
    
    // should return the content of index.html, 
    // if no url then return html page
    if (req.url === '/') {
      
      fs.readFile(archive.paths.htmlPage, (err, data) => {
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end(data.toString());
      });
    
    // else check for url
    } else { 
      
      // helper function to check if url is archived
      archive.isUrlArchived(req.url, function(err, test) {
          
        console.log('url: ', req.url, 'test true: ', test); // /www.google.com & /arglebargle, true & false

        // if true it should return the content of a website from the archive 
        if (test === true) {
          
          console.log(archive.paths.archivedSites + req.url); // /www.google.com, truefalse
          
          fs.readFile(archive.paths.siteAssets + req.url, function(err, data) {
            res.writeHead(200);
            res.end(archive.paths.archivedSites + req.url); 
          }); 
        
        // if false it should 404 when asked for a nonexistent file
        } else {
          
          console.log('url: ', req.url, 'test false: ', test); // /arglebargle, false
          
          res.writeHead(404);
          res.end();
        }
      });

    }
  }
};




