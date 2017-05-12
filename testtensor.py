

from flask import *
import pandas as pd

app = Flask(__name__)

@app.route('/')
def index():
    return make_response(open('templates/tensorflow_test.html').read())

# @app.route('/api/<int:id>')
# def api(id):
#     return make_response(dummy_data[id].to_json(orient='records'))

if __name__ == '__main__':
    app.run(debug = True)
 
