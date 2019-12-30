'use strict';

const fs = require('fs');

function getBlocks(directoryPath, cb) {
  //passsing directoryPath and callback function
  fs.readdir(directoryPath, function (err, files) {
      //handling error
      if (err) {
          return console.log('Unable to scan directory: ' + err);
      }
      //listing all files using forEach
      const blocks = files.map(function (file) {
          const absolutePath = directoryPath + '/' + file;
          const jsonData = fs.readFileSync(absolutePath);
          return JSON.parse(jsonData);
      });

      cb(blocks);
  });
}

module.exports = {
  getBlocks
}
