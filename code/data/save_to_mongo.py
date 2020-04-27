import json
from pymongo import MongoClient

'''
  takes the final country data and loads it into the MongoDB Atlas Databse
   - Make sure to select which db to insert data into ( test or database )
'''
with open('data/final_country_data.json', 'r') as json_read:
  data = json.load(json_read)

cluster_name = 'domad'
cluster_password = 'DoMADTemp%232020'
database = 'test'
#database = 'DoMAD'

connect_string = 'mongodb+srv://{}:{}@domad-spnir.mongodb.net/{}?retryWrites=true&w=majority'.format(cluster_name, cluster_password, database)
client = MongoClient(connect_string, 27017)
db = client[database]
collection = db['countries']

# delete current entries and repopulate
collection.delete_many({})
collection.insert_many(data.values())

client.close()
