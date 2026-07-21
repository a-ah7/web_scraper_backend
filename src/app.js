const itemsRoutes = require("./routes/itemsRoutes");
const express = require("express");
const cors = require("cors");

const healthRoutes = require("./routes/healthRoutes");
const scrapingRoutes = require("./routes/scrapingRoutes");
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/scrape", scrapingRoutes);

app.use("/api/health", healthRoutes);
app.use("/api/items", itemsRoutes);

app.use((request, response) => {
    response.status(404).json({
        success: false,
        message: "Route not found"
    });
});

module.exports = app; 
