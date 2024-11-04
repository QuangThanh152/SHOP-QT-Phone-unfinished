const asyncHandler = require("express-async-handler");
const Product = require("../models/productModel");
const { Mongoose } = require("mongoose");

const createProduct = asyncHandler(async (req, res) => {
    // res.send("Corect")
    const { 
        name,
        sku,
        category,
        brand,
        quantity,
        description,
        image,
        regularPrice,
        price,
        color
    } = req.body;

    if(!name || !category ||!brand || !quantity || !price || !description) {
        res.status(400)
        throw new Error("Hãy điền đủ thông tin");
    }

    // tạo sản phẩm
    const product = await Product.create({
        name,
        sku,
        category,
        brand,
        quantity,
        description,
        image,
        regularPrice,
        price,
        color
    })

    res.status(201).json(product);
});

// getProducts (Lấy Tổng sản phẩm)
const getProducts = asyncHandler (async (req, res) => {
    // res.send("OK getProducts")
    const products = await Product.find().sort("-createdAt");
    res.status(200).json(products);
})

// get Single Products ( Lấy Đơn sản phẩm)
const getProduct = asyncHandler (async (req, res) => {
    const product = await Product.findById(req.params.id);
    if(!product) {
        res.status(404)
        throw new Error("Sản phẩm không tồn tại");
    }
    res.status(200).json(product);

})

// Delete Product
const deleteProduct = asyncHandler(async(req, res) => {
    // res.send("okDelete")
    const product = await Product.findById(req.params.id);
    if(!product) {
        res.status(404)
        throw new Error("Sản phẩm không tồn tại");
    }
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Sản phẩm đã được xóa" });
})

// update Product
const updateProduct = asyncHandler(async(req, res) => {
    // res.send("ok UPdate");
    const { 
        name,
        category,
        brand,
        quantity,
        description,
        image,
        regularPrice,
        price,
        color
    } = req.body;

    const product = await Product.findById(req.params.id);
    if(!product) {
        res.status(404)
        throw new Error("Sản phẩm không tồn tại");
    }

    // Update Product
    const updatedProduct = await Product.findByIdAndUpdate(
        { _id: req.params.id},
        {
            name,
            category,
            brand,
            quantity,
            description,
            image,
            regularPrice,
            price,
            color 
        },
        {
            new: true,
            runValidators: true
        }
    )

    res.status(200).json(updatedProduct);
});

// Review Product
const reviewProduct = asyncHandler (async ( req, res ) => {
    // res.send("okRate")
    const { star, review, reviewDate } = req.body;
    const { id } = req.params;

    // validation
    if (star < 1 || !review ) {
        res.status(400)
        throw new Error("Hãy đánh giá và nhận xét")
    }

    const product = await Product.findById(id)
    if(!product) {
        res.status(404)
        throw new Error("Sản phẩm không tồn tại")
    }

    // update Rating
    product.ratings.push(
        {
            star,
            review,
            reviewDate,
            name: req.user.name,
            userID: req.user._id,
        }
    )
    product.save()
    res.status(200).json({message: "Đã thêm nhận xét."});
})

// delete Review
const deleteReview = asyncHandler (async (req, res) => {
    const { userID } = req.body;

    const product = await Product.findById(req.params.id);

    if (!product) {
        res.status(404)
        throw new Error("Sản phẩm không tồn tại");
    }
    const newRatings = product.ratings.filter((rating) => {
        return rating.userID.toString() !== userID.toString()
    })
    product.ratings = newRatings;
    product.save()
    res.status(200).json({message : "Đã xóa nhận xét"})
})

// update Review
const updateReview = asyncHandler (async (req, res) => {
    // res.send("okUpdateRv")
    const { star, review, reviewDate, userID } = req.body;
    const { id } = req.params;

    if (star < 1 || !review ) {
        res.status(400)
        throw new Error("Hãy đánh giá và nhận xét")
    }

    const product = await Product.findById(id)
    if(!product) {
        res.status(404)
        throw new Error("Sản phẩm không tồn tại")
    }

    // Match user to review
    if(req.user._id.toString() !== userID) {
        res.status(401)
        throw new Error("Bạn không có quyền cập nhật nhận xét này")
    }

    // update product review
    const updatedReview = await Product.findOneAndUpdate( 
        {
            _id: product._id,
            "ratings.userID": Mongoose.Types.ObjectId(userID)
        },
        {
            $set: {
                "ratings.$.star": star,
                "ratings.$.review": review,
                "ratings.$.reviewDate": reviewDate
            }
        }
    )
    if (updatedReview) {
        res.status(200).json({message: "Đã cập nhật nhận xét."});
    }else {
        res.status(400).json({message: "Không thể cập nhật nhận xét."});

    }
});


module.exports = {
    createProduct,
    getProducts,
    getProduct,
    deleteProduct,
    updateProduct,
    reviewProduct,
    deleteReview,
    updateReview
};