# 📚 StudyAI - AI-Powered Study Companion

An intelligent study companion that helps you learn smarter with AI-powered document analysis, summaries, flashcards, MCQs, and podcasts.

![StudyAI](https://img.shields.io/badge/AI-Powered-00FFFF?style=for-the-badge)
![React](https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?style=for-the-badge&logo=typescript)
![Python](https://img.shields.io/badge/Python-3.11+-3776AB?style=for-the-badge&logo=python)
![FastAPI](https://img.shields.io/badge/FastAPI-009688?style=for-the-badge&logo=fastapi)

## ✨ Features

- **📄 Document Upload** - Upload PDFs, DOCX, and images for AI analysis
- **💬 Q&A Chat** - Ask questions about your documents and get instant AI-powered answers
- **📝 Smart Summaries** - Generate concise or detailed summaries of your documents
- **🎴 Flashcards** - Auto-generate flashcards for effective studying
- **❓ MCQ Quizzes** - Test your knowledge with AI-generated multiple choice questions
- **🎙️ Podcast Generation** - Convert documents into audio podcasts for learning on-the-go

## 🖼️ Screenshots

| Document Upload | Q&A Chat | Flashcards |
|-----------------|----------|------------|
| Upload PDFs, DOCX, images | Ask anything about your docs | Study with AI-generated cards |

## 🚀 Getting Started

### Prerequisites

- **Node.js 18+** and npm
- **Python 3.11+**
- **Gemini API Key** - [Get one here](https://aistudio.google.com/app/apikey)
- **ElevenLabs API Key** (optional, for podcast feature) - [Get one here](https://elevenlabs.io/api)

### Frontend Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Create a `.env` file** in the project root:
   ```env
   VITE_GEMINI_API_KEY=your_gemini_api_key_here
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. Open http://localhost:5173 in your browser

### Backend Setup

1. **Navigate to backend and create virtual environment:**
   ```bash
   cd backend
   python -m venv venv
   ```

2. **Activate the virtual environment:**
   ```bash
   # Windows PowerShell
   .\venv\Scripts\Activate.ps1
   
   # Linux/Mac
   source venv/bin/activate
   ```

3. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

4. **Create a `.env` file** in `backend/services/`:
   ```env
   GEMINI_API_KEY=your_gemini_api_key_here
   ELEVENLABS_API_KEY=your_elevenlabs_api_key_here
   ```

5. **Start the backend server:**
   ```bash
   python main.py
   ```

6. The API will be available at http://localhost:8000

## 👥 Team Collaboration & Repository Visibility

### Making the Repository Visible to Team Members

#### Option 1: Public Repository (Recommended for Open Source)
If your repository is already public, it's automatically visible to everyone on GitHub. Team members can:
1. Visit the repository URL: `https://github.com/MR-WHOAMEYE/study_companion-ai`
2. Click **Fork** to create their own copy
3. Clone their fork to work on it locally

#### Option 2: Private Repository with Collaborators
If you want to keep the repository private but share it with specific team members:

1. **Add Collaborators:**
   - Go to your repository on GitHub
   - Click **Settings** → **Collaborators and teams**
   - Click **Add people**
   - Enter your team member's GitHub username
   - Select their permission level:
     - **Read**: View and clone only
     - **Write**: Push changes directly
     - **Admin**: Full access including settings

2. **Team members will receive an invitation email** and must accept it to access the repository

### For Team Members: Getting Started

#### 1. **Clone the Repository**
```bash
# Clone the main repository
git clone https://github.com/MR-WHOAMEYE/study_companion-ai.git
cd study_companion-ai
```

#### 2. **Or Fork and Clone (Recommended)**
```bash
# Fork the repository on GitHub first, then:
git clone https://github.com/YOUR_USERNAME/study_companion-ai.git
cd study_companion-ai

# Add upstream remote to sync with main repo
git remote add upstream https://github.com/MR-WHOAMEYE/study_companion-ai.git
```

#### 3. **Create a Branch for Your Work**
```bash
# Create and switch to a new branch
git checkout -b feature/your-feature-name
```

#### 4. **Make Changes and Commit**
```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "Add: description of your changes"
```

#### 5. **Push Changes**
```bash
# Push to your branch (works for both fork and direct collaboration workflows)
# For fork workflow: "origin" is your fork
# For direct collaboration: "origin" is the main repository
git push origin feature/your-feature-name
```

#### 6. **Create a Pull Request**
- Go to the repository on GitHub
- Click **Pull Requests** → **New Pull Request**
- Select your branch and create the PR
- Add a description of your changes
- Request review from team members

### Syncing with Main Repository
```bash
# Fetch latest changes from main repository
git fetch upstream

# Switch to your main branch
git checkout main

# Merge changes from upstream
git merge upstream/main

# Push updated main to your fork
git push origin main
```

### Best Practices for Team Collaboration
- 🔄 **Always pull latest changes** before starting new work
- 🌿 **Use feature branches** for all changes
- 💬 **Write clear commit messages** describing what and why
- 🔍 **Request code reviews** before merging
- ✅ **Test your changes** locally before pushing
- 📝 **Update documentation** when adding new features
- 🐛 **Create issues** for bugs and feature requests

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|------------|---------|
| **React 18** | UI Framework |
| **TypeScript** | Type Safety |
| **Vite** | Build Tool & Dev Server |
| **Tailwind CSS** | Styling |
| **Framer Motion** | Animations |
| **Zustand** | State Management |
| **Nutrient Viewer** | PDF Rendering |

### Backend
| Technology | Purpose |
|------------|---------|
| **FastAPI** | REST API Framework |
| **Google Gemini 2.0** | AI/LLM for Q&A, Summaries, Flashcards, MCQs |
| **ElevenLabs** | Text-to-Speech for Podcasts |
| **Podcastfy** | Podcast Generation Pipeline |

## 📁 Project Structure

```
study-companion-pro/
├── src/                      # Frontend source code
│   ├── components/           # React components
│   │   ├── layout/          # Layout components (Sidebar, DocumentViewer)
│   │   ├── panels/          # Feature panels (QA, Summary, Flashcards, MCQ, Podcast)
│   │   ├── ui/              # Reusable UI components
│   │   └── upload/          # Upload modal
│   ├── lib/                 # Utilities & API clients
│   │   ├── api.ts          # Backend API client
│   │   └── gemini.ts       # Gemini AI client
│   └── store/              # Zustand state management
├── backend/                 # Python backend
│   ├── services/           # AI & document services
│   │   ├── gemini.py      # Gemini AI integration
│   │   ├── podcast.py     # Podcast generation
│   │   └── document.py    # Document processing
│   ├── data/              # Stored documents & transcripts
│   ├── podcasts/          # Generated podcast audio files
│   └── main.py            # FastAPI application
└── public/                # Static assets
```

## 🎨 Theme

The app uses an **Electric Blue Dark Theme**:

| Color | Hex | Usage |
|-------|-----|-------|
| Electric Blue | `#00FFFF` | Primary accent, buttons, highlights |
| Dark Background | `#121212` | Main background |
| Dark Panel | `#1E1E1E` | Cards, panels, modals |
| Dark Border | `#333333` | Borders, dividers |
| Light Text | `#E0E0E0` | Primary text |
| Secondary Text | `#A0A0A0` | Muted/secondary text |

## 🔧 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/ask` | Ask a question about a document |
| `POST` | `/summary` | Generate document summary |
| `POST` | `/flashcards` | Generate flashcards |
| `POST` | `/mcqs` | Generate MCQ questions |
| `POST` | `/podcast` | Generate audio podcast |
| `POST` | `/upload` | Upload a document |
| `GET` | `/podcasts/{filename}` | Download podcast audio |

## 👥 TEAM MEMBERS
<table>
  <tr>
    <td align="center">
      <a href="https://github.com/Thanveer265">
        <img src="https://github.com/Thanveer265.png" width="100px;" alt="Thanveer265"/>
        <br /><sub><b>Thanveer265</b></sub>
      </a>
      <br />Frontend Development
    </td>
    <td align="center">
      <a href="https://github.com/MR-WHOAMEYE">
        <img src="https://github.com/MR-WHOAMEYE.png" width="100px;" alt="MR-WHOAMEYE"/>
        <br /><sub><b>MR-WHOAMEYE</b></sub>
      </a>
      <br />Backend & AI Integration
    </td>
    <td align="center">
      <a href="https://github.com/mohan-kumar-12">
        <img src="https://github.com/mohan-kumar-12.png" width="100px;" alt="mohan-kumar-12"/>
        <br /><sub><b>mohan-kumar-12</b></sub>
      </a>
      <br />Project Integration
    </td>
  </tr>
</table>

## 📄 License

This project is for educational purposes. Feel free to use and learn from it!

---

<p align="center">Made with ❤️</p>
