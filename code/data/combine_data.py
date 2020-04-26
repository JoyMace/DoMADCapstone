import json

with open('data/CountryJson.json') as json_file:
    country_json = json.load(json_file)

with open('data/CountryData.json') as json_file:
    country_data = json.load(json_file)

new_country_data = {}

for country in country_json:
  our_country_name = country['originalName']
  country_name = country['name']
  if country_name in country_data:
    current_data = country_data[country_name]
  elif our_country_name in country_data:
    current_data = country_data[our_country_name]
  else:
    print('didn\'t have data for:', country_name)
    continue
  
  if 'name' in current_data:
    del current_data['name']
  country['statistics'] = current_data
  new_country_data[country_name] =  country


with open('data/final_country_data.json' ,'w') as json_write:
  json.dump(new_country_data, json_write)
