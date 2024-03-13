import express from "express";
import { Product } from "../models/productModel.js";

const router = express.Router();

// Routes
// Find All Products
router.get('/', async (req, res) => {
    try {
        const products = await Product.find();

        return res.status(200).json({
            count: products.length,
            data: products
        });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
});

// Find Product By Id
router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const product = await Product.findById(id);

        return res.status(200).json(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
});

// Save Product
router.post('/', async (req, res) => {
    try {
        if (!req.body.name || !req.body.price || !req.body.quantity) {
            return res.status(400).send({ message: "Send All Required Fields: name, price and quantity" });
        }

        const product = await Product.create({
            name: req.body.name,
            price: req.body.price,
            quantity: req.body.quantity,
        });

        return res.status(201).send(product);
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

// Update Product
router.put('/:id', async (req, res) => {
    try {
        if (!req.body.name || !req.body.price || !req.body.quantity) {
            return res.status(400).send({ message: "Send All Required Fields: name, price and quantity" });
        }

        const { id } = req.params;

        const result = await Product.findByIdAndUpdate(id, req.body);

        if (!result) {
            return res.status(404).json({ message: "Product Not Found" })
        }

        return res.status(200).send({ message: "Product Updated Successfully!" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

// Update Product
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;

        const result = await Product.findByIdAndDelete(id);

        if (!result) {
            return res.status(404).json({ message: "Product Not Found" })
        }

        return res.status(200).send({ message: "Product Deleted Successfully!" });
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })
    }
})

export default router;