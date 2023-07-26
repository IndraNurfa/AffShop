const express = require('express');
const router = express.Router();

const {
    thumbnailList,
    getVideoDetails
} = require('../handler/videoHandler');

const {
    addComment,
    getComments
} = require('../handler/commentHandler');

const routes = [{
    method: 'GET',
    path: '/getThumbnails',
    handler: thumbnailList
}, {
    method: 'GET',
    path: '/video/:id',
    handler: getVideoDetails
}, {
    method: 'POST',
    path: '/comment',
    handler: addComment
}, {
    method: 'GET',
    path: '/comment/:id',
    handler: getComments
}];

routes.forEach(route => {
    const {
        method,
        path,
        handler
    } = route;
    router[method.toLowerCase()](path, handler);
});

module.exports = router;