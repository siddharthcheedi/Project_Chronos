from flask import Flask, request, jsonify
from flask_cors import CORS
from chronos_utils import reconstruct_text, search_web

# Initialize Flask app
app = Flask(__name__)
CORS(app)  # Allow frontend to connect

@app.route('/')
def home():
    return jsonify({
        "message": "Welcome to Project Chronos API! Use POST /api/reconstruct to send text fragments."
    })

@app.route('/api/reconstruct', methods=['POST'])
def reconstruct():
    """
    Endpoint that takes a text fragment and returns the reconstructed version + context links.
    """
    try:
        data = request.get_json(silent=True, force=True)
        fragment = data.get("fragment", "").strip()

        if not fragment:
            return jsonify({"error": "No text fragment provided."}), 400

        print(f"[INPUT] {fragment}")


        reconstructed = reconstruct_text(fragment)
        print(f"[RECONSTRUCTED] {reconstructed}")


        links = search_web(reconstructed)
        print(f"[LINKS] {links}")


        return jsonify({
            "original": fragment,
            "reconstructed": reconstructed,
            "links": links
        })

    except Exception as e:
        print(f"[ERROR: Flask route] {e}")
        return jsonify({"error": str(e)}), 500


if __name__ == "__main__":
    app.run(debug=True)
