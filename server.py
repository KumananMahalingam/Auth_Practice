from flask import Flask, request, jsonify
from flask_cors import CORS
from auth import login, register, get_profile, logout, forgot_password

app = Flask(__name__)
CORS(app, origins=["http://localhost:3000"])

@app.post("/auth/login")
def api_login():
    body = request.get_json()
    try:
        result = login(body["email"], body["password"])
        return jsonify({"access_token": result["access_token"], "profile": result.get("Profile")})
    except Exception as e:
        return jsonify({"detail": str(e)}), 401

@app.post("/auth/register")
def api_register():
    body = request.get_json()
    try:
        result = register(body["email"], body["password"], body["first_name"], body["last_name"])
        return jsonify({"message": "Registration successful. Please verify your email.", "data": result})
    except Exception as e:
        return jsonify({"detail": str(e)}), 400

@app.get("/auth/profile")
def api_profile():
    token = request.args.get("access_token")
    try:
        return jsonify(get_profile(token))
    except Exception as e:
        return jsonify({"detail": str(e)}), 401

@app.post("/auth/logout")
def api_logout():
    body = request.get_json()
    try:
        logout(body["access_token"])
        return jsonify({"message": "Logged out successfully."})
    except Exception as e:
        return jsonify({"detail": str(e)}), 400

@app.post("/auth/forgot-password")
def api_forgot_password():
    body = request.get_json()
    try:
        forgot_password(body["email"])
        return jsonify({"message": "Password reset email sent."})
    except Exception as e:
        return jsonify({"detail": str(e)}), 400


if __name__ == "__main__":
    app.run(debug=True, port=8000)