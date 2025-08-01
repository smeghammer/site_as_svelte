from pydantic import BaseModel

class DoomItem(BaseModel):
    id: int|None = None  # this needs to be auto-increment. This will be a database layer function.
    title: str
    type: str   # in reality, needs to be an ENUM (TODO:)
    description: str
    imageUrl: str # can we validate with a regex??
    slug: str
    allImages: list[str]    # see https://stackoverflow.com/questions/75611338/how-do-i-pass-an-array-of-strings-to-a-fastapi-post-request-function
    IDGames_download: str | None=None

