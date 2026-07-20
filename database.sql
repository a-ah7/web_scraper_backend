USE scraper_platform;
create table Scraping_Request ( request_id INT AUTO_INCREMENT PRIMARY KEY ,
  url VARCHAR(255),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  status VARCHAR(50),
  address varchar(50)
  );
  
  CREATE TABLE Scraped_Data (
	id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255),
    description TEXT,
    url VARCHAR(255),
	request_id INT,
    FOREIGN KEY (request_id)
        REFERENCES Scraping_Request(request_id)
);

  