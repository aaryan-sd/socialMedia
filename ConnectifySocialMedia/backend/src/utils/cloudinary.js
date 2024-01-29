import { v2 as cloudinary } from "cloudinary"
import fs from "fs" // this is file system library which is by default present in node js
          
cloudinary.config({ 
  cloud_name: 'dfnf4rnus',  // process.env.CLOUDINARY_CLOUD_NAME
  api_key: '256957918344689', 
  api_secret: 'BM9j44aoSqwfsp-NM4HoeIItMUE' 
});

const uploadOnCloudinary = async (localFilePath) => {
    try{
        if(!localFilePath) return null; // if no path for image given
        console.log("local file path line 13: ",localFilePath);

        // upload on cloudinary
        const response = await cloudinary.uploader.upload(localFilePath,{
            resource_type: "auto"
        });
        console.log("file uploaded on cloudinary")
        fs.unlinkSync(localFilePath);

        return response;

    }catch(error){
        console.error(error);
        console.log("File not uploaded on cloudinary")
        fs.unlinkSync(localFilePath) // this will remove locally saved temporary file as upload operation got failed
        return null;
    }
}

export { uploadOnCloudinary }