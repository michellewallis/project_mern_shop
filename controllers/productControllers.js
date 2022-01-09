//modulos
const Product = require("../models/productModel");
const Manufactures = require("../models/manufacturerModels");
// controladores

//funcion obtener todos los productos
exports.getAllProducts = async (req, res) => {
    try {
        // hacer query
        //filtrado
        const queryObj = { ...req.query }; // spread crea copia del array
        const excludedFields = ["page", "sort", "limit"];

        excludedFields.forEach(el => delete queryObj[el]); // foreach eliminate the field of the obj that have this coincidence

        // filtrado
        let queryStr = JSON.stringify(queryObj); // cambia el objeto a string
        queryStr = queryStr.replace(
            /\b(gte|gt|lte|lt)\b/g,
            match => `$${match}`
        ); // uso de  regex cambiar a simbolo $

        let query = Product.find(JSON.parse(queryStr));

        //segunda funcion sorting
        if (req.query.sort) {
            const sortBy = req.query.sort.split(",").join(" ");

            query = query.sort(sortBy);
        } else {
            query = query.sort("name");
        }
        //3. paginacion
        const page = req.query.page * 1 || 1; // crear el limite de pagina
        const limit = req.query.limit * 1 || 10; // unidades por pagina
        const skip = (page - 1) * limit; // crear pagina y su limite

        query = query.skip(skip).limit(limit);

        if (req.query) {
            const numProducts = await Product.countDocuments();
            if (skip >= numProducts) throw new Error("This page doesnt exit");
        }

        //ejecutamos la query
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
//funcion para crear producto
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
// obtener producto por id
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
//actualizar producto por id
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

//borrar producto por id
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
