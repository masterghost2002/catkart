const router = require("express").Router();
const User = require('../models/User');
const CryptoJS = require('crypto-js');
const jwt = require('jsonwebtoken');
const { uploadImage } = require('../middleware/cloudinaryUpload');
const errorModal = (errorType, errorFor, errorMessage) => {
    return {
        errorInfo: {
            isError:true,
            errorType,
            errorFor,
            errorMessage
        }
    };
};
const validateEmail = (email) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
};
const validateForm = (userInfo, setErrorInfo) => {
    const validateEmail = (email) => {
        return String(email)
            .toLowerCase()
            .match(
                /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
            );
    };
    if (!userInfo.fullname || userInfo.fullname.trim(" ").length === 0) {
        return errorModal("authentication", "fullname", "Fullname is required");
    }
    if (!userInfo.email || !validateEmail(userInfo.email)) {
        return errorModal("authentication", "email", "Invalid email");
    }
    if (!userInfo.username || userInfo.username.trim(" ").length === 0) {
        return errorModal("authentication", "username", "Username is required");
    }
    if (!userInfo.password || userInfo.password.trim(" ").length < 8) {
        return errorModal("authentication", "password", "Password must be at least 8 character long");
    }
    return true;
}


// user register route
router.post('/register', uploadImage, async (req, res) => {
    const validation = validateForm(req.body);
    if(validation.isError) return res.status(401).json(validation);
    // doing some pre checks
    const userByUsername = await User.findOne({username:req.body.username});
    const userByEmail = await User.findOne({email:req.body.email});
    if (userByUsername !== null)
        return res.status(401).json(errorModal("authentication", "username", "Username is already registered"));
    if (userByEmail !== null)
        return res.status(401).json(errorModal("authentication", "email", "Email is already registered"));

    // creating user
    const newUser = new User({
        username: req.body.username,
        email: req.body.email,
        fullname: req.body.fullname,
        phone: req.body.phone,
        address: req.body.address,
        image: req.body.image ? req.body.image : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ71GPRz3ThTOyK4PSj2Z4z0PFcgHfzZeIL0NXxs68dbA&s',
        password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_PASS_KEY).toString()
    });
    try {
        const savedUser = await newUser.save();
        savedUser.password = undefined;
        return res.status(201).send(savedUser);
    }
    catch (err) {
        res.status(500).send(errorModal("server", "server", "Server error try again!"));
    }
});

// login 
router.post('/login', async (req, res) => {
    if (!req.body.username_email || !req.body.password)
        return res.status(500).json(errorModal("authentication", "incomplete_info", "Please Provide all details"));

    const credentials = {
        isEmail: validateEmail(req.body.username_email),
        username_email: req.body.username_email,
        password: req.body.password
    }
    try {
        let user;

        // finding user by either email or username
        if (credentials.isEmail)
            user = await User.findOne({ email: credentials.username_email }).populate('wishlist');
        else user = await await User.findOne({ username: credentials.username_email }).populate('wishlist');


        if (!user) return res.status(401).json(errorModal("authentication", "username_email", "User not found"));
        const dePassword = await CryptoJS.AES.decrypt(user.password, `duVdjL(U9"gm'g%Q_RPi4v_@o~WrA5@a!z&BTcJ{Xw]3hFPGFm%r}%TP#vEnQQj`).toString(CryptoJS.enc.Utf8);
        if (credentials.password !== dePassword)
            return res.status(401).json(errorModal("authentication", "password", "Incorrect password"));
        const accessToken = await jwt.sign(
            {
                id: user._id,
                isAdmin: user.isAdmin
            },
            `Ykdq(yYYv4D>NEL=~E=F}IN]~vosG5';32Z+T,|(W42Z(eKs="x)lQAU~v701)~`,
            { expiresIn: "1w" } // token will expire in 1 week need to relogin after that
        );

        const { password, ...userInfo } = user._doc;
        return res.status(201).json({ ...userInfo, accessToken });

    } catch (err) {
        res.status(500).send(errorModal("server", "server", "Server error try again!"));
    }
});
module.exports = router;