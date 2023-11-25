import requests
from bs4 import BeautifulSoup
from urllib.parse import urlparse
import re


# Step 1: Define the helper functions
def is_valid_url(url):
    result = urlparse(url)
    return all([result.scheme, result.netloc])

def check_url_validity(url):
    try:
        response = requests.head(url)
        return response.status_code == 200
    except requests.exceptions.RequestException:
        return False

def extractText(url):
    response = requests.get(url)
    html_content = response.text
    soup = BeautifulSoup(html_content, 'html.parser')
    text = soup.get_text()
    return text

# Step 2: Fetch the website's content
url = "https://www.t-systems.com/de/en"
response = requests.get(url)
html_content = response.text

# Step 3: Parse the HTML
soup = BeautifulSoup(html_content, 'html.parser')

# Step 4: Extract the desired data
strWebSiteText = ""
links = soup.find_all('a')
for link in links:
    url = link.get('href')
    if is_valid_url(url) and check_url_validity(url):
        strWebSiteText += extractText(url)

# Step 5: Store or process the extracted data
# Example: Save the extracted text to a text file
with open('T-SystemsText_Cloud.txt', 'w', encoding='utf-8') as file:
    file.write(strWebSiteText)


# Step 1: Open the saved file
file_path = 'T-SystemsText.txt'  # Replace with the path to your saved file
with open(file_path, 'r', encoding='utf-8') as file:
    content = file.read()

# Step 2: Remove consecutive spaces (more than two)
content_modified = re.sub(r' {3,}', ' ', content)

# Step 3: Save the modified content without encoding
output_path = 'T-SystemsText_Cloud.txt'  # Replace with the desired output file path
with open(output_path, 'wb') as file:
    file.write(content_modified.encode())
