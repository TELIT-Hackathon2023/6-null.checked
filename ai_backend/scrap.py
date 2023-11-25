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
    t_systems_info = {}

    description = soup.find('div', class_="o-text-image text-image--intro js-microanimate")
    if description:
        description = description.find('p').text

    info_section = soup.find('div', class_=info_class)
    if not info_section:
        return [], description
    fields = info_section.find_all('a', class_="o-teaser-default js-microanimate")
    
    for field in fields:
        title = field.find('h4').text
        link = field['href']
        new_info, field_description = scrape_t_systems(link)
        if not field_description:
            print("No description found for {}".format(title))
            continue
        t_systems_info[title] = field_description
        for key in new_info:
            t_systems_info[key] = new_info[key]

    return t_systems_info, description


t_systems_data = scrape_t_systems("https://www.t-systems.com/de/en")
print(t_systems_data[0].keys())