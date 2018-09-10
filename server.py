import json
import os
import pickle
import time
# import urllib2
import pandas as pd
import json

from flask import Flask, render_template, request, Markup, jsonify
from flask_cors import CORS

app = Flask(__name__)

CORS(app)

@app.route('/', methods=['POST'])
# @app.route('/hi_flask')
def index():
    # return render_template('index.html', name=user_name, render=False)
    # data = request.get_json()
    # return jsonify({'data':50})
    result = {'hello': 50}
    return jsonify(result=50)
    





@app.route('/score', methods=['POST'])
def get_score():
    return render_template('index.html',
                           render=True,
                           score=50000
                           )


if __name__ == '__main__':
    app.run(debug=True)