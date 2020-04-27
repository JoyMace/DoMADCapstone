import json
from collections import defaultdict

'''
load in country data and format it for:
 - Country dropdown
 - Continent country dropdown
 - Search location dropdown 
'''
with open('data/final_country_data.json') as json_file:
  country_json = json.load(json_file)
  dropdown = []
  continent_dropdown = defaultdict(lambda: list())
  search_location_dropdown = []
  for country_name, country_data in country_json.items():
    # normal dropdown
    dropdown.append('<option value="{}">{}</option>'.format(country_name, country_name))
    # continent dropdown
    continent = country_data['generalInformation']['continentName']
    continent_dropdown[continent].append('<option value="{}">{}</option>'.format(country_name, country_name))
    # search locations dropdown
    name = country_name
    continent_name = country_data['generalInformation']['continentName']
    continent_abbr = country_data['generalInformation']['continentAbbr'].lower()
    row_val = '{' + '"name": "{}", "continent": "{}", "contCode": "{}"'.format(name, continent_name, continent_abbr) + '}'
    search_location_dropdown.append(row_val)


with open('data/dropdowns/country_dropdown.html', 'w') as f_write:
  f_write.write('\n'.join(dropdown))

for continent, options in continent_dropdown.items():
  with open('data/dropdowns/{}_dropdown.html'.format(continent), 'w') as f_write:
    f_write.write('\n'.join(options)) 

with open('data/dropdowns/search_location_dropdown.txt', 'w') as f_write:
  f_write.write('\n'.join(search_location_dropdown))

  
