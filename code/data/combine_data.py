import json

'''
  Combines the statistical data with general information about a country
'''
with open('data/CountryJson.json') as json_file:
    country_json = json.load(json_file)

with open('data/CountryData.json') as json_file:
    country_data = json.load(json_file)

new_country_data = {}

# for countries that we do not have data for
no_country_found = { k:'No Current Info' for k,v in country_data['United States'].items() if k != 'name'  }

'''
  loop through the country json created with create_country_json.py and save statistical data to each country json
'''
for country in country_json:
  our_country_name = country['originalName']
  country_name = country['name']
  if country_name in country_data:
    current_data = country_data[country_name]
  elif our_country_name in country_data:
    current_data = country_data[our_country_name]
  else:
    print('didn\'t have data for:', country_name)
    current_data = no_country_found
  
  if 'name' in current_data:
    del current_data['name']
  country['statistics'] = current_data
  new_country_data[country_name] =  country


with open('data/final_country_data.json' ,'w') as json_write:
  json.dump(new_country_data, json_write)
