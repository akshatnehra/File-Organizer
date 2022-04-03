let fs = require("fs");
let path = require("path");

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

module.exports = {
    organize : organize
}