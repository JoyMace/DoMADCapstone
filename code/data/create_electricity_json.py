from pandas import read_csv, DataFrame, Series

df = read_csv("input/origin_data.csv")
#for the purpose of DoMAD, we will show data for Special Administrrative Regions (Like Hong Kong) and other territories (like Greenland) as their own countries. 
non_countries = ['Caucasian and Central Asia', 'Caucasus and Central Asia', 'Eastern Asia (including Japan)', \
                'Eastern Asia (not including Japan)', 'Eastern Europe', 'Europe', 'High income', 'High income: OECD', \
                'High income: nonOECD', 'Latin America and Caribbean', 'Low & middle income', 'Low income', \
                'Lower middle income', 'Middle income', 'Not classified', 'Nothern America', 'Oceania', \
                'Oceania (not including Australia and New Zealand)', 'Southern Asia', 'Sub-Saharan Africa', \
                'Upper middle income', 'Western Asia', 'World']

#get all indices to drop
dropIndices = []
for country in non_countries:
    dropIndices += list(df.loc[df["Country Name"] == country].index)

#drop all indices
df.drop(dropIndices, inplace = True)

elecDf = df.loc[(df["Indicator Code"] == "1.2_ACCESS.ELECTRICITY.RURAL") | \
          (df["Indicator Code"] == "1.1_ACCESS.ELECTRICITY.TOT")]

total_lists_nums = []
rural_lists_nums = []

#want to populate new_columns 1.2RURAL, 1.1TOT with corresponding list
for i, vals in elecDf.iterrows():
  if i%2 == 0:
    rural_lists_nums.append(vals.values[4:]) #get the time series values
  else:
    total_lists_nums.append(vals.values[4:])
        
#no need to worry about if rural or total lists are the same length, since the dataframe is guaranteed to have
#an even number of rows, since there are 2 rows for each country
#just need to create new df with only unique country codes
finalDf = DataFrame({"COUNTRY.CODE": elecDf["Country Code"].unique()}) #note that pandas.unique doesn't sort the values unlike np.unique
finalDf["ACCESS.ELECTRICITY.RURAL"] = rural_lists_nums
finalDf["ACCESS.ELECTRICITY.TOTAL"] = total_lists_nums
finalDf.to_json(path_or_buf = "output/country_electricity.json", orient = 'records')