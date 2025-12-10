import os
from dotenv import load_dotenv
import google.generativeai as genai
import json
import re
import base64
from typing import List, Dict

# Load environment variables from .env
load_dotenv(os.path.join(os.path.dirname(__file__), '.env'))

# Configure Gemini API
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")
genai.configure(api_key=GEMINI_API_KEY)

# Use Gemini 2.0 Flash (supports vision)
model = genai.GenerativeModel('gemini-2.5-flash-preview-09-2025')


def parse_image_data(document_text: str) -> tuple[bool, str, bytes]:
    """Check if the document text is actually image data and parse it."""
    if document_text.startswith("[IMAGE_DATA:"):
        # Extract image data: [IMAGE_DATA:mime_type:base64_data]
        match = re.match(r'\[IMAGE_DATA:([^:]+):(.+)\]', document_text)
        if match:
            mime_type = match.group(1)
            base64_data = match.group(2)
            image_bytes = base64.b64decode(base64_data)
            return True, mime_type, image_bytes
    return False, "", b""


async def ask_question(question: str, document_text: str, document_name: str) -> str:
    """Ask a question about the document content."""
    
    # Check if this is image data
    is_image, mime_type, image_bytes = parse_image_data(document_text)
    
    if is_image:
        # Use vision capability for images
        prompt = f"""You are a helpful AI study assistant. You are analyzing an image from a document called "{document_name}".
Look at this image carefully and answer the following question about it.
Be concise, accurate, and helpful.

Question: {question}

Please provide a helpful answer based on what you see in the image:"""
        
        try:
            response = model.generate_content([
                prompt,
                {"mime_type": mime_type, "data": image_bytes}
            ])
            return response.text
        except Exception as e:
            raise Exception(f"Gemini Vision API error: {str(e)}")
    else:
        # Text-based question
        prompt = f"""You are a helpful AI study assistant. You are helping the user study a document called "{document_name}".
Answer questions based on the document content provided below. Be concise, accurate, and helpful.
If the answer is not in the document, say so politely.

Document Content:
{document_text}

---
User Question: {question}

Please provide a helpful answer:"""

        try:
            response = model.generate_content(prompt)
            return response.text
        except Exception as e:
            raise Exception(f"Gemini API error: {str(e)}")


async def generate_summary(document_text: str, document_name: str, summary_type: str) -> str:
    """Generate a summary of the document."""
    
    # Check if this is image data
    is_image, mime_type, image_bytes = parse_image_data(document_text)
    
    type_instructions = {
        'short': 'Provide a brief 2-3 sentence summary.',
        'detailed': 'Provide a comprehensive detailed summary with key themes, main points, and conclusions.',
        'bullet': 'Provide the summary as concise bullet points covering all key takeaways.',
    }
    instruction = type_instructions.get(summary_type, type_instructions['short'])
    
    if is_image:
        prompt = f"""You are a study assistant. Analyze this image from "{document_name}" and summarize what you see.
{instruction}

Provide your summary:"""
        
        try:
            response = model.generate_content([
                prompt,
                {"mime_type": mime_type, "data": image_bytes}
            ])
            return response.text
        except Exception as e:
            raise Exception(f"Summary generation error: {str(e)}")
    else:
        prompt = f"""You are a study assistant. Summarize the following document.
{instruction}

Document: "{document_name}"

Content:
{document_text}

Provide your summary:"""

        try:
            response = model.generate_content(prompt)
            return response.text
        except Exception as e:
            raise Exception(f"Summary generation error: {str(e)}")


async def generate_flashcards(document_text: str, document_name: str, count: int = 8) -> List[Dict]:
    """Generate flashcards from document content."""
    
    # Check if this is image data  
    is_image, mime_type, image_bytes = parse_image_data(document_text)
    
    if is_image:
        prompt = f"""You are a study assistant. Look at this image from "{document_name}" and create {count} flashcards to help with studying.

Each flashcard should have:
- A clear question that tests understanding of what's in the image
- A concise but complete answer

Return the flashcards in this exact JSON format (no markdown, just raw JSON):
[
  {{"question": "Question 1?", "answer": "Answer 1"}},
  {{"question": "Question 2?", "answer": "Answer 2"}}
]

Generate {count} flashcards:"""

        try:
            response = model.generate_content([
                prompt,
                {"mime_type": mime_type, "data": image_bytes}
            ])
            text = response.text
            json_match = re.search(r'\[[\s\S]*\]', text)
            if json_match:
                return json.loads(json_match.group())
            return []
        except Exception as e:
            raise Exception(f"Flashcard generation error: {str(e)}")
    else:
        prompt = f"""You are a study assistant. Create {count} flashcards from the following document to help with studying.

Each flashcard should have:
- A clear question that tests understanding
- A concise but complete answer

Document: "{document_name}"

Content:
{document_text}

Return the flashcards in this exact JSON format (no markdown, just raw JSON):
[
  {{"question": "Question 1?", "answer": "Answer 1"}},
  {{"question": "Question 2?", "answer": "Answer 2"}}
]

Generate {count} flashcards:"""

        try:
            response = model.generate_content(prompt)
            text = response.text
            
            # Parse JSON from the response
            json_match = re.search(r'\[[\s\S]*\]', text)
            if json_match:
                return json.loads(json_match.group())
            return []
        except Exception as e:
            raise Exception(f"Flashcard generation error: {str(e)}")


async def generate_mcqs(document_text: str, document_name: str, count: int = 5) -> List[Dict]:
    """Generate MCQ questions from document content."""
    
    # Check if this is image data
    is_image, mime_type, image_bytes = parse_image_data(document_text)
    
    if is_image:
        prompt = f"""You are a study assistant. Look at this image from "{document_name}" and create {count} multiple choice questions to test understanding.

Each question should have:
- A clear question about the image content
- 4 options (A, B, C, D)
- The correct answer marked

Return the questions in this exact JSON format (no markdown, just raw JSON):
[
  {{"question": "Question text?", "options": ["Option A", "Option B", "Option C", "Option D"], "correctIndex": 0}}
]

Note: correctIndex is 0-based (0 for A, 1 for B, 2 for C, 3 for D)

Generate {count} MCQ questions:"""

        try:
            response = model.generate_content([
                prompt,
                {"mime_type": mime_type, "data": image_bytes}
            ])
            text = response.text
            json_match = re.search(r'\[[\s\S]*\]', text)
            if json_match:
                return json.loads(json_match.group())
            return []
        except Exception as e:
            raise Exception(f"MCQ generation error: {str(e)}")
    else:
        prompt = f"""You are a study assistant. Create {count} multiple choice questions from the following document to test understanding.

Each question should have:
- A clear question
- 4 options (A, B, C, D)
- The correct answer marked

Document: "{document_name}"

Content:
{document_text}

Return the questions in this exact JSON format (no markdown, just raw JSON):
[
  {{"question": "Question text?", "options": ["Option A", "Option B", "Option C", "Option D"], "correctIndex": 0}}
]

Note: correctIndex is 0-based (0 for A, 1 for B, 2 for C, 3 for D)

Generate {count} MCQ questions:"""

        try:
            response = model.generate_content(prompt)
            text = response.text
            
            # Parse JSON from the response
            json_match = re.search(r'\[[\s\S]*\]', text)
            if json_match:
                return json.loads(json_match.group())
            return []
        except Exception as e:
            raise Exception(f"MCQ generation error: {str(e)}")
