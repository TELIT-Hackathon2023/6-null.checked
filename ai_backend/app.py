import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS

from test_data_dict import TEST_DATA_DICT

app = Flask(__name__)
CORS(app)

# load environment variables
load_dotenv()

@app.get("/api/analyse")
def analyse():
    # proposal_href is id of the proposal
    proposal_href = request.args.get("href")

    result = TEST_DATA_DICT[proposal_href]
    
    return jsonify(result)

if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=8080,
        debug=False
    )