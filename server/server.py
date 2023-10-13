from flask import Flask, request, jsonify
from flask_cors import CORS
import utils

app = Flask(__name__)
CORS(app)


@app.route('/predict', methods=['POST'])
def predict():
    print("POST CALL")
    image_data = request.form['image_data']
    response = jsonify(utils.predict(image_data))
    response.headers.add('Access-Control-Allow-Origin', '*')
    return response


if __name__ == '__main__':
    utils.load_model()
    print("model yüklendi")
    app.run(port=5000)
