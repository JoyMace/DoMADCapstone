import re
import json
import pycountry
import math
import nltk


# continent codes to names
continent_lookup = {
  'AF':'Africa',
  'AN':'Antarctica',
  'AS':'Asia',
  'EU':'Europe',
  'NA':'North america',
  'OC':'Oceania',
  'SA':'South america'
}

# retrieve ISO country information
with open('data/iso-country-info.txt', 'r') as f_read:
  for i in range(49):
    f_read.readline()
  temp_country_info = f_read.read().split('\n')
  iso_country_info = {}
  labels = temp_country_info[0].split('\t')
  labels[0] = 'ISO' # removing #
  for ci in temp_country_info[1:]:
    if len(ci):
      ci = ci.split('\t')
      iso_country_info[ci[0]] = dict(zip(labels,ci))

# retrieve iso language information
with open('data/iso-language-codes.csv', 'r') as f_read:
  iso_language_codes = {}
  lines = f_read.read().split('\n')
  for line in lines[1:]:
    if line:
      line = line.split(',', 1)
      iso_language_codes[line[0]] = line[1]

# retrive iso currency information
with open('data/iso-currency-codes.csv', 'r') as f_read:
  iso_currency_codes = {}
  lines = f_read.read().split('\n')
  labels = lines[0].split(',')
  for line in lines[1:]:
    if line:
      line = line.split(',')
      iso_currency_codes[line[2]] = dict(zip(labels, line))


# retrieve the country data we have
with open('data/CountryData.csv', 'r') as f_read:
  country_data = f_read.read().split('\n')
  country_names = [ country.split(',')[0] for country in country_data[1:] ]

def get_currency(alpha_2):
  if alpha_2 in iso_country_info:
    currency_code = iso_country_info[alpha_2]['CurrencyCode']
    if currency_code in iso_currency_codes:
      currency_name = iso_currency_codes[currency_code]['Currency']
      return currency_name
  return 'No Current Info'

def get_languages(alpha_2):
  formatted_languages = []
  if alpha_2 in iso_country_info:
    languages = iso_country_info[alpha_2]['Languages'].split(',')
    for lang in languages:
      lang_region = lang.split('-')
      lang_region_text = ''
      if lang_region[0] in iso_language_codes:
        lang_region_text += iso_language_codes[lang_region[0]]
      if len(lang_region) > 1:
        lang_region_text += ': ' + iso_country_info[lang_region[1]]['Country']
      formatted_languages.append(lang_region_text)
    formatted_languages = [ lang for lang in formatted_languages if len(lang) ]
  if len(formatted_languages) == 0:
    formatted_languages.append('No Current Info')
  return formatted_languages

def get_continent(alpha_2):
  if alpha_2 in iso_country_info:
    continent_abbr = iso_country_info[alpha_2]['Continent']
    continent_name = continent_lookup[continent_abbr].title()
    return (continent_abbr, continent_name)
  return ('No Current Info', 'No Current Info')
  

# these will store output data
country_json = []
missed_countries = []
countries_found = []

'''
  loop throug the countries an do the following:
    1. try using pycountry to get proper name and iso 3166 country codes
      a. If the country code is not show prompt for finding it
      b. if no country found add name to missed_countries
    2. begin constructing country json
    3. find country's currency name from iso 4217 abbreviation
    4. find country's languages from iso 639 abbreviation
    5. add country to country_json
'''
for c_name in country_names:
  #c_name = re.sub(r'[^\w ]', '', c_name)
  try:
    data = pycountry.countries.search_fuzzy(c_name)[0]
  except LookupError:
    best_dist = math.inf
    best_country = ""
    for country in pycountry.countries:
      dist = nltk.edit_distance(c_name, country.name)
      if(dist < best_dist):
        best_dist = dist
        best_country = country.name 
    print('\ncould not find data for: "{}"'.format(c_name))
    print('possible replacement: "{}" with distance: {}'.format(best_country, best_dist))
    user_check = input('is this correct? (y/n) ')
    if(user_check.lower() == 'y'):
      data = pycountry.countries.search_fuzzy(best_country)[0]
    else:
      found = True
      while(True):
        user_check = input('do you have the 3 letter country code for the replacement? (y/n) ')
        if (user_check.lower() == 'y'):
          user_code = input('please enter the 3 letter country code: ')
          data = pycountry.countries.get(alpha_3=user_code)
          if data == None:
            print('the country code couldn\'t be found')
          else:
            break
        elif user_check.lower() == 'n':
          missed_countries.append(c_name)
          found = False
          break
        else:
          print(user_check.lower())
      if not found:
        continue
    
  
  new_country = {
    'name': data.name,
    'originalName': c_name,
    'abbreviation': data.alpha_3,
    'generalInformation': {}
  }

  # get general information
  new_country['generalInformation']['currency'] = get_currency(data.alpha_2)
  new_country['generalInformation']['languages'] = get_languages(data.alpha_2)
  continent_abbr, continent_name = get_continent(data.alpha_2)
  new_country['generalInformation']['continentAbbr'] = continent_abbr
  new_country['generalInformation']['continentName'] = continent_name
    
  print(new_country)    
  country_json.append(new_country)
  countries_found.append(data.name)

print('-' * 100)
print('Finding countries missed')
print('-' * 100)

'''
  iterate over countries list to make sure we did not miss any
'''
for country in pycountry.countries:
  if country.name not in countries_found:
    new_country = {
      'name': country.name,
      'originalName': '',
      'abbreviation': country.alpha_3,
      'generalInformation': {},
    }

    # get general information
    new_country['generalInformation']['currency'] = get_currency(country.alpha_2)
    new_country['generalInformation']['languages'] = get_languages(country.alpha_2)
    continent_abbr, continent_name = get_continent(country.alpha_2)
    new_country['generalInformation']['continentAbbr'] = continent_abbr
    new_country['generalInformation']['continentName'] = continent_name

    print(new_country)
    country_json.append(new_country)

# save data
with open('data/CountryJson.json', 'w') as f_write:
  json.dump(country_json, f_write)

with open('data/MissedCountries.txt', 'w') as f_write:
  f_write.write('\n'.join(missed_countries))
