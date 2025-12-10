from pydantic import BaseModel
from typing import List, Optional

class DocumentRequest(BaseModel):
    document_id: str
    document_name: str
    document_content: str  # Base64 encoded file or extracted text

class QuestionRequest(BaseModel):
    document_id: str
    question: str
    document_text: Optional[str] = None

class SummaryRequest(BaseModel):
    document_id: str
    summary_type: str  # 'short', 'detailed', 'bullet'
    document_text: str

class FlashcardRequest(BaseModel):
    document_id: str
    count: int = 8
    document_text: str

class MCQRequest(BaseModel):
    document_id: str
    count: int = 5
    document_text: str

class Flashcard(BaseModel):
    question: str
    answer: str

class MCQ(BaseModel):
    question: str
    options: List[str]
    correctIndex: int

class AIResponse(BaseModel):
    success: bool
    data: Optional[str] = None
    error: Optional[str] = None

class FlashcardsResponse(BaseModel):
    success: bool
    flashcards: Optional[List[Flashcard]] = None
    error: Optional[str] = None

class MCQsResponse(BaseModel):
    success: bool
    mcqs: Optional[List[MCQ]] = None
    error: Optional[str] = None

class ExtractedText(BaseModel):
    success: bool
    text: Optional[str] = None
    pages: Optional[int] = None
    error: Optional[str] = None

class ExtractBase64Request(BaseModel):
    document_id: str
    filename: str
    base64_data: str

class PodcastRequest(BaseModel):
    document_id: str
    document_text: str
    language: str = "Tamil"

class PodcastResponse(BaseModel):
    success: bool
    audio_url: Optional[str] = None
    filename: Optional[str] = None
    message: Optional[str] = None
    error: Optional[str] = None
