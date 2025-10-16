import os
import requests
import google.generativeai as genai
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv()

# Configure Gemini API
genai.configure(api_key=os.getenv("GEMINI_API_KEY"))

def reconstruct_text(fragment: str) -> str:
    
    prompt = f"""
    You are an AI historian called Project Chronos.
    Your job is to reconstruct incomplete or slang-filled digital text fragments
    from the early 2000s. Make the text clear, readable, and historically accurate,
    but keep its informal tone if appropriate.

    Fragment: "{fragment}"

    Return only the completed and natural version of the text.
    """
    try:
        model = genai.GenerativeModel("gemini-2.5-pro")
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print(f"[ERROR: Gemini Reconstruction] {e}")
        return "Error: Could not generate reconstruction."

def search_web(query: str, num_results: int = 3) -> list:
    """
    Uses Google Custom Search API to fetch contextual links about the reconstructed text.
    """
    api_key = os.getenv("GOOGLE_SEARCH_KEY")
    cx_id = os.getenv("GOOGLE_CX_ID")

    if not api_key or not cx_id:
        print("[ERROR] Missing GOOGLE_SEARCH_KEY or GOOGLE_CX_ID in .env")
        return []

    search_url = "https://www.googleapis.com/customsearch/v1"
    params = {
        "key": api_key,
        "cx": cx_id,
        "q": query
    }

    try:
        response = requests.get(search_url, params=params)
        data = response.json()
        items = data.get("items", [])
        links = [item["link"] for item in items[:num_results]]
        return links
    except Exception as e:
        print(f"[ERROR: Google Search] {e}")
        return []
