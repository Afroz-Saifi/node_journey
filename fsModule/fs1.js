const fs = require('fs');
const path = require('path');
// console.log(path.re(''));
let a = path.dirname('C:\Users\Dell\Desktop\node tut\fsModule')
fs.readdir(`${a}`, "utf-8", (err, files) => {
    console.log(files);
})
// console.log(process.cwd());
// fs.appendFile("file1.txt", "\nthis is the node doll2", (err) => {
//     console.log(err);
// })

// fs.readFile("./file1.txt", "utf-8", (err, data) => {
//     if(err){
//         err.message = "this is the error given by me"
//         console.log(err.message);
//     }else{
//         console.log(data);
//     }
// // })

// fs.rename('./file1.txt', 'renamed.txt', (err) => {
//     if(err){
//         err.message = "no file found to be renamed"
//         console.log(err.message);
//     }
// })
// fs.rm('./file1.txt', (err) => {
//     if(err){
//         console.log(err);
//     }
// })