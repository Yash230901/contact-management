const asyncHandler = require("express-async-handler")
const jwt = require("jsonwebtoken");


const validateToken = asyncHandler(async (req, res, next) => {
    let token;
    let authHeader = req.headers.authorization || req.headers.Authorization;
    if (authHeader && authHeader.startsWith("Bearer ")) {
        token = authHeader.split(" ")[1];//we are getting the token by splitting the array[0] index which is bearer and getting the token value.
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
            if (err) {
                res.status(401);
                throw new Error("Suer is not authorized");
            }
            req.user = decoded.user;
            next();

            if (!token) {
                res.status(401);
                throw new Error("User is not authorized or token is missing");
            }
        })
    }
})

module.exports = validateToken