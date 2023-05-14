const router = require("express").Router();
const Cart = require('../models/Cart');
const Product = require('../models/Product');
const { verfiyToken, verfiyTokenAndAdmin, verfiyTokenAndAuthorization } = require('../middleware/verifyToken');

// post: /cart/ --> add new product
router.post('/', verfiyToken, async (req, res) => {
    const userCart = await Cart.findOne({ _id: req.user.id });
    if (!userCart) {
        const newCart = new Cart({
            _id: req.user.id,
            products: [{...req.body}]
        });
        try {
            await newCart.save();
            return res.status(200).json({message:"Saved success"});
        } catch (error) {
            return res.status(500).json(error);
        }
    }
    else {
        try {
            await Cart.updateOne(
                {_id:req.user.id},
                {$addToSet:{products:req.body}}
            );
            return res.status(200);
            
        } catch (error) {
            return res.status(500).json(error);
        }
    }
});

// put: /cart/:id -->update the particular product in cart
router.put('/', verfiyToken, async (req, res) => {
    let newInfo = {
        _id:req.body._id,
        quantity:req.body.quantity
    }
    try {
        await Cart.updateOne(
            {_id:req.user.id, products:{$elemMatch:{_id:newInfo._id}}},
            {$set:{'products.$.quantity':newInfo.quantity}}
            );
        return res.status(200).json("Done");
    } catch (error) {
        console.log(error);
        return res.status(500).json("Server Error");
        
    }
});

// delete: /cart/:id remove particular product from array
router.delete('/:id', verfiyToken, async (req, res) => {
    try {
        await Cart.updateOne(
            {_id: req.user.id}, 
            {$pull: { products: { _id: req.params.id } }}
        );
        return res.status(200).json({ message: "Successfully removed" });
    } catch (error) {
        return res.status(500).json(error);
    }
});

//get: /cart/find/:userId
router.get('/', verfiyToken, async (req, res) => {
    let userCart = {
        quantity:0, 
        total:0,
        products:[],
    }
    try {
        const cart = await Cart.findOne({
            _id: req.user.id
        });
        if(!cart) return res.status(200).json(userCart);
        userCart.quantity = cart.products.length;
        for(const item of cart.products){
            let data = await Product.findById(item._id);
            userCart.products.push({
                ...data._doc,
                quantity:item.quantity,
                color:item.color,
                size:item.size
            });
            userCart.total = userCart.total + (Number(data.price)*Number(item.quantity));
        }
        return res.status(200).json(userCart);
    } catch (error) {
        return res.status(500).json(error);
    }
});

// Only admin can see all carts
// get: /cart/find  return cart of all user
// router.get('/', verfiyTokenAndAdmin, async (req, res) => {
//     try {
//         const carts = await Cart.find();
//         res.status(200).json(carts);
//     } catch (error) {
//         res.status(500).json(error)
//     }
// })
module.exports = router;