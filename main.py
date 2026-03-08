from auth import login, register, get_profile, forgot_password, logout

try:
    reg = register(
        email="jane@example.com",
        password="SecurePass123!",
        first_name="Jane",
        last_name="Doe"
    )
    print("Registered:", reg)
except Exception as e:
    print("Registration error:", e)


try:
    session = login(email="jane@example.com", password="SecurePass123!")
    token = session["access_token"]
    print("Logged in! Token:", token[:16] + "…")
except Exception as e:
    print("Login error:", e)
    token = None

if token:
    profile = get_profile(token)
    print(f"Hello, {profile.get('FirstName')} {profile.get('LastName')}!")
    print("Email:", profile["Email"][0]["Value"])

if token:
    logout(token)
    print("Logged out.")