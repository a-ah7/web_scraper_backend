const items = [
    {
        id: 1,
        title: "First product",
        price: 25000,
        imageUrl: "https://example.com/image1.jpg",
        sourceUrl: "https://example.com/product1"
    },
    {
        id: 2,
        title: "Second product",
        price: 30000,
        imageUrl: "https://example.com/image2.jpg",
        sourceUrl: "https://example.com/product2"
    }
];

function getItems(request, response) {
    response.status(200).json({
        success: true,
        count: items.length,
        data: items
    });
}

module.exports = {
    getItems
};