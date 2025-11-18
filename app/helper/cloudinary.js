const cloudinary = require('cloudinary').v2;
const fs = require('fs');

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

const uploadToCloudinary = async (localFilePath) => {
    try {
        if (!localFilePath) {
            throw new Error("No local file path found")
        }

        const uploadResponse = await cloudinary.uploader.upload(localFilePath, {
            resource_type: "image",
            folder: 'student'
        })

        if (!uploadResponse) {
            throw new Error("Upload to Cloudinary failed")
        }

        return uploadResponse

    } catch (err) {
        console.error(err)
        return null;
    } finally {
        fs.unlinkSync(localFilePath);
    }
}

const deleteFromCloudinary = async (publicId) => {
    try {
        if (!publicId) {
            throw new Error("No public ID found")
        }

        const deleteResponse = await cloudinary.uploader.destroy(publicId)

        if (!deleteResponse.result !== 'ok') {
            throw new Error("Deletion from Cloudinary failed")
        }

        return true

    } catch (err) {
        console.log(err)
        return false
    }
}

module.exports = {
    uploadToCloudinary,
    deleteFromCloudinary
}