import requests
from bs4 import BeautifulSoup

def scrape_t_systems(url):
    response = requests.get(url)
    
    if response.status_code != 200:
        print("Failed to retrieve the webpage")
        return None
    
    soup = BeautifulSoup(response.content, 'html.parser')
    info_class = "o-teaser-collection "\
                   "o-teaser-collection--magazine "\
                   "teaser-collection--magazine "\
                   "js-collection--magazine "\
                   "js-microanimate"
    info_section = soup.find_all('div', class_=info_class)
    if len(info_section) == 0:
        print("No info section found")
        return None
    fields = info_section[0].find_all('a', class_="o-teaser-default js-microanimate")
    t_systems_info = {}

    for field in fields:
        title = field.find('h4', class_="a-headline ").text
        
        link = field['href']
        t_systems_info[title] = link

    return t_systems_info        


t_systems_data = scrape_t_systems("https://www.t-systems.com/de/en")
print(t_systems_data)