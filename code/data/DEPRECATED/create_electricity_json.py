from pandas import read_csv, DataFrame, Series

def list_to_string(l):
    #given a list, write it out as a string such that Mongo can read it properly
    listString = ""
    for elem in l:
        s = str(elem)
        if s == 'nan':
            s = '{"$numberDouble": "NaN"}' #this format lets mongo know the value is NaN
        listString += s + ','
    return listString[:-1] #leave out the last comma

df = read_csv("input/origin_data.csv")
#for the purpose of DoMAD, we will show data for Special Administrrative Regions (Like Hong Kong) and other territories (like Greenland) as their own countries. 
non_countries = ['Caucasian and Central Asia', 'Caucasus and Central Asia', 'Eastern Asia (including Japan)', \
                'Eastern Asia (not including Japan)', 'Eastern Europe', 'Europe', 'High income', 'High income: OECD', \
                'High income: nonOECD', 'Latin America and Caribbean', 'Low & middle income', 'Low income', \
                'Lower middle income', 'Middle income', 'Not classified', 'Northern America', 'Nothern America', \
                'Oceania', 'Oceania (not including Australia and New Zealand)', 'Southern Asia', 'South Eastern Asia', \
                'Sub-Saharan Africa', 'Upper middle income', 'Western Asia', 'World']

#get all indices to drop
dropIndices = []
for country in non_countries:
    dropIndices += list(df.loc[df["Country Name"] == country].index)

#drop all regions that aren't countries/territories
df.drop(dropIndices, inplace = True)

#keep only the relevant rows
elecDf = df.loc[(df["Indicator Code"] == "1.2_ACCESS.ELECTRICITY.RURAL") | \
          (df["Indicator Code"] == "1.1_ACCESS.ELECTRICITY.TOT")]

total_lists_nums = []
rural_lists_nums = []

#Get relevant data from dataframe
for i, vals in elecDf.iterrows():
    if i%2 == 0:
        rural_lists_nums.append(vals.values[4:]) #get the time series values
    else:
        total_lists_nums.append(vals.values[4:])
        
#no need to worry about if rural or total lists are the same length, since the dataframe is guaranteed to have
#an even number of rows, since there are 2 rows for each country
#just need to create new df with only unique country codes
finalDf = DataFrame({"name": elecDf["Country Name"].unique(), #note that pandas.unique doesn't sort the values unlike np.unique
                     "abbreviation": elecDf["Country Code"].unique(),
                     "organizationIDs": None,
                     "generalInformation": None,
                     "statistics": None
                    })

#write the base structure as a json
finalDf.to_json(path_or_buf = "output/country_basic.json", orient = 'records')


#Read the json back in as a string
country_data_string = ""
with open("output/country_basic.json", 'r') as f:
    country_data_string = f.readline()
    
#Rewrite the json with the statistics
new_json = ""
#stats_index keeps the index of where to start writing the statistics
stats_index = country_data_string.find("statistics")+12
for i in range(len(total_lists_nums)):
    #keep previously written structure
    new_json += country_data_string[:stats_index]+"{"
    
    #get total electricity data as a string
    total_vals = list_to_string(total_lists_nums[i])
    total_elec = '"totalElectricity":[' + total_vals + '],'
    
    #get rural electricity data as a string
    rural_vals = list_to_string(rural_lists_nums[i])
    rural_elec = '"ruralElectricity":[' + rural_vals + ']}'
    
    #combine both electricity data and add it to the new json
    new_json += total_elec + rural_elec
    
    #reindex the country_data_string to skip the statistics 
    country_data_string = country_data_string[stats_index+4:]
    stats_index = country_data_string.find("statistics")+12
#Finish the json file
new_json += country_data_string

with open('output/country_electricity.json', 'w') as f:
    f.write(new_json)