from LoginRadius import LoginRadius as LR
from secret import API_KEY, API_SECRET

# ─── Configuration ────────────────────────────────────────────────────────────
LR.API_KEY    = API_KEY
LR.API_SECRET = API_SECRET

loginradius = LR()
# ──────────────────────────────────────────────────────────────────────────────


def login(email: str, password: str) -> dict:
    """Log in with email and password."""
    email_authentication_model = {
        "email": email,
        "password": password
    }

    result = loginradius.authentication.login_by_email(
        email_authentication_model,
        email_template=None,
        fields=None,
        login_url=None,
        verification_url=None
    )

    if result.get("ErrorCode") is not None:
        raise Exception(f"Login failed [{result['ErrorCode']}]: {result['Description']}")

    return result


def register(email: str, password: str, first_name: str, last_name: str) -> dict:
    """Register a new user by email."""

    sott_result = loginradius.sott.generate_sott(10)

    if isinstance(sott_result, dict) and sott_result.get("ErrorCode"):
        raise Exception(f"SOTT generation failed: {sott_result['Description']}")

    sott = sott_result.get("Sott") if isinstance(sott_result, dict) else sott_result

    auth_user_registration_model = {
        "email": [{"type": "Primary", "value": email}],
        "firstName": first_name,
        "lastName": last_name,
        "password": password
    }

    result = loginradius.authentication.user_registration_by_email(
        auth_user_registration_model,
        sott,
        email_template=None,
        fields=None,
        options=None,
        verification_url="https://kumquat.hub.loginradius.com/auth.aspx",
        welcome_email_template=None
    )

    if result.get("ErrorCode") is not None:
        raise Exception(f"Registration failed [{result['ErrorCode']}]: {result['Description']}")

    return result


def get_profile(access_token: str) -> dict:
    """Fetch user profile by access token."""
    result = loginradius.authentication.get_profile_by_access_token(
        access_token,
        fields=None
    )

    if result.get("ErrorCode") is not None:
        raise Exception(f"Could not fetch profile: {result['Description']}")

    return result


def logout(access_token: str) -> dict:
    """Invalidate an access token."""
    result = loginradius.authentication.auth_in_validate_access_token(access_token)
    return result


def forgot_password(email: str, reset_url: str = "http://localhost:3000/reset") -> dict:
    """Send a password reset email."""
    result = loginradius.authentication.forgot_password(
        email,
        reset_url,
        email_template=None
    )

    if result.get("ErrorCode") is not None:
        raise Exception(f"Forgot password failed: {result['Description']}")

    return result