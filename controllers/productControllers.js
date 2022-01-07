//modules
const Product = require("../models/productModel");
const Manufactures = require("../models/manufacturerModels");
// controllers

//get all products function
exports.getAllProducts = async (req, res) => {
    try {
        // build a query
        //filtering
        const queryObj = { ...req.query }; // spread create a copy of this array
        const excludedFields = ["page", "sort", "limit"];

        excludedFields.forEach(el => delete queryObj[el]); // foreach eliminate the field of the obj that have this coincidence

        // filtering
        let queryStr = JSON.stringify(queryObj); // change the obj to string
        queryStr = queryStr.replace(
            /\b(gte|gt|lte|lt)\b/g,
            match => `$${match}`
        ); // here the regex set a dollar sign

        let query = Product.find(JSON.parse(queryStr));

        //second function sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");

            query = query.sort(sortBy);
        } else {
            query = query.sort("name");
        }
        //3. pagination
        const page = req.query.page * 1 || 1; // create page with the limit
        const limit = req.query.limit * 1 || 10; // quantity unids per page
        const skip = (page - 1) * limit; // here it create page and limit

        query = query.skip(skip).limit(limit);

        if (req.query) {
            const numProducts = await Product.countDocuments();
            if (skip >= numProducts) throw new Error("This page doesnt exit");
        }

        //execute query
        const products = await query.populate("manufacturer");

        res.status(200).json({
            status: "succes",
            results: products.length,
            data: { products },
        });
    } catch (error) {
        res.status(400).json({
            status: "failed",
            message: error,
        });
    }
};
//create product function
exports.createProduct = async (req, res) => {
    try {
        const newProduct = await Product.create(req.body);
        res.status(201).json({
            status: "succes",
            data: { product: newProduct },
        });
    } catch (error) {
        res.status(404).json({
            status: "failed",
            message: error,
        });
    }
};
//get product by id
exports.getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json({
            status: "success",
            data: { product },
        });
    } catch (error) {
        res.status(404).json({
            status: "failed",
            message: error,
        });
    }
};
//UPDATE one product by id
exports.updateProduct = async (req, res) => {
    try {
        const Product = await Product.findByIdAndUpdate(
            req.params.id,
            req.body,
            {
                new: true,
                runValidators: true,
            }
        );
        res.status(200).json({
            status: "success",
            data: "update PRODUCT by id",
        });
    } catch (error) {
        res.status(404).json({
            status: "failed",
            message: error,
        });
    }
};

//DELETE one product by id
exports.deleteProduct = async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(204).json({
            status: "success",
            data: null,
        });
    } catch (error) {
        res.status(404).json({
            status: "failed",
            message: error,
        });
    }
};
