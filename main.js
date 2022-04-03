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
                console.log(fileNames[i]);
            }
        }
    }
    
    
    
    // 4. Copy / Cut the files to correct folder in organized directory
}

function help(directoryPath){
    console.log(`
    List of all the commands:
        node main.js tree "directoryPath"
        node main.js organize "directoryPath"
        node main.js help
    `);
}