from flask import Flask, request, jsonify
from flask_cors import CORS

import script

app = Flask(__name__, static_folder='../build', static_url_path='/')
CORS(app)  # This will enable CORS for all routes


@app.route('/score', methods=['POST'])
def get_score():
    data = request.get_json()
    if 'location' in data and 'k' in data: 
        param_value=data['location']
        k_value = data['k']
        nearest_k = script.return_nearest_scores(param_value, k_value)
        nearest_k_dict = nearest_k.to_dict(orient='records')
        return jsonify(nearest_k_dict)

@app.route('/test')
def hello_world():
    return 'Hello World'


@app.route('/')
def index():
    return app.send_static_file('index.html')
