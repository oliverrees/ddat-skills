import requests
from bs4 import BeautifulSoup
import json

def scrape_skills_data(url):
    # Fetch the webpage content
    response = requests.get(url)
    soup = BeautifulSoup(response.content, 'html.parser')

    # Find all skill sections
    skill_sections = soup.find_all('div', {'class': 'govuk-accordion__section'})

    # List to store all skills data
    skills_data = []

    # Iterate through each skill section
    for section in skill_sections:
        # Extract skill title
        title = section.find('span', {'class': 'govuk-accordion__section-button'}).get_text(strip=True)
        

        # Extract skill description
        description = section.find('p', {'class': 'govuk-body govuk-!-margin-bottom-3'}).get_text(strip=True)

        # Extracting levels and their descriptions
        levels_data = {}
        levels = section.find_all('tr')

        for level in levels:
            if len(level) > 2 :
              level_name = level.find('p')
              if level_name is not None:
                level_name = level_name.get_text(strip=True)
                # Extract level descriptions
                level_descriptions = [li.get_text(strip=True) for li in level.find_all('li')]
                levels_data[level_name] = level_descriptions

        # Extract role requirements (if any)
        role_required = []
        role_section = section.find('h3', {'class': 'govuk-heading-s govuk-!-margin-bottom-2'})
        if role_section:
            role_required = [li.get_text(strip=True) for li in role_section.find_next_sibling('ul').find_all('li')]

        # Adding skill data to the list
        skills_data.append({
            "title": title,
            "description": description,
            "levels": levels_data,
            "roleRequired": role_required
        })
        

    return skills_data

# URL of the webpage to scrape
url = "https://ddat-capability-framework.service.gov.uk/skills.html"

# Scrape the data and print in JSON format
skills_json_data = scrape_skills_data(url)

# Save JSON to file
with open('skills.json', 'w') as f:
    json.dump(skills_json_data, f, indent=2)
