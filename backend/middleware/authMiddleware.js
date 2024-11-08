const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel")

const protect = asyncHandler (async (req, res, next)=> {
    try {
        const token = req.cookies.token;
        if (!token) {
            res.status(401);
            throw new Error("Không thể xác minh, vui lòng đăng nhập!")
        }
        // verify token
        const verified = jwt.verify(token, process.env.JWT_SECRET);

        // get user id from token
        const user = await User.findById(verified.id).select("-password")

        if(!user) {
            res.status(401);
            throw new Error("Không tìm thấy tài khoản")
        }
        req.user = user;
        next()
    } catch (error) {
        res.status(401);
        throw new Error("Không thể xác minh, vui lòng đăng nhập!")
    }
})

// Admin
const adminOnly = (req, res, next) => {
    if (req.user && req.user.role === "admin") {
        next();
    }
    else {
        res.status(401);
        throw new Error("Bạn không có quyền truy cập")
    }
}

module.exports = {
    protect,
    adminOnly,
 
};