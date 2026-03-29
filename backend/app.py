from flask import Flask, request, jsonify
from flask_cors import CORS
from models import translate_engine

app = Flask(__name__)
CORS(app)

@app.route("/languages", methods=["GET"])
def languages():
    return jsonify({"languages": list(translate_engine.LANG_CODES.keys())})

@app.route("/translate", methods=["POST"])
def translate():
    try:
        data = request.get_json(force=True)
        text = data.get("text", "").strip()
        target_lang = data.get("target_lang", "English")

        if not text:
            return jsonify({"error": "No text provided"}), 400

        translated, err = translate_engine.translate_text(text, target_lang)
        if err:
            return jsonify({"error": err}), 500

        return jsonify({"translated_text": translated})
    
    except Exception as e:
        return jsonify({"error": "Translation service unavailable"}), 500

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000, debug=True)