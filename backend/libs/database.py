import pymongo


class Database:
    # to make configurable
    port = 27017
    addr = "localhost" 
    database = "smeghammer"

    def __init__(self) -> None:
        # set up database connection
        self.connection = pymongo.MongoClient(self.addr,self.port)[self.database]

    def get_wads(self,detail=False, type="maps",id=False, slug=False) -> list:
        try:
            filter = {}
            if type:
                filter = {'type':type}
            if id:
                filter['id'] = int(id)  #is a better way than this!
            if slug:
                filter['slug'] = slug
            projection = {"id":True,"title":True,"description":True,"slug":True,"type":True,"imageUrl":True,"_id":False}
            if detail:
                projection = {"_id":False}

            return list(self.connection['maps'].find(filter,projection))
        except Exception as ex:
            # log errort here
            return []
        
    def add_item(self, item):
        new_id = self._get_new_id()
        if new_id:
            print(new_id,item)
            #  item['id'] = new_id # errors on trying to update the model...
            self.update_item(item,new_id)


    def update_item(self, item, new_id=None):
        print("in database layer: ",item)

        try:
            print(item.IDGames_download if item.IDGames_download else "XXXXXXXX")
            id_key = item.id
            if new_id:
                id_key = new_id


            # argh!! https://fastapi.tiangolo.com/tutorial/body/#use-the-model
            update_obj = {
                # https://www.geeksforgeeks.org/ternary-operator-in-python/
                "type":item.type if item.type else "",
                "title":item.title if item.title else "",
                "description":item.description if item.description else "",
                "imageUrl":item.imageUrl if item.imageUrl else "",
                "allImages":item.allImages if item.allImages else [],
                "slug":item.slug if item.slug else "",
                # "title":item["type"],
                "IDGames_download":item.IDGames_download if item.IDGames_download else "",
            }
            if new_id:
                update_obj['id'] = new_id
                result = self.connection['maps'].insert_one(update_obj)
            else:
                result = self.connection['maps'].update_one({"id":item.id},{ "$set" : update_obj })
            print(result)



            return {"status":"ok","message":"ok", "source":"database.update_item"}
        except Exception as ex:
            print(str(ex))
            return {"status":"error","message":str(ex), "source":"database.update_item"}

    def _get_new_id(self):
        try:
            new_id = 0
            print('getting incremented ID...')
            # see https://stackoverflow.com/questions/32076382/mongodb-how-to-get-max-value-from-collections
            # res = self.connection['maps'].find({},{"id":True,"_id":False}).sort({'id':-1}).limit(1)
            # res = self.connection['maps'].find({},{"id":True,"_id":False}).sort('id',pymongo.DESCENDING).limit(1)
            # print(res[0].get('id',False))
            # # dicty = dict(res)
            # # thingy = dicty.get('id',0)
            # # print(thingy)
            # ARGH!!!! https://stackoverflow.com/questions/8109122/how-to-sort-mongodb-with-pymongo
            current_max_id = self.connection['maps'].find({},{"id":True,"_id":False}).sort('id',pymongo.DESCENDING).limit(1)[0].get('id',False)
            if current_max_id:
                return current_max_id + 1
            raise Exception("Cannot determine current max ID!")
        except Exception as ex:
            print(str(ex))
            return False
