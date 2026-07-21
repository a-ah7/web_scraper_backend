const {
    runPythonScraper
} = require("./services/pythonScraperService");

async function testPythonConnection() {
    try {
        const result = await runPythonScraper(
            "https://example.com"
        );

        console.log("Node connected to Python successfully:");
        console.log(result);
    } catch (error) {
        console.error("Connection failed:");
        console.error(error.message);
    }
}

testPythonConnection();