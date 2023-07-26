const Video = require('../model/videoModel');
const Product = require('../model/productModel');

const thumbnailList = async (req, res) => {
    try {
        const videos = await Video.find({}, '_id username title imageUrl videoUrl');
        res.json(videos);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
}

const getVideoDetails = async (req, res) => {
    try {
        const videos = await Video.findById(req.params.id);
        const products = await Product.find({
            videoId: req.params.id
        })
        res.json({
            videos,
            products
        });
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
};

module.exports = {
    thumbnailList,
    getVideoDetails
};