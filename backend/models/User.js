const mongoose = require('mongoose');
var validator = require('validator')

// required:[true, errormessage]
const UserSchema = new mongoose.Schema(
    {
        username:{
            type:String,
            required: [true, 'Please provide a username'],
            unique:[true, 'Username already present']
        },
        fullname:{
            type:String,
            required:true,
        },
        email:{
            type:String,
            required:[true, 'Please provide an email'],
            validate:[validator.isEmail, 'Please enter email in correct format'],
            unique:true
        },
        password:{
            type:String,
            required:[true, 'Please provide a password'],
            // select: false this is will not send password while we get user
        },
        isAdmin:{
            type:Boolean,
            default: false
        },
        phone:{
            type:String,
            required:true
        },
        image:{
            type: String,
        },
        address:{
            type:String
        },
        wishlist:[{type:mongoose.Schema.Types.ObjectId, ref:"Product", required:true}]
    },
    {timestamps: true}
);

/*
    encryption and decrypt password pre and post hooks
    cab't user arrow function in it

    #### notice but if it use like this only it will going to encrypt
    #### encrypt the password again and again even if we are udating the user
    // UserSchema.pre('save', async function(next){
    //     this.password = await bcrypt.hash(this.password, 10);

    // })

    UserSchema.pre('save', async function(next){
        if(!this.isModified('password')) return next();
        this.password = await bycrypt.hash(this.password, 12);

    })

    valid the password with passed on user password

    userSchema.methods.validatePassword = asyncs function(userSendPassword){
        return await bcrypt.compare(userSendPassword, this.password);
        // return true and false
    }

    same we can do for jwt token
*/
module.exports = mongoose.model("User", UserSchema);