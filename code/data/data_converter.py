from pandas import read_csv, DataFrame, Series

df = read_csv("origin_data.csv")
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
finalDf.to_json(path_or_buf = "country_electricity.json", orient = 'records')