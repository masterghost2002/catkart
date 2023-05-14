const jwt = require('jsonwebtoken');
const verfiyToken = (req, res, next)=>{
    const authHeader = req.headers.token;
    if(authHeader){
        const accessToken = authHeader.split(" ")[1];
        jwt.verify(accessToken, `Ykdq(yYYv4D>NEL=~E=F}IN]~vosG5';32Z+T,|(W42Z(eKs="x)lQAU~v701)~`, (err, user)=>{
            if(err) return res.status(403).json({authenticationError:"You are unauthorized"});
            else req.user = user;
            next();
        })
    }
    else return res.status(401).json({authenticationError:"You are not authenticated"});
};
const verfiyTokenAndAuthorization = (req, res, next)=>{
    verfiyToken(req, res, ()=>{
        if(req.user.id === req.params.id || req.user.isAdmin) next();
        else return res.status(403).json({authenticationError:"You are unauthorized"});
    })
}
const verfiyTokenAndAdmin = (req, res, next)=>{
    verfiyToken(req, res, ()=>{
        if(req.user.isAdmin) next();
        else return res.status(403).json({authenticationError:"You are unauthorized **ADMIN ACCESS ARE RESTRICTED**"});
    })
}
module.exports = {verfiyToken, verfiyTokenAndAuthorization, verfiyTokenAndAdmin};