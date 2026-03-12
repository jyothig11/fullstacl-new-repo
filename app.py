from flask import Flask, jsonify, request
from flask_cors import CORS
import pymysql

app = Flask(__name__)
CORS(app)

conn = pymysql.connect(
    host='joe-contact-db.ci1qiseo62x9.us-east-1.rds.amazonaws.com',
    user='joeadmin',
    password='jyothi1125',
    database='jyothi'
)

@app.route('/users', methods=['GET'])
def get_users():
    cur = conn.cursor(pymysql.cursors.DictCursor)
    cur.execute("SELECT * FROM users")
    users = cur.fetchall()
    return jsonify(users)

@app.route('/users', methods=['POST'])
def add_user():
    data = request.get_json()
    name = data['name']
    email = data['email']

    cur = conn.cursor()
    cur.execute("INSERT INTO users (name,email) VALUES (%s,%s)", (name,email))
    conn.commit()

    return jsonify({"message":"User added successfully"})


if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)
