from flask import Flask, request
import json
from solve import solve, turn


app = Flask(__name__)



@app.route("/",methods=['POST'])
def predict():
    content = request.get_json()
    target_cube = turn(content)
    is_solved, actions = solve(target_cube)
    results = [is_solved, actions]

    return json.dumps(results)