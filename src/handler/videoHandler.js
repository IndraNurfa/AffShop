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
};

const getVideoDetails = async (req, res) => {
    try {
        const videos = await Video.findById(req.params.id);
        const products = await Product.find({
            videoId: req.params.id
        });

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

const addVideo = async (req, res) => {
    const {
        username,
        title,
        description,
        imageUrl,
        videoUrl
    } = req.body;

    const video = new Video({
        username: username,
        title: title,
        description: description,
        imageUrl: imageUrl,
        videoUrl: videoUrl,
        like: []
    });

    try {
        const videoToSave = await video.save();
        res.status(200).json({
            message: "Video saved successfully",
            comment: videoToSave
        })
    } catch (error) {
        res.status(400).json({
            message: error.message
        });
    }
};

module.exports = {
    thumbnailList,
    getVideoDetails,
    addVideo
};