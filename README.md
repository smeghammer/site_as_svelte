# Site rework

Note I have included the back-end database code in /backend. This doesn't need to be in the same location as the sveltekit code, but it does require a mongoDB with suitable database. See below for deployment and running.

## MongoDB back-end
This is required to house the back-end data driving the `/maps` and `/snippets` dynamic routes, as well as the `/admin` route.

This uses the existing standard Docker [mongoDB container](https://hub.docker.com/_/mongo) image.
It is run on localhost with standard mongoDB port mapping. It also uses a volume for persistent storage on the local filesystem. To first build, run:

`sudo docker run --name mongo -v /home/path/to/dev/mount/mongodata:/data/db -p 27017:27017 -d mongo:latest`

The data may be loaded from a mongodump, found in `/data/mongodumps/[database]`.

Alternatively, a database can be manually created, called `smeghammer` (currently not configurable, sorry). It contains a single collection, `maps`, with the following expected document structure:

```
{
    "_id" : ObjectId("64e3630e12d4431c91f02fc0"),
    "id" : NumberInt(3),
    "type" : "maps",    //or 'snippets'
    "title" : "[string]",
    "description" : "[string]",
    "imageUrl" : "[example image URL]", // to GH, e.g.: https://raw.githubusercontent.com/smeghammer/CardinalSin/master/screenshots/2.png
    "allImages" : [  // array of image URLs
        "[image URL]",
        "[image URL]"
    ],
    "slug" : "[slug path to entry]",  // dynamic slug path. 
    "IDGames_download" : "[URL string]"  // download location for map (optional)
}

```

A built image can be run with:

`sudo docker start mongo`

Note this is not run in a virtual environment. Also note that the port mapping is essential, as the OS running on the mongo docker image is very minimal and does not itself have any mongo CLI tools.

### useful CLI commands:

Note: May need `sudo` if docker group membership not correct.

 - `>docker ps` - list running containers. May need `sudo` id docker group membership not correct
 - `>docker run -it mongo bash` - start instance with interactive terminal (but see note above)


## Python database interface layer
A simple API built with FastAPI, exposing a number of JSON REST endpoints.

This uses the [FastAPI](https://fastapi.tiangolo.com/) framework, with [pymongo](https://pymongo.readthedocs.io/en/stable/) for database interactions.

This very basic python application should be run through a virtual environment for dependency management.

Note that the source code for this layer is stored in the [repo](https://github.com/smeghammer/site_as_svelte) in the `/backend` as a convenience, but is NOT a direct material requirement for the Sveltekit front-end code (though of course it is needed as a back-end API data source). See later for details.


### virtual environment setup

initialise the venv in the deployment directory, if not already done:

`> python3 -m venv  /home/path/to/tests/smegbackend/`

and activate it:

`source /home/path/to/tests/smegbackend/bin/activate`

Finally, it can be shut down with:

`deactivate`

### requirements.txt

A requirements.txt may be generated at any time with ( [ref](https://learnpython.com/blog/python-requirements-file/) ) :

`> pip freeze > requirements.txt`

and these requirements may be added to the venv with ( [ref](https://packaging.python.org/en/latest/guides/installing-using-pip-and-virtual-environments/#using-requirements-files) ):

`> python3 -m pip install -r requirements.txt`

NOTE: make sure you do this once the venv is activated, otherwise this will install the packah=ges globally, which may not be what you want.


### Starting

From within the running venv, at the correct directory, simply run the `main.py` python module:

`(smegbackend) user@machine:~/tests/smegbackend$ python3 main.py`

Note the prefix brackets, indicating we are in the venv of the specified name.

This should result in the `uvicorn` webserver startup messages:

```
INFO:     Started server process [64492]
INFO:     Waiting for application startup.
INFO:     Application startup complete.
INFO:     Uvicorn running on http://127.0.0.1:8000 (Press CTRL+C to quit)
```


### checking

If all went well, the API is exposed at localhost on port 8000, as noted in the startup messages; and can be seen in a browser:

`http://localhost:8000/api`

should result in a quick status message. Note - it is suggested that a `screen` [see](https://www.fullstackpython.com/screen.html) is used to prevent terminal proliferation:

```
{
  "status": "ok",
  "message": "backend API root"
}
```

One great feature of FastAPI is that it is self-documenting and all of the endpoints thus far created are displayed and - crucially - arguments and output are **auto-documented** based on the underlying code:

`http://localhost:8000/docs`

Further, all endpoints can be tested with either their GET or POST parameters, if such are needed, as the above auto-generated documentation is interactive for all endpoints.


## Sveltekit front-end

This is the web front-end of the [original site](https://www.smeghammer.com), reworked with Sveltekit. This was a learning exersize.

The aim was to recreate as much as possible using Sveltekit techniques, including back-end external API data sources. Please see notes on code for specific details.

### Prerequisites
There is a requirement for NodeJS and NPM at versions suitable for the current release of Sveltekit. 

It's actually quite tricky to find specific 'pre-requisites for Sveltekit' articles - it seems the assumption that NodeJS and NPM are present and understood is quite widespread (certainly in the sveltekit tutorials). Nonetheless:

[This](https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/Svelte_getting_started#requirements) or [this (better) ](https://hackernoon.com/getting-started-building-a-svelte-app-with-sveltekit) are typical. 

For reference - initialising a sveltekit application is done by:

 - `npm init svelte@next my-svelte-app` in the directory of your choice.

This will deploy the node packages into `/node_modules` (there are a lot...) and set up some config JSON files in the root.


**Important!** Due to the size of the `node_modules` directory, these are NOT stored in the repo, so will need to be re-reployed for a newly cloned repo. The repo already contains the relevant sveltekit configuration, so to rebuild the `node_modules`, run:

`> npm install`

This may take a while first time.

Finally, to run the application, use the following command:

`> npm run dev`

This will bootstrap the Sveltekit server, and start to log any `console.log()` commands in the code.

The site is also available on a browser at:

`http://localhost:5173/`







