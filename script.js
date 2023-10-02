const util = require("util");
const exec = util.promisify(require("child_process").exec);
const fs = require("fs");
const path = require("path");

const inputDir = "./input";
const outputDir = "./output";

const filesToConvert = [
    // Files to convert here...
    "demo.mkv"
];

let successCount = 0; // Counter for successful conversions
let errorCount = 0; // Counter for files failed to be converted

async function convertToH265() {
    for(let i = 0; i < filesToConvert.length; i++) {
        const inputFile = path.join(inputDir, filesToConvert[i]);
        const outputFile = path.join(outputDir, filesToConvert[i]);

        try {
            await exec(
                `ffmpeg -i ${inputFile} -c:v libx265 -c:a copy -x265-params crf=25 ${outputFile}`
            );

            console.log(`Video ${outputFile} has been successfully converted.`);
            successCount++;
        } catch(error) {
            console.error(`Error during conversion of ${inputFile}: ${error.message}`);
            errorCount++;
        }
    }
}

convertToH265().then(() => {
    console.log(`All videos have been processed! ${successCount} video${successCount < 2 ? '' : 's'} were successfully converted, ${errorCount} video${errorCount < 2 ? '' : 's'} failed to be converted.`);
});