const dotenv = require("dotenv").config({ path: "../../.env" });
const jwt = require("jsonwebtoken");

const verifyUserToken = (req, reply, next) => {
    if (!req.headers.authorization) {
        throw createError(401, "Unauthorized request. " + error);
    }
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        throw createError(401, "Access denied. No token provided. " + error);
    }
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded.user;
        next();
    } catch (error) {
        throw createError(401, "Invalid token. " + error);
    }
}

module.exports = verifyUserToken;
