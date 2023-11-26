import os
from dotenv import load_dotenv
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# load environment variables
load_dotenv()

@app.get("/api/analyse")
def analyse():
    # proposal_href is id of the proposal
    proposal_href = request.args.get("href")
    """
    result = some_dict[proposal_href]
      result looks like this:
      [
        {
          "summary": "...",
          "matching_scores": [
            {
              "score": 0.9,
              "section": "Introduction"
            },
            {
              "score": 0.8,
              "section": "Conclusion"
            }
            ...
          ],
        },
      ]
    """
    return jsonify({"href": proposal_href, "status": "success"})

if __name__ == "__main__":
    app.run(
        host="127.0.0.1",
        port=8080,
        debug=False
    )