import { useState } from "react";
import "./App.css";


function App() {

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

      const response = await fetch(
        "http://192.168.68.110:3000/api/scrape",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            url: url
          })
        }
      );

      const data = await response.json();
      console.log(data);
      if (data.error) {
        setError(data.error);
      } else {
        setScrapedData(data.data);
      }

    } catch (error) {
      setError("Error server");
    } finally {
      setLoading(false);
    }

  };

  return (
    <div className="container">
      <div className="glass-card">
        <div className="header">
          <h1>
            🌐 Web Scraper Platform
          </h1>
          <p>
            Enter any website URL and extract its information.
          </p>
        </div>
        <div className="search-box">
          <input
            type="url"
            placeholder="https://example.com"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
          />
          <button
            onClick={handleScrape}
            disabled={loading}
          >
            {
              loading
                ?
                "Scraping..."
                :
                "Start Scraping"
            }
          </button>
        </div>
        {
          error &&
          <div className="error-box">
            {error}
          </div>
        }
        <div className="dashboard">
          {/* TOP CARDS */}

          <div className="top-cards">

  <div className="glass-item">
    <h3>Website Logo</h3>

    {scrapedData?.favicon &&
    scrapedData.favicon !== "No Favicon Found" ? (
      <img
        src={scrapedData.favicon}
        alt="Website Logo"
        className="website-logo"
        onError={(e) => {
          e.target.style.display = "none";
        }}
      />
    ) : (
      <p>Waiting for logo...</p>
    )}
  </div>

  <div className="glass-item">
    <h3>Title</h3>

    <p>
      {scrapedData?.title || "Waiting for data..."}
    </p>
  </div>

  <div className="glass-item">
    <h3>Address</h3>

    {scrapedData?.address ? (
      <a
        href={scrapedData.address}
        target="_blank"
        rel="noreferrer"
      >
        {scrapedData.address}
      </a>
    ) : (
      <p>Waiting for address...</p>
    )}
  </div>

</div>

          {/* BOTTOM CARDS */}
          <div className="bottom-cards">
            <div className="glass-item">
              <h3>
                Description
              </h3>
              <p>
                {
                  scrapedData?.description ||
                  "Waiting for description..."
                }
              </p>
            </div>
          
           <div className="glass-item">
  <h3>Social Links</h3>

  {scrapedData?.social_links?.length > 0 ? (
    scrapedData.social_links.map((link, index) => (
      <p key={index}>
        <a href={link} target="_blank" rel="noreferrer">
          {link}
        </a>
      </p>
    ))
  ) : (
    <p>Waiting for links...</p>
  )}
</div>
          </div>
        </div>
      </div>
    </div>

  );

}
export default App;