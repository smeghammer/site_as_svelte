import logging
from fastapi import FastAPI
import uvicorn
from libs.database import Database
from libs.basemodels import DoomItem

# https://stackoverflow.com/questions/533048/how-to-log-source-file-name-and-line-number-in-python
logging.basicConfig(format='%(levelname)s: %(asctime)s - %(filename)s (%(lineno)d) - %(message)s')
logging.getLogger().setLevel(logging.DEBUG)

# suppress pymongo logs. If we don't do this, we get all the pymongo debug logs as well
# as our own logs...
# see - https://pymongo.readthedocs.io/en/4.13.2/examples/logging.html
logging.getLogger('pymongo').setLevel(logging.WARNING)

app = FastAPI()
database = Database()


def getDetail(type,identifier):
    ''' Abstracion of various calls to get item(s) data: '''
    # identifier may be a string or an int:
    logging.debug(f"getting %s, %s",identifier, type)
    data=None
    try:
        logging.debug("trying with int identifier")
        identifier = int(identifier)
        data = database.get_wads(detail=True,type=type,id=identifier)
    except Exception as ex:
        ''' what do I see as params here? '''
        logging.debug(f"TYPE %s, IDENTIFIER: %s", type, identifier)
        try:
            data = database.get_wads(detail=True,type=type,slug=identifier)
            logging.debug("trying with string identifier")
            logging.debug(data)
        except:
            # do better logic here:
            logging.warning(f"Failed to get WADs from database %s",ex)
    if data:
        return {"status":"ok","message":f"retrieved {type} details data OK","data":data}
    return {"status":"error","message":f"no matching {type}","data":data}


'''
This needs to be split into better defined methods
'''

'''
API for Doom WAD/map based items.
'''
@app.get('/api')
async def root():
    ''' Return root message '''
    return {"status":"ok","message":"container backend API root TEST"}


'''
Read-only retrieval endpoints. They overload the back-end function `get_wads()`
'''
@app.get('/api/all')
async def wads():
    ''' return JSON list all entries '''
    data = database.get_wads(detail=False,id=False)
    return {"status":"ok","message":"retrieved all items summary data OK","data":data}


@app.get('/api/all/details')
async def wads():
    ''' return JSON list all entries '''
    data = database.get_wads(detail=True,id=False)
    return {"status":"ok","message":"retrieved all items summary data OK","data":data}


@app.get('/api/wads')
async def wads():
    ''' return JSON list all WAD entries '''
    data = database.get_wads()
    return {"status":"ok","message":"retrieved all WAD summary data OK","data":data}


@app.get('/api/wads/details')
async def wads():
    ''' return JSON list all WAD entries with all details '''
    data = database.get_wads(True)
    return {"status":"ok","message":"retrieved all WAD detail data OK","data":data} 


@app.get('/api/snippets')
async def wads():
    ''' return JSON list all snippet/demo entries '''
    data = database.get_wads(False,"snippets")
    return {"status":"ok","message":"retrieved all snippet summary data OK","data":data}


@app.get('/api/snippets/details')
async def wads():
    ''' return JSON list all snippet/demo entries with full details '''
    data = database.get_wads(True,"snippets")
    return {"status":"ok","message":"retrieved all snippet details data OK","data":data}


@app.get('/api/wad/id/{item_id}')
async def wads(item_id):
    ''' return JSON object of specified WAD with full details, keyed on ID '''
    return getDetail(type='maps',identifier=item_id)


@app.get('/api/snippet/id/{item_id}')
async def wads(item_id):
    ''' return JSON object of specified snippet/demo map with full details, keyed on ID '''
    return getDetail(type='snippets',identifier=item_id)
 

@app.get('/api/wad/{slug}')
async def wads(slug):
    ''' return JSON object of specified WAD with full details, keyed on slug '''
    return getDetail(type='maps',identifier=slug)


@app.get('/api/snippet/{slug}')
async def wads(slug):
    ''' return JSON object of specified snippet/demo map with full details, keyed on slug '''
    return getDetail(type='snippets',identifier=slug)



'''
Update endpoints. see https://fastapi.tiangolo.com/tutorial/body/
Note the Pydantic import that handles this
'''
@app.post('/api/edit/update')
async def update(doomItem: DoomItem):
    logging.debug('calling update back-end...')
    try:
        ''' Update an entry. The code needs to be flexible enough to allow new fields, so I don't want to 
        simply test for existing fields, but I DO want to validate agains existing ones, and allow unknown 
        ones. Called from the /update form handler. '''
        return database.update_item(doomItem)
    except Exception as ex:
        logging.warning(ex)
        return({"status":"error","message":str(ex)})


@app.post('/api/edit/add')
async def add(doomItem: DoomItem):  # ok it seems fiddly to UPDATE a pydantic model once created, so I need to get the incremented ID differently.
    ''' add a new entry. Same note as above:  
     called from the /add form handler. '''
    logging.debug('calling add back-end')
    return database.add_item(doomItem)


''' run the app. Note this entrypoint is not called from the Dockerfile '''
if __name__ == "__main__":
    logging.info("Attempting to start...")
    uvicorn.run("main:app")
