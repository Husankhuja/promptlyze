from flask import Flask, jsonify

app = Flask(__name__)


@app.route("/api/python", methods=["GET"])
def hello_world():
    data = {"message": "Hello, World!"}
    return jsonify({"greeting": "Hello", "target": "World"})

if __name__ == "__main__":
    app.run(port=5328)
