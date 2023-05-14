const mongoose = require('mongoose');
const CartSchema = new mongoose.Schema(
    {
        _id:{type:mongoose.Schema.Types.ObjectId, ref:'User'},
        products:[
            {
                _id:{type:mongoose.Schema.Types.ObjectId, ref:'Product'},
                quantity:{type:Number, default:1},
                color:{type:String},
                size:{type:String}
            }
        ]
    },
    {timestamps: true}
);
module.exports = mongoose.model("Cart", CartSchema);