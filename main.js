let types = {
    media: ["mp4", "mkv", "mp3","mov"],
    archives: ['zip', '7z', 'rar', 'tar', 'gz', 'ar', 'iso', "xz"],
    documents: ['docx', 'doc', 'pdf', 'xlsx', 'xls', 'odt', 'ods', 'odp', 'odg', 'odf', 'txt', 'ps', 'tex',"csv",'json'],
    app: ['exe', 'dmg', 'pkg', "deb","apk"],
    images: ['png','jpg','jpeg'],
    torrent: ['torrent']
}



// Taking input from the user

let inputArr = process.argv.slice(2);
let fs = require("fs");
let path = require("path");
let helpObject = require("./commands/help");
let organizeObject = require("./commands/organize");
let treeObject = require("./commands/tree");
// console.log(inputArr);

// Input will look like this
// node main.js tree "directoryPath"
// node main.js organize "directoryPath"
// node main.js help

let command = inputArr[0];
let directoryPath = inputArr[1];

switch (command) {
    case "tree":
        treeObject.tree(inputArr[1]);
        break;
    case "organize":
        organizeObject.organize(inputArr[1]);
        break;
    case "help":
        helpObject.help();
        break;

    default:
        console.log("Please enter a valid choice 🙏");
        break;
}