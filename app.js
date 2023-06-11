import * as fs from 'fs';
import Jimp from 'jimp';

const sourceFolder = './target';
const destinationFolder = './destination';

// Read the files from the source folder
fs.readdir(sourceFolder, (err, files) => {
    if (err) {
        console.error('Error reading source folder:', err);
        return;
    }

    // Iterate over each file in the source folder
    files.forEach(async (file) => {
        // Check if the file is an image (you can add more image formats if needed)
        if (file.endsWith('.jpg') || file.endsWith('.jpeg') || file.endsWith('.png')) {
            try {
                // Load the image using Jimp
                const image = await Jimp.read(`${sourceFolder}/${file}`);

                // Crop the image
                // image.crop(0, 0, 200, 200); // Adjust the crop dimensions as per your requirements
                image.resize(100, 100)

                // Save the cropped image to the destination folder
                await image.writeAsync(`${destinationFolder}/${file}`);

                console.log(`Image ${file} cropped and saved successfully!`);
            } catch (err) {
                console.error('Error cropping image:', err);
            }
        }
    });
});