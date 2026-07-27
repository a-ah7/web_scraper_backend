import { useState } from "react";
import "./App.css";
import {
  FaGlobe,
  FaHeading,
  FaMapMarkerAlt,
  FaFileAlt,
  FaTags,
  FaShareAlt,
  FaSearch,
  FaPhoneAlt,
  FaEnvelope
} from "react-icons/fa";

function App() {
  const [url, setUrl] = useState("");
  const [scrapedData, setScrapedData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);

  const handleScrape = async () => {
    if (!url) return;

    setSearched(true);
    setLoading(true);
    setError("");
    setScrapedData(null);

    try {
      const response = await fetch(
        "http://192.168.68.117:3000/api/scrape",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ url }),
        }
      );

      const data = await response.json();

      if (data.error) {
        setError(data.error);
      } else {
        setScrapedData(data.data);
      }
    } catch (err) {
      setError("Unable to connect to server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container">
      <div className="glass-card">

        <div className="header">
          <h1>🌐 Web Scraper Platform</h1>
          <p className="subtitle">
            Extract website information instantly.
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
            <FaSearch />
            &nbsp;
            {loading ? "Scraping..." : "Start Scraping"}
          </button>
        </div>

        {error && (
          <div className="error-box">
            {error}
          </div>
        )}

        <div className="dashboard">

          <div className="top-cards">

            <div className="glass-item">
              <h3>
                <FaGlobe /> Website Logo
              </h3>

              {loading ? (
                <p>Loading...</p>
              ) : scrapedData?.favicon &&
                scrapedData.favicon !== "No Favicon Found" ? (
                <img
                  src={scrapedData.favicon}
                  alt="Website Logo"
                  className="website-logo"
                />
              ) : (
                <p>
                  {searched
                    ? "No logo found."
                    : "Website logo will appear here."}
                </p>
              )}
            </div>

            <div className="glass-item">
              <h3>
                <FaHeading /> Title
              </h3>

              <p>
                {loading
                  ? "Loading..."
                  : scrapedData?.title ||
                    (searched
                      ? "No title found."
                      : "Website title will appear here.")}
              </p>
            </div>
                        <div className="glass-item">
              <h3>
                <FaMapMarkerAlt /> Address
              </h3>

              {loading ? (
                <p>Loading...</p>
              ) : scrapedData?.address ? (
                <a
                  href={scrapedData.address}
                  target="_blank"
                  rel="noreferrer"
                >
                  {scrapedData.address}
                  
                </a>
              ) : (
                <p>
                  {searched
                    ? "No address found."
                    : "Website address will appear here."}
                </p>
              )}
            </div>

          </div>

          <div className="bottom-cards">



            <div className="glass-item">
              <h3>
                <FaFileAlt /> Description
              </h3>

              <p>
                {loading
                  ? "Loading..."
                  : scrapedData?.description ||
                    (searched
                      ? "No description found."
                      : "Website description will appear here.")}
              </p>
            </div>



            <div className="glass-item">
              <h3>
                <  FaPhoneAlt/>phone number
              </h3>

              <p>
                {loading
                  ? "Loading..."
                  : scrapedData?.Phone ||
                    (searched
                      ? "No description found."
                      : "Website phone number will appear here.")}
              </p>
            </div>


            <div className="glass-item">
              <h3>
                < FaEnvelope />email
              </h3>

              <p>
                {loading
                  ? "Loading..."
                  : scrapedData?.Email ||
                    (searched
                      ? "No description found."
                      : "Website email will appear here.")}
              </p>
            </div>



            <div className="glass-item">
              <h3>
                <FaTags /> Keywords
              </h3>

              <p>
                {loading
                  ? "Loading..."
                  : scrapedData?.keywords?.length
                  ? scrapedData.keywords.join(", ")
                  : searched
                  ? "No keywords found."
                  : "Website keywords will appear here."}
              </p>
            </div>
            
           
            

            <div className="glass-item" id="so">
  <h3>
    <FaShareAlt /> Social Links
  </h3>

  <div className="social-links">
    {loading ? (
      <p>Loading...</p>
    ) : scrapedData?.social_links?.length > 0 ? (
      scrapedData.social_links.map((link, index) => (
        <p key={index}>
          <a
            href={link}
            target="_blank"
            rel="noreferrer"
          >
            {link}
          </a>
        </p>
      ))
    ) : (
      <p>
        {searched
          ? "No social links found."
          : "Social links will appear here."}
      </p>
    )}
  </div>
</div>



          </div>

        </div>

      </div>
    </div>
  );
}

export default App;