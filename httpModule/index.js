const http = require('http').createServer
const fs = require('fs')
const {rawHtml} = require('./html');

// http((req, res) => {
//     res.writeHead(200, {'Content-Type': 'text/html'});
//     res.write(`${rawHtml}`)
//     res.end()
// }).listen(4545)
let isDir;
    fs.stat("__filename", (err, stats) => {
        if(err){
            console.log("this is is");
        }else{
            isDir = stats.isDirectory()
            console.log(isDir);
        }
            });
