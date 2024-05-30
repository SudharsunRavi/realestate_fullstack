const { errorHandler } = require("./error");
const jwt = require('jsonwebtoken');

const verifiedUser = (req, res, next) => {
    const token = req.cookies.token;
    if (!token) return errorHandler(401, 'Unauthorized user');

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return errorHandler(403, 'Invalid token');
        req.user = user;
        console.log(req.user)
        next();
    })
}

module.exports = {verifiedUser}