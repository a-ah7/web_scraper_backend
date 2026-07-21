function getHealth(request, response) {
    response.status(200).json({
        success: true,
        message: "Node.js backend is running"
    });
}

module.exports = {
    getHealth
};