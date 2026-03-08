from LoginRadius import LoginRadius

LoginRadius.API_KEY = "1234567890"
LoginRadius.API_SECRET = "1234567890"

lr = LoginRadius()

def login(email: str, password: str) -> dict:
    """ 
    Log in a user with email and password.
    Returns the response dict containing the access token and Profile on success.
    """
    response = lr.authentication.login_by_email(
        email = email, 
        password = password,
        login_url = "https://api.loginradius.com/identity/v2/auth/login",
        email_template = "welcome",
        g_recaptcha_response = None
    )

    if "ErrorCode" in response:
        raise Exception(f"Login failed: [{response['ErrorCode']}] {response['Description']}")

    return response

def register(email: str, password: str, first_name: str, last_name: str) -> dict:
    """ 
    Register a new user with email and password.
    Returns the response dict containing the access token and Profile on success.
    """
    payload = {
        "Email": [{"Type": "Primary", "Value": email}],
        "Password" : password,
        "FirstName" : first_name,
        "LastName" : last_name,
    }

    response = lr.authentication.register(
        payload = payload,
        verification_url = "https://api.loginradius.com/identity/v2/auth/verify",
        email_template = None
    )

    if "ErrorCode" in response:
        raise Exception(f"Login failed: [{response['ErrorCode']}] {response['Description']}")

    return response

def get_profile(access_token: str) -> dict:
    """
    Get the profile of a user with the access token.
    Returns the response dict containing the profile on success.
    """
    response = lr.authentication.get_profile_by_access_token(
        access_token = access_token
    )

    if "ErrorCode" in response:
        raise Exception(f"Get profile failed: [{response['ErrorCode']}] {response['Description']}")

    return response

def forgot_password(email: str, reset_url: str = "https://yourapp.com/reset") -> dict:
    """
    Send a password reset email to user.
    """

    response = lr.authentication.forgot_password(
        email = email,
        reset_password_url = reset_url,
        email_template = None
    )

    if "ErrorCode" in response:
        raise Exception(f"Forgot password failed: {response['Description']}")

    return response