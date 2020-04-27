import json

'''
  Convert country data csv to json format
  this data will only contain the country name and statistical information
'''
with open('CountryData.csv', 'r') as f_read:
  country_data = f_read.read().split('\n')


labels = country_data[0].split(',')

new_country_data = {}

for country in country_data[1:]:
  data = country.split(',')
  data = dict(zip(labels, data))
  new_country_data[data['name']] = data 


with open('CountryData.json', 'w') as f_write:
  json.dump(new_country_data, f_write)
