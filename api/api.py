from flask import Flask

app = Flask(__name__, static_folder='../build', static_url_path='/')


@app.route('/test')
def hello_world():
    return 'Hello World'


@app.route('/')
def index():
    return app.send_static_file('index.html')
