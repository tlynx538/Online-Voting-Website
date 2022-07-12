import face_recognition 
import os 

KNOWN_FACES = 'known_faces'
UNKNOWN_FACES = 'unknown_faces'
TOLERANCE = 0.6 
MODEL ='cnn'
known_faces = []
known_names = []

def initialize():
    print("Face Recognition Module Initializing...")
    print("Loading Images")
    for name in os.listdir(KNOWN_FACES):
        for filename in os.listdir(f'{KNOWN_FACES}/{name}'):
            image = face_recognition.load_image_file(f'{KNOWN_FACES}/{name}/{filename}')
            encoding = face_recognition.face_encodings(image)[0]
            known_faces.append(encoding)
            known_names.append(name)
            
def single_image(file_name,character_name):
    print(f"Detecting Faces in File {file_name}")
    image = face_recognition.load_image_file(f'{UNKNOWN_FACES}/{file_name}')
    locations = face_recognition.face_locations(image, model=MODEL)
    encodings = face_recognition.face_encodings(image,locations)
    print(f'Found {len(encodings)} faces')
    for face_encoding, face_location in zip(encodings, locations):
        results = face_recognition.compare_faces(known_faces, face_encoding, TOLERANCE)
        match = None 
        if True in results:
            match = known_names[results.index(True)]
            if match == character_name:
                return True
    return False  

if __name__ == "__main__":
    initialize()
    single_image(f'{UNKNOWN_FACES}/2.jpg')
    
