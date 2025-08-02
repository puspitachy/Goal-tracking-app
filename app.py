from flask import Flask, request, jsonify
from flask_cors import CORS
import os
import traceback
from openai import OpenAI

# ✅ Load OpenAI API key
try:
    with open("APIkey.txt", "r") as f:
        api_key = f.read().strip()
except Exception as e:
    print("❌ Failed to load API key:", e)
    api_key = os.getenv("OPENAI_API_KEY")

client = OpenAI(api_key=api_key)

app = Flask(__name__)
CORS(app, supports_credentials=True)

@app.route("/", methods=["GET"])
def home():
    return "✅ Flask server with OpenAI (new SDK) is running."

# ✅ 1. Generate Steps Using OpenAI
@app.route("/generate-steps", methods=["POST", "OPTIONS"])
def generate_steps():
    if request.method == "OPTIONS":
        return '', 204

    try:
        data = request.get_json()
        goal = data.get("goal", "").strip()
        if not goal:
            return jsonify({"error": "Goal is required"}), 400

        prompt = (
            f"Break down the following goal into 5–7 clear, specific, and actionable learning steps. "
            f"Each step should be outcome-based and easy to follow.\n\n"
            f"Goal: {goal}\n\n"
            f"Steps:"
        )

        response = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[
                {"role": "system", "content": "You are a helpful assistant that breaks down goals into simple, actionable steps."},
                {"role": "user", "content": prompt}
            ],
            temperature=0.5
        )

        content = response.choices[0].message.content.strip()
        steps = [step.strip() for step in content.split("\n") if step.strip()]

        return jsonify({"steps": steps})

    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

# ✅ 2. Recommend Resources Using OpenAI
@app.route("/recommend-resources", methods=["POST", "OPTIONS"])
def recommend_resources():
    if request.method == "OPTIONS":
        return '', 204

    try:
        data = request.get_json()
        steps = data.get("steps", [])

        recommendations = []
        for step in steps:
            prompt = f"Recommend a free online resource (URL only) to help with this step: '{step}'"
            res = client.chat.completions.create(
                model="gpt-3.5-turbo",
                messages=[{"role": "user", "content": prompt}],
                temperature=0.7
            )
            url = res.choices[0].message.content.strip().split("\n")[0]
            recommendations.append(url)

        return jsonify(recommendations)
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

# ✅ 3. Validate Proof Using OpenAI
@app.route("/validate-proof", methods=["POST", "OPTIONS"])
def validate_proof():
    if request.method == "OPTIONS":
        return '', 204

    try:
        if 'file' in request.files:
            file = request.files['file']
            step = request.form.get("step", "No step provided")
            name = request.form.get("name", "Anonymous")
            return jsonify({"feedback": f"✅ {name}, your file for '{step}' looks valid."})

        data = request.get_json()
        text = data.get("text", "")
        step = data.get("step", "")

        if not text or not step:
            return jsonify({"feedback": "❌ Missing text or step."})

        prompt = (
            f"Evaluate if the following text proves that someone has completed the task: '{step}'. "
            f"Respond with a short validation statement.\n\nProof: {text}"
        )

        res = client.chat.completions.create(
            model="gpt-3.5-turbo",
            messages=[{"role": "user", "content": prompt}],
            temperature=0.7
        )

        feedback = res.choices[0].message.content.strip()
        return jsonify({"feedback": feedback})
    except Exception as e:
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True, port=5000)
