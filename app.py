from flask import Flask, render_template, request, jsonify
from utils.converter import convert_temperature

app = Flask(__name__)


@app.route("/")
def home():
    return render_template("index.html")


@app.route("/convert", methods=["POST"])
def convert():

    data = request.get_json()

    value = float(data["value"])
    from_unit = data["from"]
    to_unit = data["to"]

    result = convert_temperature(value, from_unit, to_unit)

    return jsonify({
        "result": round(result, 2)
    })


if __name__ == "__main__":
    app.run(debug=True)