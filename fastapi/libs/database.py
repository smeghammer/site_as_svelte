import logging
import pymongo

# https://stackoverflow.com/questions/533048/how-to-log-source-file-name-and-line-number-in-python
logging.basicConfig(format='%(levelname)s: %(asctime)s - %(filename)s (%(lineno)d) - %(message)s')
logging.getLogger().setLevel(logging.DEBUG)


class Database:
    # to make configurable
    port = 27017     #27027
    addr = "localhost" 
    database = "smeghammer"
    # https://www.mongodb.com/docs/languages/python/pymongo-driver/current/connect/mongoclient/
    # This is the SERVICE NAME form the compose file
    conn_uri = "mongodb://db:27017/"


    def __init__(self) -> None:
        # set up database connection
        # self.connection = pymongo.MongoClient(self.addr,self.port)[self.database]
        self.connection = pymongo.MongoClient(self.conn_uri)[self.database]


    def get_wads(self,detail=False, type="maps",id=False, slug=False) -> list:
        logging.debug("Getting WADs")
        logging.debug(f"detail: %s type %s, id: %s, slug: %s",detail, type, id, slug)
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
            logging.debug("FILTER:")
            logging.debug(filter)
            result = list(self.connection['maps'].find(filter,projection))
            logging.debug("GETTING RESULT:")
            logging.debug(result)
            return result
        except Exception as ex:
            logging.error(f"Error getting WADs: %s",ex)
            return [{"status":"error", "message":ex}]


    def add_item(self, item):
        new_id = self._get_new_id()
        if new_id:
            logging.debug(f"item %s created with id %s",item.title, new_id)
            #  item['id'] = new_id # errors on trying to update the model...
            self.update_item(item,new_id)


    def update_item(self, item, new_id=None):
        logging.info(f"in database layer: %s",item.id)
        try:
            # argh!! https://fastapi.tiangolo.com/tutorial/body/#use-the-model
            update_obj = {
                # https://www.geeksforgeeks.org/ternary-operator-in-python/
                "type":item.type if item.type else "",
                "title":item.title if item.title else "",
                "description":item.description if item.description else "",
                "imageUrl":item.imageUrl if item.imageUrl else "",
                "allImages":item.allImages if item.allImages else [],
                "slug":item.slug if item.slug else "",
                "IDGames_download":item.IDGames_download if item.IDGames_download else "",
            }
            if new_id:
                update_obj['id'] = new_id
                result = self.connection['maps'].insert_one(update_obj)
            else:
                result = self.connection['maps'].update_one({"id":item.id},{ "$set" : update_obj })
            logging.debug(result)
            return {"status":"ok","message":"ok", "source":"database.update_item"}
        except Exception as ex:
            logging.warning(str(ex))
            return {"status":"error","message":str(ex), "source":"database.update_item"}


    def _get_new_id(self):
        try:
            # new_id = 0
            logging.debug('getting incremented ID...')
            # see https://stackoverflow.com/questions/32076382/mongodb-how-to-get-max-value-from-collections
            # https://stackoverflow.com/questions/8109122/how-to-sort-mongodb-with-pymongo
            try:
                current_max_id = self.connection['maps'].find({},{"id":True,"_id":False}).sort('id',pymongo.DESCENDING).limit(1)[0].get('id',False)
                logging.debug(current_max_id)
                if current_max_id:
                    logging.debug("Found existing ID. Incrementing...")
                    return current_max_id + 1
            except:

                # if current_max_id:
                #     logging.debug("Found existing ID. Incrementing...")
                #     return current_max_id + 1
                logging.debug("returning first ID")
                return 1
            # raise Exception("Cannot determine current max ID!")
        except Exception as ex:
            logging.warning(str(ex))
            return False
