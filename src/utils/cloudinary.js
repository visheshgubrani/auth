import { v2 as cloudinary } from "cloudinary";
import fs from 'fs'


          
cloudinary.config({ 
  cloud_name: 'dbq5x9edi', 
  api_key: '727957394164447', 
  api_secret: 'CIS7_JC06z23oMWQj2co_9cOjv4' 
});

const uploadOnCloudinary = async (localfilepath) => {
    try {
        if (!localfilepath) return null

        const response = await cloudinary.uploader.upload(localfilepath, {
            resource_type: 'auto'
        })
        console.log(response);
        if (fs.existsSync(localfilepath)) {
            fs.unlinkSync(localfilepath)
        }

        return response
    } catch (error) {
        console.log(`Cloudinary Error: ${error}`);
        fs.unlinkSync(localfilepath)
        return null
    }
}

export { uploadOnCloudinary }