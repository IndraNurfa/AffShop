const requireLogin = (req, res, next) => {
    if (req.session.userId) {
        next();
    } else {
        res.status(401).json({
            error: 'Unauthorized: User must be logged in.'
        });
    }
};

module.exports = {
    requireLogin
};