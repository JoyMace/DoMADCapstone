import json
from collections import defaultdict

with open('data/final_country_data.json') as json_file:
  country_json = json.load(json_file)
  dropdown = []
  continent_dropdown = defaultdict(lambda: list())
  for country_name, country_data in country_json.items():
    dropdown.append('<option value="{}">{}</option>'.format(country_name, country_name))
    continent = country_data['generalInformation']['continentName']
    continent_dropdown[continent].append('<option value="{}">{}</option>'.format(country_name, country_name))


with open('data/dropdowns/country_dropdown.html', 'w') as f_write:
  f_write.write('\n'.join(dropdown))

for continent, options in continent_dropdown.items():
  with open('data/dropdowns/{}_dropdown.html'.format(continent), 'w') as f_write:
    f_write.write('\n'.join(options)) 


  
