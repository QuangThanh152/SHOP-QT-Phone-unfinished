const asyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/userModel");

const gererateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_SECRET, {
        expiresIn: "1d"
    })
}

// người dùng đăng ký
const registerUser = asyncHandler(async (req, res) => {
    const { name, email, password } = req.body;
    // validation
    if (!name || !email || !password) {
        res.status(400);
        throw new Error("Vui lòng điền tất cả các ô!");
    }
    if (password.length < 6) {
        res.status(400);
        throw new Error("Mật khẩu phải có ít nhất 6 ký tự!");
    }
    // check email đã đăng ký
    const userExists = await User.findOne({ email });
    if (userExists) {
        res.status(400);
        throw new Error("Email đã tồn tại!");
    }
    // tạo mới người dùng
    const user = await User.create({
        name,
        email,
        password
    })
    // tạo token cho người dùng
    const token = gererateToken(user._id);
    if(user) {
        const { _id, name, email, role } = user;
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400), // tgian 1 ngày
            // secure: true,
            // samesite: none,
        })
        // gửi data user về
        res.status(201).json({
            _id, 
            name, 
            email, 
            role, 
            token,
        })
    }else {
        res.status(400);
        throw new Error("Đăng ký thất bại!");
    }
    // res.send("Register User...");
});

// Người dùng đăng nhập
const loginUser = asyncHandler (async (req, res) => {
    const {email, password} = req.body;
    // validation request
    if(!email || !password) {
        res.status(400);
        throw new Error("Vui lòng điền email và mật khẩu!");
    }
    // check email
    const user = await User.findOne({email});
    if (!user) {
        res.status(400);
        throw new Error("Email chưa được đăng ký!");
    }

    //Check mật khẩu đúng hay sai
    const passwordIsCorrect = await bcrypt.compare(password, user.password);

    // gererate Token
    const token = gererateToken(user._id);
    if(user && passwordIsCorrect) {
        // truy vấn người dùng theo email
        const newUser = await User.findOne({email}).select("-password");
        res.cookie("token", token, {
            path: "/",
            httpOnly: true,
            expires: new Date(Date.now() + 1000 * 86400), // tgian 1 ngày
            // secure: true,
            // samesite: none,
        });
        // send user data
        res.status(201).json(newUser);
    }else {
        res.status(400);
        throw new Error("Email hoặc mật khẩu không đúng!");
    }
})

// Người dùng đăng xuất
const logout = asyncHandler (async (req, res ) => {
    // res.send("Logout")
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0), // tgian: ngay tức thì
        // secure: true,
        // samesite: none,
    });
    return res.status(200).json({
        message: "Đăng xuất thành công!"
    })
});

// get user
const getUser = asyncHandler (async (req, res) => {
    // res.send("Get user")
    // truy vấn người dùng theo id
    const user = await User.findById(req.user._id).select("-password");
    if(user) {
        res.status(200).json(user);
    }else {
        res.status(404)
        throw new Error("Không tìm thấy người dùng!");
    }
})

// lấy trạng thái đăng nhập
const getLoginStatus = asyncHandler (async (req, res) => {
    // res.send("Get login status")
    const token = req.cookies.token;
    if (!token) {
        return res.json(false);
    }
    // verify token
    const verified = jwt.verify(token, process.env.JWT_SECRET)
    if (verified) {
        res.json(true);
    }else {
        res.json(false);
    }
});

// cập nhật người dùng
const updateUser = asyncHandler (async (req, res) => {
    // res.send("Correct")
    const user = await User.findById(req.user._id);

    if (user) {
        const { name , phone, address } = user;
        user.name = req.body.name || name;
        // user.password = req.body.password || password;
        user.phone = req.body.phone || phone;
        user.address = req.body.address || address;

         // Chỉ cập nhật password nếu nó tồn tại trong body
         if (req.body.password) {
            if (req.body.password.length < 6 || req.body.password.length > 75) {
                res.status(400);
                throw new Error("Mật khẩu phải có từ 6 đến 75 ký tự");
            }
            user.password = req.body.password; // Cập nhật mật khẩu
        } else {
            // Nếu không muốn thay đổi mật khẩu, bỏ qua kiểm tra xác thực mật khẩu
            user.password = user.password;  // Đảm bảo không thay đổi mật khẩu
        }

        const updatedUser = await user.save();
        res.status(200).json(updatedUser);
    }else {
        res.status(404)
        throw new Error("Không tìm thấy người dùng!");
    }
});

// cập nhật ảnh đại diện
const updatePhoto = asyncHandler (async (req, res) => {
    // res.send("Update photo");
    const { photo } = req.body;
    const user = await User.findById(req.user._id);
    user.photo = photo;
    const updateUser = await user.save();
    res.status(200).json(updateUser);
})
module.exports = {
    registerUser,
    loginUser,
    logout,
    getUser,
    getLoginStatus,
    updateUser,
    updatePhoto
}