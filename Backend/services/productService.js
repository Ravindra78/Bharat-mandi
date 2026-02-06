const Product = require('../models/Product');
const logger = require('../utils/logger');

exports.createProduct = async (productData) => {
    try {
        const product = new Product(productData);
        await product.save();
        logger.info(`Product created: ${product._id}`);
        return product;
    } catch (err) {
        logger.error(`Create product error: ${err.message}`);
        throw err;
    }
};

exports.getProductById = async (productId) => {
    try {
        const product = await Product.findById(productId).populate('seller', 'name email');
        if (!product) {
            const error = new Error('Product not found');
            error.statusCode = 404;
            throw error;
        }
        return product;
    } catch (err) {
        logger.error(`Get product error: ${err.message}`);
        throw err;
    }
};

exports.getProductsByCategory = async (category) => {
    try {
        const products = await Product.find({ category, isActive: true }).populate('seller', 'name email');
        return products;
    } catch (err) {
        logger.error(`Get products by category error: ${err.message}`);
        throw err;
    }
};

exports.getProductsBySeller = async (sellerId) => {
    try {
        const products = await Product.find({ seller: sellerId, isActive: true });
        return products;
    } catch (err) {
        logger.error(`Get products by seller error: ${err.message}`);
        throw err;
    }
};

exports.getAllProducts = async () => {
    try {
        const products = await Product.find({ isActive: true }).populate('seller', 'name email');
        return products;
    } catch (err) {
        logger.error(`Get all products error: ${err.message}`);
        throw err;
    }
};

exports.updateProduct = async (productId, updateData) => {
    try {
        const product = await Product.findByIdAndUpdate(productId, updateData, { new: true });
        logger.info(`Product updated: ${productId}`);
        return product;
    } catch (err) {
        logger.error(`Update product error: ${err.message}`);
        throw err;
    }
};

exports.deleteProduct = async (productId) => {
    try {
        await Product.findByIdAndUpdate(productId, { isActive: false });
        logger.info(`Product deleted: ${productId}`);
        return { msg: 'Product deleted' };
    } catch (err) {
        logger.error(`Delete product error: ${err.message}`);
        throw err;
    }
};

exports.searchProducts = async (query) => {
    try {
        const products = await Product.find({
            $or: [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } },
            ],
            isActive: true,
        }).populate('seller', 'name email');
        return products;
    } catch (err) {
        logger.error(`Search products error: ${err.message}`);
        throw err;
    }
};
