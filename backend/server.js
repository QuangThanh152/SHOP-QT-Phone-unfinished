const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const cookieParser = require("cookie-parser"); // Only one require
const userRoute = require("./routes/userRoute");
const productRoute = require("./routes/productRoute");
const erroHandler = require("./middleware/errorMiddleware");

const app = express();

// middleWares
app.use(express.json());
app.use(cookieParser()); // Add cookie-parser middleware
app.use(express.urlencoded({ extended: false }));
app.use(
    cors({
        origin: ["http://localhost:3000", "https://shopito-app.vercel.app"],
        credentials: true,
    })
);

// routes
app.use("/api/users", userRoute);
app.use("/api/products", productRoute);

app.get("/", (req, res) => {
    res.send("Home Page...");
});

// Connect to MongoDB
const PORT = process.env.PORT || 5000;

// Error Middleware
app.use(erroHandler);

mongoose.set('strictQuery', true);
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, () => {
            console.log(`Server chạy trên cổng ${PORT}`);
        });
    })
    .catch((err) => console.log(err));
