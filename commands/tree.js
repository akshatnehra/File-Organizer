let fs = require("fs");
let path = require("path");

function tree(directoryPath){
    if(directoryPath == undefined){

        // In case no dir path provided (default --> Current Working Directory)
        treeHelper(process.cwd(), " ");
        return;
    }
    else{
        let doesExists = fs.existsSync(directoryPath);
        if(doesExists){
            treeHelper(directoryPath, " ");
        }
    }
}

// Space is for indentation
function treeHelper(directoryPath, space){

    let isFile = fs.lstatSync(directoryPath).isFile();
    if(isFile){
        let fileName = path.basename(directoryPath);
        console.log(space + "├──" + fileName);
    }
    else{
        let directoryName = path.basename(directoryPath);
        console.log(space + "└──" + directoryName);

        let filesInsideDirectory = fs.readdirSync(directoryPath);
        // console.log(space + "└──" + filesInsideDirectory);

        for(let i=0; i<filesInsideDirectory.length; i++){
            let childPath = path.join(directoryPath , filesInsideDirectory[i]);
            treeHelper(childPath, space + "\t");
        }
    }
}

module.exports = {
    tree : tree
}