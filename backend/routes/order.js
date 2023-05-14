const router = require("express").Router();
const Order = require('../models/Order');
const {verfiyToken, verfiyTokenAndAdmin, verfiyTokenAndAuthorization} = require('../middleware/verifyToken');

// post: /order/ --> add new product
// only order can be placed by admin and user
router.post('/',verfiyToken, async (req, res)=>{
    const newOrder = new Order(req.body);
    try {
        const order = await newOrder.save();
        res.status(200).json(order);
    } catch (error) {
        return res.status(500).json(error);
    }
});

// **NOTE Only admin can perform over order (like order status)
// put: /order/:id -->update the particular product
router.put('/:id', verfiyTokenAndAdmin, async(req, res)=>{
    try {
        const updatedOrder = await Order.findByIdAndUpdate(
            req.params.id,
            {$set: req.body},
            {new:true}
        );
        return res.status(203).json(updatedOrder);
        
    } catch (error) {
        return res.status(500).json(error);
    }
});

// delete: /order/:id -->delete the particular cart item specified by id
router.delete('/:id', verfiyTokenAndAdmin, async (req, res)=>{
    try {
        await Order.findByIdAndDelete(req.params.id);
        return res.status(203).json({message:"Order Deleted"});
    } catch (error) {
        return res.status(500).json(error);
    }
});

//get: /order/find/:userId
//  this route return all orders of a particular user
router.get('/find/:userId',verfiyTokenAndAdmin, async (req, res)=>{
    try {
        const orders = await Order.find({
            userId: req.params.userId
        });
        return res.status(203).json(orders);
    } catch (error) {
        return res.status(500).json(error);
    }
});

// get: /cart/find  return cart of all user
// return all of the orders of all the users
router.get('/', verfiyTokenAndAdmin, async (req, res)=>{
    try {
        const allOrders = await Order.find();
        res.status(200).json(allOrders);
    } catch (error) {
        res.status(500).json(error)
    }
});

// Monthly income stats
// previous two months
router.get('/income', verfiyTokenAndAdmin, async (req,res)=>{
    const date = new Date();
    const lastMonth = new Date(date.setMonth(date.getMonth()-1));
    const previousMonth = new Date(new Date().setMonth(lastMonth.getMonth()-1));
    try {
        const income = await Order.aggregate([
            {$match:{createdAt:{$gte:previousMonth}}},
            {
                $project:{
                    month:{$month:"$createdAt"},
                    sales:"$amount"
                }
            },
            {
                $group:{
                    _id:"$month",
                    income:{$sum:"$sales"}
                }
            }
        ]);
        res.status(200).json(income);
    } catch (error) {
        return res.status(500).json(error);
    }
})
module.exports = router;