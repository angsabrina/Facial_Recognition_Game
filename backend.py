import matplotlib.pyplot as plt
import numpy as np
import keras
import tensorflow as tf
import os
import pandas as pd
from keras.models import Sequential
from keras.layers import Dense, Dropout, Activation, Flatten
from keras.layers import Convolution2D, MaxPooling2D
from keras.optimizers import Adadelta
from keras.utils import np_utils
import scipy.misc
import scipy
import numpy as np
from keras.preprocessing.image import ImageDataGenerator
from keras.models import model_from_json
import cv2
import sys
import PIL
from PIL import Image
import json
import ast
from io import StringIO
import base64

config = tf.ConfigProto()
config.gpu_options.allow_growth = True
sess = tf.Session(config=config)

def load():
	json_file = open('model.json', 'r')
	loaded_model_json = json_file.read()
	json_file.close()
	loaded_model = model_from_json(loaded_model_json)
	# load weights into new model
	loaded_model.load_weights("model.h5")
	print("Loaded model from disk")
	return loaded_model


def bounding_boxes():
	imagePath = 'images/kevin-sad-new.jpg'
	cascPath = "haarcascade_frontalface_default.xml"

	# Create the haar cascade
	faceCascade = cv2.CascadeClassifier(cascPath)

	# Read the image
	image = cv2.imread(imagePath)
	gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)


	# Detect faces in the image
	faces = faceCascade.detectMultiScale(
	    gray,
	    scaleFactor=1.1,
	    minNeighbors=5,
	    minSize=(30, 30),
	)

	print("Found {0} faces!".format(len(faces)))

	# Draw a rectangle around the faces
	for (x, y, w, h) in faces:
	    cv2.rectangle(image, (x, y), (x+w, y+h), (0, 255, 0), 2)

	# cv2.imshow("img", image)
	# cv2.waitKey(0)
	# cv2.destroyAllWindows()
	return x, y, w, h

def crop(x, y, w, h):
	
	img = cv2.imread('images/kevin-sad-new.jpg')
	crop_img = img[y:y+h, x:x+w]
	cv2.imwrite('images/kevin-sad-new-cropped.jpg', crop_img)
	cv2.imshow("cropped", crop_img)
	# cv2.waitKey(0)
	# cv2.destroyAllWindows()

def gray():
	image = cv2.imread('images/kevin-sad-new-cropped.jpg')
	gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)
	img = cv2.resize(gray, (48, 48), PIL.Image.ANTIALIAS)
	return img







## Start of HTTP stuff ## 
from http.server import BaseHTTPRequestHandler, HTTPServer

class S(BaseHTTPRequestHandler):
	def _set_headers(self):
		self.send_response(200)
		self.send_header('Content-type', 'application/json')
		self.end_headers()

	def do_GET(self):
		self._set_headers()
		self.wfile.write("<html><body><h1>hi!</h1></body></html>")

	def do_HEAD(self):
		self._set_headers() 
	    
	def do_POST(self):
		print ("POSTED, GOT SOMETHING?!")
		# Doesn't do anything with posted data
		content_length = int(self.headers['Content-Length']) # <--- Gets the size of data
		post_data = self.rfile.read(content_length) # <--- Gets the data itself


		print ('post_data = ', post_data)
		print ('type = ', type(post_data))
		post_data = post_data.decode("utf-8") 
		# json_input = json.loads(post_data)
		# json_input = json.loads(post_data.content.decode('utf-8'))

		json_dict = ast.literal_eval(post_data)
		# print ('type of post_data = ', type(post_data))
		print ('type of json_dict = ', type(json_dict["data"]))

		print ('hi', base64.decodestring(json_dict["data"]))





		## START LOGIC ##
		loaded_model = load()
		x, y, w, h = bounding_boxes()
		crop(x, y, w, h)
		img = gray()
		preds = loaded_model.predict(img.reshape(1, 48, 48, 1))
		mapping = {0: 'Angry', 1: 'Disgust', 2: 'Fear', 3: 'Happy', 4: 'Sad', 5: 'Surprise', 6: 'Neutral'}

		## have the correct answer beforehand
		correct_answer = 4
		score = preds[0][correct_answer] * 10
		print ('Score = ', score)
		self._set_headers()
		self.wfile.write("<html><body><h1>POST!</h1></body></html>")
        
def run(server_class=HTTPServer, handler_class=S, port=80):
    server_address = ('', port)
    httpd = server_class(server_address, handler_class)
    print ('Starting httpd...')
    httpd.serve_forever()

if __name__ == "__main__":
    from sys import argv

    if len(argv) == 2:
        run(port=int(argv[1]))
    else:
        run()