const util = require("util");
const exec = util.promisify(require("child_process").exec);
const fs = require("fs");
const path = require("path");

const filesToConvert = [
    // Files to convert here...
    //"demo.mkv"
];

function searchFilesInDir(inputDir = "./input") {
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

async function convertToH265(inputDir = "./input", outputDir = "./output") {
    for(let i = 0; i < filesToConvert.length; i++) {

        let inputFile;
        let outputFile;

        filesToConvert[i].split(".").pop() === "m3u8" ? (
            // directory output, add a 0 before if iteration numbers < 10, iteration + 1
            inputFile = filesToConvert[i],
            outputFile = path.join(outputDir, `${i < 9 ? "0" : ""}${i + 1}.mp4`)
        ) : (
            inputFile = path.join(inputDir, filesToConvert[i]),
            outputFile = path.join(outputDir, filesToConvert[i])
        )

        try {
            await exec(
                `ffmpeg -i "${inputFile}" -c:v libx265 -c:a copy -x265-params crf=25 "${outputFile}"`, //Quotes are essential to avoid whitespace errors
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