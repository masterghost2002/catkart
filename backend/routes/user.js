const router = require("express").Router();
const User = require('../models/User');
const jwt = require('jsonwebtoken');
const { verfiyTokenAndAuthorization, verfiyTokenAndAdmin, verfiyToken } = require('../middleware/verifyToken');
const { uploadImage } = require('../middleware/cloudinaryUpload');


//put: /user/:id --> update route
router.put('/:id', verfiyTokenAndAuthorization, uploadImage, async (req, res) => {
    if (req.body.password)
        req.body.password = CryptoJS.AES.encrypt(req.body.password, `duVdjL(U9"gm'g%Q_RPi4v_@o~WrA5@a!z&BTcJ{Xw]3hFPGFm%r}%TP#vEnQQj`).toString();
    // by chance any user try to make itself admin 
    if (req.body.isAdmin)
        return res.status(403).json({ message: "**ADMIN ACCESS RESTRICTED**" });

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        const { password, ...user } = updatedUser._doc;

        // create new accessToken for the user after updation
        const accessToken = await jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin
            },
            `Ykdq(yYYv4D>NEL=~E=F}IN]~vosG5';32Z+T,|(W42Z(eKs="x)lQAU~v701)~`,
            { expiresIn: "1w" } // token will expire in 1 week need to relogin after that
        );
        return res.status(200).json({ ...user, accessToken });
    } catch (error) {
        return res.status(500).json(error);
    }
});

// delete: /user/:id --> delete route
router.delete('/:id', verfiyTokenAndAuthorization, async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ message: "Account Deleted" });
    } catch (error) {
        res.status(500).json(error)
    }
});

//get: user/find/:id --> get send user 
// **NOTE** THIS ROUTE IS ONLY AVAILABLE TO ADMIN ONLY (FOR DASHBOARD)
router.get('/find/:id', verfiyTokenAndAdmin, async (req, res) => {
    try {
        const user = await User.findById(req.params.id);
        const { password, ...userInfo } = user._doc;
        res.status(200).json(userInfo);
    } catch (error) {
        res.status(500).json(error)
    }
});

// get: user/find/ -->return all user 
// this route support query for latest new 5 user ?new=true
// **NOTE** THIS ROUTE IS ONLY AVAILABLE TO ADMIN ONLY (FOR DASHBOARD)
router.get('/find', verfiyTokenAndAdmin, async (req, res) => {
    const query = req.query.new;
    try {
        const users = query ? await User.find().sort({ _id: -1 }).limit(5) : await User.find();
        return res.status(203).json(users);

    } catch (err) {
        return res.status(500).json(err);
    }
});

// get: user/stats -->return user stats (like how many new user we have in last month etc)
// **NOTE** THIS ROUTE IS ONLY AVAILABLE TO ADMIN ONLY (FOR DASHBOARD)
router.get('/stats', verfiyTokenAndAdmin, async (req, res) => {
    // limit to last 1 year only
    const date = new Date();
    const lastYear = new Date(date.setFullYear(date.getFullYear() - 1));
    try {
        // _id refers to month number
        const data = await User.aggregate([
            { $match: { createdAt: { $gte: lastYear } } },
            {
                $project: {
                    month: { $month: "$createdAt" }
                }
            },
            {
                $group: {
                    _id: "$month",
                    total: { $sum: 1 }
                }
            }
        ]);
        return res.status(203).json(data);
    } catch (error) {
        return res.status(500).json(error);
    }
});

// /wishlist/:productId 
//  add the product id in the wishlist array of user
//  get of product in wishlist will be done in product route
router.post('/wishlist/:prodcutId', verfiyToken, async (req, res) => {
    const productId = req.params.prodcutId;
    const userId = req.user.id;
    try {
        await User.findByIdAndUpdate(userId,
            { $addToSet: { wishlist: productId } }
        );
        return res.status(200).json({message:"Product added to wishlist"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
});
router.delete('/wishlist/:productId', verfiyToken, async (req, res) => {
    const productId = req.params.productId;
    const userId = req.user.id;
    try {
        await User.findByIdAndUpdate(userId,
            { $pull: { wishlist: productId } }
        );
        return res.status(200).json({message:"Wishlist product removed"});
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
})
module.exports = router;