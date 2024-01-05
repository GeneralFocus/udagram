import fs from "fs";
import Jimp from "jimp";
import path from "path";
import { promisify } from "util";

// Function to filter image from URL and save it locally
export async function filterImageFromURL(inputURL: string): Promise<string> {
  const unlink = promisify(fs.unlink);

  try {
    const photo = await Jimp.read(inputURL);
    const outputPath = path.join(__dirname, `/tmp/filtered.${Math.floor(Math.random() * 2000)}.jpg`);
    
    await photo
      .resize(256, 256) // Resize
      .quality(60) // Set JPEG quality
      .greyscale() // Set greyscale
      .writeAsync(outputPath); // Write the image asynchronously
    
    return outputPath;
  } catch (error) {
    throw new Error(`Error processing image: ${error.message}`);
  }
}

// Function to delete local files
export async function deleteLocalFiles(files: string[]): Promise<void> {
  const unlinkPromises = files.map(file => promisify(fs.unlink)(file));

  try {
    await Promise.all(unlinkPromises);
  } catch (error) {
    throw new Error(`Error deleting files: ${error.message}`);
  }
}
