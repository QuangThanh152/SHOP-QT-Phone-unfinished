const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const { ObjectId } = mongoose.Schema;

const userSchema = mongoose.Schema(
    {
        name: { 
            type: String, 
            required: [true, "Hãy Thêm Tên"] 
        },
        email: {
            type: String, 
            required: [true, "Hãy thêm email"], 
            unique: true,
            trim: true,
            match: [
                /^\S+@\S+\.\S+$/,
                "Hãy nhập một email hợp lệ"
            ]
        },
        password: { 
            type: String, 
            required: [true, "Hãy nhập mật khẩu"],
            minLength: [6, "Tối thiểu 6 ký tự."],
            maxLength: [75, "Tối đa 75 ký tự."]
        },

        role: { 
            type: String, 
            required: [true],
            default: "customer",
            enum: ["admin", "customer"], 
        },
        photo: {
            type: String,
            required: [true, "Thêm 1 ảnh"],
            default: "https://i.ibb.co/Y2tcqtQ/IMG-8711-polarr.jpg",
        },
        phone: {
            type: Number,
            match: [/^\d{9,11}$/, "Số điện thoại phải hợp lệ (9-11 chữ số)"],
            default: "+84",
        },
        address: {
            type: Object,
        },
        // State: {
        //     type: Object,
        // },
        // Country: {
        //     type: Object,
        // },
    }
);

// Encrypt pass before saving to DB
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();
    }
    // mã hóa password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
});
userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        return next();  // Nếu password không bị thay đổi, bỏ qua bước mã hóa
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
},
{
    timestamps: true,
}
);


const User = mongoose.model("User", userSchema);
module.exports = User;