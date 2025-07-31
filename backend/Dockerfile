# https://hasura.io/blog/how-to-write-dockerfiles-for-python-web-apps-6d173842ae1d
FROM python:3.10-alpine



# set working dir in container:
WORKDIR /app

# copy requirements
COPY requirements.txt ./

# and install them:
RUN pip install --no-cache-dir --upgrade -r requirements.txt
# probably need to pip install stuff here:

# RUN "mkdir" "app"
# RUN "pwd"
# the context is already /app/
# COPY test.py ./
# https://docs.docker.com/reference/dockerfile/#workdir
COPY . ./
# RUN pwd

# EXPOSE 8000



# https://betterstack.com/community/guides/scaling-python/fastapi-with-docker/

# ENTRYPOINT [ "python","main.py" ]
# see https://fastapi.tiangolo.com/deployment/docker/#create-the-fastapi-code
CMD ["fastapi", "run", "main.py"]

# or for dev:
# https://www.uvicorn.org/#quickstart
# https://fastapi.tiangolo.com/deployment/manually/#run-the-server-program
# CMD ["uvicorn","main:app","--host", "0.0.0.0", "--port", "8000","--reload"]
