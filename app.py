# Flask server: server.py

from flask import Flask, request, jsonify
from flask_cors import CORS
import requests
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv('secret.env')

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')
if not OPENAI_API_KEY:
    raise ValueError("No OpenAI API Key set in environment variables")

HEADERS = {
    'Content-Type': 'application/json',
    'Authorization': f'Bearer {OPENAI_API_KEY}'
}

@app.route('/get-openai-response', methods=['POST'])
def get_openai_response():
    user_prompt = request.json.get('prompt')
    if not user_prompt:
        return jsonify(error="No prompt provided"), 400

    data = {
        'prompt': user_prompt,
        'max_tokens': 100,  # Adjust as needed
        'temperature': 0.7  # Tuning parameter
    }

    response = requests.post('https://api.openai.com/v1/engines/davinci/completions', headers=HEADERS, json=data)

    if response.status_code == 200:
        return jsonify(ai_response=response.json()['choices'][0]['text'])
    else:
        return jsonify(error=response.text), response.status_code

if __name__ == '__main__':
    app.run(port=3000, debug=True)
