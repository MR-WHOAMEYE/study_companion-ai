# Fix Windows console encoding for Unicode support (Tamil, etc.)
import sys
import os
if sys.platform == 'win32':
    # Set Windows console to UTF-8 mode
    os.system('chcp 65001 > nul 2>&1')
    # Set environment variable for Python I/O
    os.environ['PYTHONIOENCODING'] = 'utf-8'
    # Force UTF-8 for stdio
    import io
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')

from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from typing import Optional
from pathlib import Path
import uvicorn

from models.schemas import (
    QuestionRequest, SummaryRequest, FlashcardRequest, MCQRequest,
    AIResponse, FlashcardsResponse, MCQsResponse, ExtractedText,
    ExtractBase64Request, PodcastRequest, PodcastResponse
)
from services.document import extract_text_from_file, decode_base64_file
from services.gemini import ask_question, generate_summary, generate_flashcards, generate_mcqs
from services.podcast import generate_podcast_from_text, get_podcast_path, PODCAST_OUTPUT_DIR

# Create FastAPI app
app = FastAPI(
    title="Study Companion API",
    description="AI-powered document analysis and study tools",
    version="1.0.0"
)

# Configure CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:8080", "http://localhost:5173", "http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# In-memory storage for extracted document text
document_cache = {}


@app.get("/")
async def root():
    """Health check endpoint."""
    return {"status": "ok", "message": "Study Companion API is running"}


@app.post("/upload", response_model=ExtractedText)
async def upload_document(file: UploadFile = File(...)):
    """
    Upload a document and extract its text content.
    Supports PDF, DOCX, and PPTX files.
    """
    try:
        # Read file bytes
        file_bytes = await file.read()
        
        # Extract text based on file type
        text, pages = extract_text_from_file(file_bytes, file.filename)
        
        # Store in cache with filename as key
        document_id = file.filename
        document_cache[document_id] = {
            "text": text,
            "pages": pages,
            "filename": file.filename
        }
        
        return ExtractedText(
            success=True,
            text=text,
            pages=pages
        )
    except Exception as e:
        return ExtractedText(
            success=False,
            error=str(e)
        )


@app.post("/extract-base64", response_model=ExtractedText)
async def extract_from_base64(request: ExtractBase64Request):
    """
    Extract text from a base64-encoded document.
    Used when files are uploaded via the frontend.
    """
    try:
        # Decode base64 to bytes
        file_bytes = decode_base64_file(request.base64_data)
        
        # Extract text
        text, pages = extract_text_from_file(file_bytes, request.filename)
        
        # Store in cache
        document_cache[request.document_id] = {
            "text": text,
            "pages": pages,
            "filename": request.filename
        }
        
        return ExtractedText(
            success=True,
            text=text,
            pages=pages
        )
    except Exception as e:
        return ExtractedText(
            success=False,
            error=str(e)
        )


@app.post("/ask", response_model=AIResponse)
async def ask(request: QuestionRequest):
    """Ask a question about the document."""
    try:
        # Get document text from cache or request
        document_text = request.document_text
        if not document_text and request.document_id in document_cache:
            document_text = document_cache[request.document_id]["text"]
        
        if not document_text:
            return AIResponse(
                success=False,
                error="No document text available. Please upload a document first."
            )
        
        response = await ask_question(
            request.question,
            document_text,
            request.document_id
        )
        
        return AIResponse(success=True, data=response)
    except Exception as e:
        return AIResponse(success=False, error=str(e))


@app.post("/summary", response_model=AIResponse)
async def summarize(request: SummaryRequest):
    """Generate a summary of the document."""
    try:
        response = await generate_summary(
            request.document_text,
            request.document_id,
            request.summary_type
        )
        
        return AIResponse(success=True, data=response)
    except Exception as e:
        return AIResponse(success=False, error=str(e))


@app.post("/flashcards", response_model=FlashcardsResponse)
async def create_flashcards(request: FlashcardRequest):
    """Generate flashcards from the document."""
    try:
        flashcards = await generate_flashcards(
            request.document_text,
            request.document_id,
            request.count
        )
        
        return FlashcardsResponse(success=True, flashcards=flashcards)
    except Exception as e:
        return FlashcardsResponse(success=False, error=str(e))


@app.post("/mcqs", response_model=MCQsResponse)
async def create_mcqs(request: MCQRequest):
    """Generate MCQ questions from the document."""
    try:
        mcqs = await generate_mcqs(
            request.document_text,
            request.document_id,
            request.count
        )
        
        return MCQsResponse(success=True, mcqs=mcqs)
    except Exception as e:
        return MCQsResponse(success=False, error=str(e))


@app.post("/podcast", response_model=PodcastResponse)
async def create_podcast(request: PodcastRequest):
    """Generate a podcast from document content using podcastfy with ElevenLabs TTS."""
    try:
        result = await generate_podcast_from_text(
            request.document_text,
            request.document_id,
            request.language
        )
        
        if result["success"]:
            return PodcastResponse(
                success=True,
                audio_url=f"/podcasts/{result['audio_file']}",
                filename=result["audio_file"],
                message=result["message"]
            )
        else:
            return PodcastResponse(success=False, error=result["error"])
    except Exception as e:
        return PodcastResponse(success=False, error=str(e))


@app.get("/podcasts/{filename}")
async def get_podcast(filename: str):
    """Serve a generated podcast audio file."""
    file_path = get_podcast_path(filename)
    if not file_path.exists():
        raise HTTPException(status_code=404, detail="Podcast not found")
    return FileResponse(file_path, media_type="audio/mpeg", filename=filename)


# Mount podcasts directory for static file serving
PODCAST_OUTPUT_DIR.mkdir(exist_ok=True)


if __name__ == "__main__":
    print("Starting Study Companion API server...")
    print("API docs available at: http://localhost:8000/docs")
    uvicorn.run(app, host="0.0.0.0", port=8000)


