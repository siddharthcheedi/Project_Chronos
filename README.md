# Project Chronos: The AI Archeologist

Project Chronos is an AI-powered text reconstruction web application that acts as a digital archeologist, capable of decoding and reconstructing fragmented or slang-filled text commonly found in early internet communication.

The system uses Google’s Gemini API to intelligently reconstruct shorthand or incomplete fragments into coherent sentences, and then performs a contextual web search using the Google Custom Search API to provide relevant background links.

---


## Team

  - B.Hari Sampath (SE24UCSE250)
  - Siddharth Cheedi (SE24UCSE199)
  - Thanishka Reddygari (SE24UCSE259)
  - Geshna Akula (SE24UCSE256)

<!-- end list -->

---

## Features

-   **AI Reconstruction:** Converts incomplete or slang-filled phrases into natural, meaningful text.
-   **Contextual Sources:** Displays relevant articles or web pages that give context to the reconstructed text.
-   **Voice Playback:** Reads out the reconstructed text using text-to-speech.
-   **Report Download:** Allows users to save reconstruction reports.
-   **Modern Web UI:** Built with React, TypeScript, and Tailwind CSS for a sleek and responsive experience.

---

## Tech Stack

| Layer | Technology |
| :--- | :--- |
| **Frontend** | React + Vite + TypeScript + Tailwind CSS |
| **Backend** | Flask (Python) |
| **AI Model** | Google Gemini API |
| **Search API** | Google Custom Search JSON API |
| **Environment** | Python `venv`, Node.js |

---

## Getting Started

Follow these steps to set up the project environment on a new machine.

### Prerequisites

-   [Git](https://git-scm.com/)
-   [Python 3.10+](https://www.python.org/downloads/)
-   [Node.js (v18 or later)](https://nodejs.org/en)

### 1. Clone the Repository

```bash
git clone [https://github.com/siddharthcheedi/Project_Chronos.git](https://github.com/siddharthcheedi/Project_Chronos.git)
cd Project_Chronos
````

### 2\. Backend Setup (Flask API)

a. Navigate to the backend folder and create a virtual environment:

```bash
cd backend
python3 -m venv env
```

b. Activate the virtual environment:

```bash
# On macOS/Linux
source env/bin/activate

# On Windows (Command Prompt)
env\Scripts\activate
```

c. Install dependencies:

```bash
pip install -r requirements.txt
```

### 3\. API Key Configuration

The backend requires three API keys to function. You will need to create a `.env` file in the `backend/` directory.

```bash
# In the /backend folder, create a file named .env
# Add the following content:

GEMINI_API_KEY=your_gemini_api_key_here
GOOGLE_SEARCH_API_KEY=your_google_custom_search_api_key_here
GOOGLE_CX_ID=your_custom_search_engine_id
```

\<details\>
\<summary\>\<strong\>Click here for instructions on how to get these keys.\</strong\>\</summary\>

#### 1️ Create / Select a Google Cloud Project

1.  Go to the [Google Cloud Console](https://console.cloud.google.com/) and sign in.
2.  Click the project dropdown in the top-left corner → **New Project**.
3.  Give it a name (e.g., `project-chronos`) and click **Create**.
4.  After creation, make sure the new project is selected.

#### 2️ Enable Required APIs

1.  Go to the [Google Cloud API Library](https://console.cloud.google.com/apis/library).
2.  **Enable the Generative Language API (Gemini):**
      - Search for `Generative Language API`.
      - Click it → click **Enable**.
3.  **Enable the Custom Search JSON API:**
      - In the same API Library, search for `Custom Search API` or `customsearch`.
      - Click **Custom Search JSON API** → click **Enable**.

#### 3️ Create API Keys

You will create two separate API keys.

1.  Go to **APIs & Services → Credentials**.
2.  Click **+ CREATE CREDENTIALS → API key**.
3.  Copy the key. This will be your `GEMINI_API_KEY`.
4.  Repeat step 2 to create a second key. This will be your `Google Search_API_KEY`.
5.  **(Recommended) Restrict Your Keys:**
      - Click **Edit API key** for your Gemini key.
      - Under *API restrictions*, choose **Restrict key**.
      - Select **Generative Language API** and click **Save**.
      - Repeat this for your Search key, selecting **Custom Search API**.

#### 4️ Create a Custom Search Engine (CX ID)

1.  Go to [Programmable Search Engine](https://programmablesearchengine.google.com/).
2.  Click **Add** (or **New search engine**).
3.  In *Sites to search*, select or enable **Search the entire web**.
4.  Click **Create**.
5.  Open the new search engine’s **Control Panel → Basics** tab.
6.  Copy the **Search engine ID** — this is your `GOOGLE_CX_ID`.

**Important:** If your CSE only searches specific websites, the API will return empty results. Ensure your engine is set to **Search the entire web** for full functionality.

\</details\>

### 4\. Frontend Setup (React + Vite)

a. In a new terminal, navigate to the frontend folder:

```bash
# Make sure you are in the root 'Project_Chronos' directory first
cd frontend
```

b. Install dependencies:

```bash
npm install
```

-----

## Usage Guide

You will need **two separate terminals** open to run the project.

### 1\. Run the Backend

*In your first terminal (from the `backend` folder):*

```bash
cd backend
source env/bin/activate  # or env\Scripts\activate
python3 app.py
```

The backend will start, typically on `http://127.0.0.1:5000/`.

### 2\. Run the Frontend

*In your second terminal (from the `frontend` folder):*

```bash
cd frontend
npm run dev
```

Vite will show a local URL, such as `http://localhost:5173/`. Open this URL in your browser to use the application.

### 3\. Using the Application

1.  Enter a text fragment (e.g., `smh at the top 8 drama`).
2.  Click **Reconstruct Text**.
3.  The AI will return a complete version with contextual web sources.
4.  Use the buttons to:
      - Play the reconstructed text (Text-to-Speech)
      - Download a report
      - View recent reconstructions

-----



