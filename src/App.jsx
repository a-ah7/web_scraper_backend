import { useState } from "react";
import "./App.css";

function App() {
  // تعريف المتغيرات
  const [url, setUrl] = useState("");
  const [scrapedData, setScrapedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleScrape = async () => {
    
    if (!url) return;

    setLoading(true);
    setError("");
    setScrapedData(null);

    try {
      const response = await fetch("http://192.168.68.106:3000/api/scrape", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          url: url,
        }),
      });

      const data = await response.json();
     console.log(data)
      if (data.error) {
        setError(data.error);
      } else {
        setScrapedData(data.data);
      }
    } catch (err) {
      setError("error server");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>🌐 Web Scraper Platform</h1>

      <p className="subtitle">
        Enter any website URL and extract its information.
      </p>

      <div className="search-box">
        <input
          type="url"
          placeholder="https://example.com"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <button onClick={handleScrape} disabled={loading}>
          {loading ? "Scraping..." : "Start Scraping"}
        </button>
      </div>

      <div className="result-card">
        <h2>Scraped Information</h2>

        {error && <p style={{ color: "red" }}>{error}</p>}

        <div className="info">
          <h3>Title</h3>
          <p>{scrapedData?.title || "Waiting for data..."}</p>
        </div>

        <div className="info">
          <h3>Description</h3>
          <p>{scrapedData?.description || "Waiting for data..."}</p>
        </div>

        <div className="info">
          <h3>Address</h3>
          <p>{scrapedData?.address || "Waiting for data..."}</p>
        </div>
      </div>
    </div>
  );
}

export default App;