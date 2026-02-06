const productService = require('../services/productService');
const logger = require('../utils/logger');

exports.createProduct = async (req, res) => {
    try {
        const productData = { ...req.body, seller: req.user.id };
        const product = await productService.createProduct(productData);
        res.status(201).json({ message: 'Product created successfully', product });
    } catch (err) {
        logger.error(err.message);
        res.status(err.statusCode || 500).json({ msg: err.message });
    }
};

exports.getProduct = async (req, res) => {
    try {
        const product = await productService.getProductById(req.params.id);
        res.json(product);
    } catch (err) {
        logger.error(err.message);
        res.status(err.statusCode || 500).json({ msg: err.message });
    }
};

exports.getAllProducts = async (req, res) => {
    try {
        const products = await productService.getAllProducts();
        res.json(products);
    } catch (err) {
        logger.error(err.message);
        res.status(500).json({ msg: err.message });
    }
};

exports.getProductsByCategory = async (req, res) => {
    try {
        const products = await productService.getProductsByCategory(req.params.category);
        res.json(products);
    } catch (err) {
        logger.error(err.message);
        res.status(500).json({ msg: err.message });
    }
};

exports.getSellerProducts = async (req, res) => {
    try {
        const products = await productService.getProductsBySeller(req.user.id);
        res.json(products);
    } catch (err) {
        logger.error(err.message);
        res.status(500).json({ msg: err.message });
    }
};

exports.updateProduct = async (req, res) => {
    try {
        const product = await productService.updateProduct(req.params.id, req.body);
        res.json({ message: 'Product updated successfully', product });
    } catch (err) {
        logger.error(err.message);
        res.status(err.statusCode || 500).json({ msg: err.message });
    }
};

exports.deleteProduct = async (req, res) => {
    try {
        const result = await productService.deleteProduct(req.params.id);
        res.json(result);
    } catch (err) {
        logger.error(err.message);
        res.status(err.statusCode || 500).json({ msg: err.message });
    }
};

exports.searchProducts = async (req, res) => {
    try {
        const { query } = req.query;
        if (!query) {
            return res.status(400).json({ msg: 'Search query is required' });
        }
        const products = await productService.searchProducts(query);
        res.json(products);
    } catch (err) {
        logger.error(err.message);
        res.status(500).json({ msg: err.message });
    }
};
