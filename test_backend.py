import os
from dotenv import load_dotenv
load_dotenv()

print(os.getenv("ANTHROPIC_API_KEY"))

import requests
try:
    r = requests.post("http://localhost:8000/api/process")
    print(r.json())
except Exception as e:
    print(e)
