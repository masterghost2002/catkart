const router = require("express").Router();
const Product = require('../models/Product');
const User = require('../models/User');
const { verfiyTokenAndAdmin, verfiyToken} = require('../middleware/verifyToken');
const {uploadImage} = require('../middleware/cloudinaryUpload');
// **NOTE** only admin can perfom CURD operation on product

// post: /products/ --> add new product
router.post('/',verfiyTokenAndAdmin, uploadImage, async (req, res)=>{
    if(!req.body.image)
        req.body.image = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTcPoTpT5OC4gYF5ICTvMTxkd4OBWGg1DIxp4hs1up5tg&s";
    let tempProduct = {
        title:req.body.title,
        desc:req.body.desc,
        image:req.body.image,
        price: req.body.price,
        size:JSON.parse(req.body.size),
        categories:JSON.parse(req.body.categories),
        color:JSON.parse(req.body.color),
    }
    const newProdcut = new Product(tempProduct);
    try {
        const product = await newProdcut.save();
        res.status(200).json(product);
    } catch (error) {
        return res.status(500).json(error);
    }
});

// put: /products/:id -->update the particular product
router.put('/:id', verfiyTokenAndAdmin,uploadImage, async(req, res)=>{
    console.log(req.body);
    try {
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new:true}
            );
            return res.status(203).json(updatedProduct);
            
        } catch (error) {
        console.log(error);
        return res.status(500).json(error);
    }
});

// delete: /products/:id -->delete the particular product specified by id
router.delete('/:id', verfiyTokenAndAdmin, async (req, res)=>{
    try {
        await Product.findByIdAndDelete(req.params.id);
        return res.status(203).json({message:"Product Deleted"});
    } catch (error) {
        return res.status(500).json(error);
    }
});

// **NOTE** every one can view the product ADMIN, USER, THIRD Person
//get: /products/find/:id
router.get('/find/:id', async (req, res)=>{
    try {
        const product = await Product.findById(req.params.id);
        return res.status(203).json(product);
    } catch (error) {
        return res.status(500).json(error);
    }
});

// get: /products  return all products
// two queries (by category, new 5 product)
router.get('/', async (req, res)=>{
    const queryNew = req.query.new;
    const queryCategory = req.query.category;
    try {
        let products;
        if(queryNew){
            products = await Product.find().sort({createdAt:-1}).limit(5);
        }
        else if(queryCategory){
            products = await Product.find(
                {
                    categories:{$in: [queryCategory]}
                });
        }
        else products = await Product.find();
        return res.status(200).json(products);
    } catch (error) {
        return res.status(500).json(error);
    }
});
// /wishlist get user wishlist
router.get('/wishlist', verfiyToken, async (req, res)=>{
    const userId = req.user.id;
    try {
        const products = await User.findOne({_id:userId}).populate('wishlist');
        return res.status(200).json(products.wishlist);
    } catch (error) {
        console.log(error);
        return res.status(500).json({message:"Server error"});
    }
});
module.exports = router;