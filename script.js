const util = require("util");
const exec = util.promisify(require("child_process").exec);
const fs = require("fs");
const path = require("path");

const inputDir = "./input";
const outputDir = "./output";

const filesToConvert = [
    // Files to convert here...
    //"demo.mkv"
];

function searchFilesInDir() {
    try {
        // Add file to filesToConvert array
        const files = fs.readdirSync(inputDir);
        filesToConvert.push(...files);
    } catch(err) {
        //handle error in search
        console.error(`Error reading directory: ${err}`);
    }
}

function clearFilesToConvert() {
    filesToConvert.length = 0
}

let successCount = 0; // Counter for successful conversions
let errorCount = 0; // Counter for files failed to be converted

async function convertToH265() {
    for(let i = 0; i < filesToConvert.length; i++) {
        const inputFile = path.join(inputDir, filesToConvert[i]);
        const outputFile = path.join(outputDir, filesToConvert[i]);

        try {
            await exec(
                `ffmpeg -i ${inputFile} -c:v libx265 -c:a copy -x265-params crf=25 ${outputFile}`,
                { maxBuffer: 10 * 1024 * 1024 } // change default maxBuffer limit to 10 GB
            );

            console.log(`Video ${outputFile} has been successfully converted.`);
            successCount++;
        } catch(error) {
            console.error(`Error during conversion of ${inputFile}: ${error.message}`);
            errorCount++;
        }
    }
}

clearFilesToConvert()
searchFilesInDir()
convertToH265().then(() => {
    console.log(`All videos have been processed! ${successCount} video${successCount < 2 ? '' : 's'} were successfully converted, ${errorCount} video${errorCount < 2 ? '' : 's'} failed to be converted.`);
});