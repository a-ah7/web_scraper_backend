const pool = require("../config/database");

const {
    runPythonScraper
} = require("../services/pythonScraperService");

async function startScraping(request, response) {
    const { url } = request.body;

    if (typeof url !== "string" || url.trim() === "") {
        return response.status(400).json({
            success: false,
            message: "URL is required"
        });
    }

    let normalizedUrl;

    try {
        normalizedUrl = new URL(url.trim()).toString();
    } catch {
        return response.status(400).json({
            success: false,
            message: "Invalid URL"
        });
    }

    let requestId = null;

    try {
      
        const [requestResult] = await pool.execute(
            "INSERT INTO Scraping_Request (url, status) VALUES (?, ?)",
            [normalizedUrl, "processing"]
        );

        requestId = requestResult.insertId;

      
        const scrapedData = await runPythonScraper(normalizedUrl);

      
        const [dataResult] = await pool.execute(
            "INSERT INTO Scraped_Data (title, description, address, url, request_id) VALUES (?, ?, ?, ?, ?)",
            [
                scrapedData.title ?? null,
                scrapedData.description ?? null,
                scrapedData.address ?? null,
                scrapedData.url ?? normalizedUrl,
                requestId
            ]
        );

    
        await pool.execute(
            "UPDATE Scraping_Request SET status = ? WHERE request_id = ?",
            ["completed", requestId]
        );

        return response.status(201).json({
            success: true,
            message: "Scraping completed successfully",
            requestId,
            dataId: dataResult.insertId,
            data: scrapedData
        });
    } catch (error) {
        if (requestId !== null) {
            try {
                await pool.execute(
                    "UPDATE scraping_request SET status = ? WHERE request_id = ?",
                    ["failed", requestId]
                );
            } catch (statusError) {
                console.error(
                    "Failed to update request status:",
                    statusError.message
                );
            }
        }

        console.error("Scraping failed:", error.message);

        return response.status(500).json({
            success: false,
            message: "Scraping failed",
            error: error.message
        });
    }
}

module.exports = {
    startScraping
};