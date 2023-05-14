const cloudinary = require('cloudinary').v2 
const uploadImage = async (req, res, next)=>{
    const file = req.files?req.files.imageFile:null;
    if(!file){
        return next();
    }
    try{
        const res = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: 'catkartproducts'
        });
        req.body.image = res.secure_url;
        next();
    }catch(error){
        return res.status(500).json(error);
    }
};
module.exports = {uploadImage};