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
  let {method, url, headers} = req;
   
  headers = defaultCorsHeaders;
  
  
  //   if (method === 'GET') {
  //     fs.readFile(archive.paths.htmlPage, (err, data) => {
  //       // if nothing then return html page
  //       if (url === '/') {
  //         res.writeHead(200, {'Content-type': 'text/html'});
  //         res.end(data.toString());
  //       }
    
    

  // };
  if (method === 'GET' && url === 'google') {
    archive.isUrlArchived(url, (err, data) => {
      if (err) {
        throw err;
      }
      if (!data) {
        res.writeHead(404);
        isUrlInList(url, (err, data) => {
          if (!data) {
            addUrlToList(url);
          } 
        });
      } else {
        res.writeHead(200, {'Content-type': 'text/html'});
        res.end(data.toString());
      } 
    }); 
  }

  if (method === 'GET') {
    console.log(url);
    fs.readFile(archive.paths.htmlPage, (err, data) => {
      if (err) {
        res.writeHead(404);
      } else {
        res.writeHead(200, {'Content-type': 'text/html'});
      }
      res.end(data.toString());
    });
  }


};




