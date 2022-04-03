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
// console.log(inputArr);

// Input will look like this
// node main.js tree "directoryPath"
// node main.js organize "directoryPath"
// node main.js help

let command = inputArr[0];
let directoryPath = inputArr[1];

switch (command) {
    case "tree":
        tree(inputArr[1]);
        break;
    case "organize":
        organize(inputArr[1]);
        break;
    case "help":
        help();
        break;

    default:
        console.log("Please enter a valid choice 🙏");
        break;
}

function tree(directoryPath){
    console.log("tree implemented");
}

function organize(directoryPath){

    // 1. Input path of directory

    let destinationPath;

    if(directoryPath == undefined){
        console.log("Please enter the path!");
        return;
    }
    else{
        let exists = fs.existsSync(directoryPath);
        if(exists){
            // 2. Create organised directory to store files
            destinationPath = path.join(directoryPath, "Organized Files");
            // destinationPath = directoryPath + "/" + "Organized Files";

            // Create a directory if it does not exist (creating one when already exists will throw an error)
            if(!fs.existsSync(destinationPath)){
                fs.mkdirSync(destinationPath);
            }
           
        }
        else{
            console.log("Kindly enter a valid path!");
            return;
        }

        organizeHelper(directoryPath, destinationPath);
    }

    function organizeHelper(directoryPath, destinationPath){
        // 3. Identify types of all the files present in the input directory
        let fileNames = fs.readdirSync(directoryPath);
        
        for(let i=0; i<fileNames.length; i++){

            // Accesing address of a file
            let fileAddress = path.join(directoryPath, fileNames[i]);

            // Display if it is a files
            let isFile = fs.lstatSync(fileAddress).isFile();
            if(isFile){
                let fileCategory = getFileCategory(fileNames[i]);
                sendFiles(fileAddress, destinationPath, fileCategory);
            }
        }
    }

    function getFileCategory(fileName){
        // .zip
        let category = path.extname(fileName);

        // zip (without .)
        let extension = category.slice(1);
        
        for(let type in types){
            let typeArr = types[type];

            for(let i=0; i<typeArr.length; i++){
                if(extension == typeArr[i]){
                    return type;
                }
            }
        }

        return 'others';
    }

    // 4. Copy / Cut the files to correct folder in organized directory
    function sendFiles(sourceFilePath, destinationPath, fileCategory){
        let concatenatedPath = path.join(destinationPath, fileCategory);

        if(!fs.existsSync(concatenatedPath)){
            fs.mkdirSync(concatenatedPath);
        }

        let fileName = path.basename(sourceFilePath);
        let destinationFilePath = path.join(concatenatedPath, fileName);

        fs.copyFileSync(sourceFilePath, destinationFilePath);
        console.log(fileName + "is copied to " + fileCategory);

        // used to remove file from source directory (CUT -> PASTE)
        fs.unlinkSync(sourceFilePath);
    }
}

function tree(directoryPath){
    if(directoryPath == undefined){
        console.log("Please enter the path!");
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
            let childPath = path.join(directoryPath + filesInsideDirectory[i]);
            treeHelper(childPath, space + "\t");
        }
    }
}

function help(directoryPath){
    console.log(`
    List of all the commands:
        node main.js tree "directoryPath"
        node main.js organize "directoryPath"
        node main.js help
    `);
}