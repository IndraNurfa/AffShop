const Product = require('../model/productModel');

const addProduct = async (req, res) => {
    const {
        link,
        title,
        price
    } = req.body;

    const product = new Product({
        videoId: req.params.id,
        link: link,
        title: title,
        price: price
    });;

    try {
        const productToSave = await product.save();
        res.status(200).json({
            message: "Product saved successfully",
            comment: productToSave
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
}

module.exports = {
    addProduct
};