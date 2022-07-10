from fastapi import FastAPI
from recognition import initialize, single_image

app = FastAPI()
initialize()

@app.get('/')
async def root():
    return {"message": "Welcome to the Face Recognition API"}

@app.get('/{file_path}/{voter_id}')
async def query(voter_id,file_path):
    result = single_image(file_path,voter_id)
    return {"Description" : "Face Recognition for Voter Route","file_path":file_path,"voter_id":voter_id,"results": result}