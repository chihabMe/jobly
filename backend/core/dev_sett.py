from datetime import timedelta

# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True
ALLOWED_HOSTS = ["127.0.0.1", "192.168.1.4"]
SECRET_KEY = "django-insecure-e5bt%3$e**4%tl4zfs&hjcadmvhm3-t-ly+jy4f+a7z&g_$u##"

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": "test.db",  # This is where you put the name of the db file.
        # If one doesn't exist, it will be created at migration time.
    }
}
SIMPLE_JWT = {
    "ACCESS_TOKEN_LIFETIME": timedelta(seconds=20),
    "REFRESH_TOKEN_LIFETIME": timedelta(days=45),
    "ROTATE_REFRESH_TOKENS": True,
    "BLACKLIST_AFTER_ROTATION": True,
    "UPDATE_LAST_LOGIN": False,
    "ALGORITHM": "HS256",
    "SIGNING_KEY": SECRET_KEY,
    "VERIFYING_KEY": None,
    "AUDIENCE": None,
    "ISSUER": None,
    "JWK_URL": None,
    "LEEWAY": 0,
    "AUTH_HEADER_TYPES": ("Bearer", "JWT"),
    "AUTH_HEADER_NAME": "HTTP_AUTHORIZATION",
    "USER_ID_FIELD": "id",
    "USER_ID_CLAIM": "user_id",
    "USER_AUTHENTICATION_RULE": "rest_framework_simplejwt.authentication.default_user_authentication_rule",
    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
    "TOKEN_TYPE_CLAIM": "token_type",
    "TOKEN_USER_CLASS": "rest_framework_simplejwt.models.TokenUser",
    "JTI_CLAIM": "jti",
    "SLIDING_TOKEN_REFRESH_EXP_CLAIM": "refresh_exp",
    "SLIDING_TOKEN_LIFETIME": timedelta(minutes=5),
    "SLIDING_TOKEN_REFRESH_LIFETIME": timedelta(days=1),
}

CORS_ALLOWED_ORIGINS = [
    "http://127.0.0.1:3000",
    "http://localhost:3000",
    "http://192.168.1.4:3000",
]
print("dev mode")
