import sys
import json
import requests
from bs4 import BeautifulSoup

def scrape_and_output(url):
    result_data = {
        "title": "",
        "description": "",
        "address": "",
        "url": url,
        "error": None
    }

    try:
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)'}
        response = requests.get(url, headers=headers, timeout=10)

        if response.status_code == 200:
            soup = BeautifulSoup(response.text, 'html.parser')

            if soup.title and soup.title.string:
                result_data["title"] = soup.title.string.strip()
            else:
                result_data["title"] = "No Title Found"

            meta_desc = soup.find('meta', attrs={'name': 'description'})
            if meta_desc and meta_desc.get('content'):
                result_data["description"] = meta_desc['content'].strip()
            else:
                result_data["description"] = "No Description Found"

            address_tag = soup.find('address')
            if address_tag:
                result_data["address"] = address_tag.get_text(separator=" ", strip=True)
            else:
                result_data["address"] = "No Address Found"

        else:
            result_data["error"] = f"Failed to fetch page. Status: {response.status_code}"

    except Exception as e:
        result_data["error"] = str(e)

    print(json.dumps(result_data, ensure_ascii=False))

if __name__ == "__main__":
    if len(sys.argv) > 1:
        target_url = sys.argv[1]
        scrape_and_output(target_url)
    else:
        print(json.dumps({"error": "No URL provided"}))