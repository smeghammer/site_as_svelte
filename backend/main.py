import logging
from fastapi import FastAPI
import uvicorn
from libs.database import Database
from libs.basemodels import DoomItem


app = FastAPI()
database = Database()

def getDetail(type,identifier):
    ''' Abstracion of various calls to get item(s) data '''
    # identifier may be a string or an int:
    try:
        identifier = int(identifier)
        print(f'getting {identifier}, {type}')
        data = database.get_wads(True,type,identifier)
    except:
        data = database.get_wads(True,type,False,identifier)
    if data:
        return {"status":"ok","message":f"retrieved {type} details data OK","data":data}
    return {"status":"error","message":f"no matching {type}","data":data}
        

'''
API for Doom WAD/map based items.
'''
@app.get('/api')
async def root():
    logging.info("TEST")
    ''' Return root message '''
    return {"status":"ok","message":"container backend API root"}

'''
Read-only retrieval endpoints. They overload the back-end function `get_wads()`
'''

@app.get('/api/all')
async def wads():
    ''' return JSON list all entries '''
    
    data = database.get_wads(False,False)
    return {"status":"ok","message":"retrieved all items summary data OK","data":data}

@app.get('/api/all/details')
async def wads():
    ''' return JSON list all entries '''
    data = database.get_wads(True,False)
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
    return getDetail('maps',item_id)

@app.get('/api/snippet/id/{item_id}')
async def wads(item_id):
    ''' return JSON object of specified snippet/demo map with full details, keyed on ID '''
    return getDetail('snippets',item_id)
 
@app.get('/api/wad/{slug}')
async def wads(slug):
    ''' return JSON object of specified WAD with full details, keyed on slug '''
    return getDetail('maps',slug)

@app.get('/api/snippet/{slug}')
async def wads(slug):
    ''' return JSON object of specified snippet/demo map with full details, keyed on slug '''
    return getDetail('snippets',slug)



'''
Update endpoints
see https://fastapi.tiangolo.com/tutorial/body/
Note the Pydantic import that handles this
'''
@app.post('/api/edit/update')
async def update(doomItem: DoomItem):
    try:
        ''' Update an entry. The code needs to be flexible enough to allow new fields, so I don't want to 
        simply test for existing fields, but I DO want to validate agains existing ones, and allow unknown ones: 
        
        called from the /update form handler. '''
        print('calling update back-end')
        return database.update_item(doomItem)
    except Exception as ex:
        print(ex)
        return({"status":"error","message":str(ex)})

@app.post('/api/edit/add')
async def add(doomItem: DoomItem):  # ok it seems fiddly to UPDATE a pydantic model once created, so I need to get the incremented ID differently.
    ''' add a new entry. Same note as above:  
     called from the /add form handler. '''
    print('calling update back-end')
    return database.add_item(doomItem)


''' run the app '''
if __name__ == "__main__":
    print("Attempting to start...")
    uvicorn.run("main:app")

    

    
    
