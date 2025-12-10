import os
import sys
import shutil
import builtins
from pathlib import Path
from dotenv import load_dotenv

# Load environment variables from .env
load_dotenv(os.path.join(os.path.dirname(__file__), '.env'))

# Monkey-patch open() to force UTF-8 encoding on Windows for non-binary files
_original_open = builtins.open
def _utf8_open(*args, **kwargs):
    if len(args) >= 2:
        mode = args[1]
    else:
        mode = kwargs.get('mode', 'r')
    # Only add encoding for text mode (not binary)
    if 'b' not in mode and 'encoding' not in kwargs:
        kwargs['encoding'] = 'utf-8'
        kwargs['errors'] = 'replace'
    return _original_open(*args, **kwargs)
builtins.open = _utf8_open

from podcastfy.client import generate_podcast

# Fix for Windows Unicode encoding issues
if sys.platform == 'win32':
    import io
    try:
        sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8', errors='replace')
        sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8', errors='replace')
    except:
        pass

# Set API keys as environment variables for podcastfy
os.environ["PYTHONIOENCODING"] = "utf-8"
os.environ["ELEVENLABS_API_KEY"] = os.getenv("ELEVENLABS_API_KEY", "")
os.environ["GEMINI_API_KEY"] = os.getenv("GEMINI_API_KEY", "")

# Directory to store generated podcasts
PODCAST_OUTPUT_DIR = Path(__file__).parent.parent / "podcasts"
PODCAST_OUTPUT_DIR.mkdir(exist_ok=True)


async def generate_podcast_from_text(
    document_text: str,
    document_name: str,
    language: str = "Tamil"
) -> dict:
    """
    Generate a podcast from document text using podcastfy with ElevenLabs TTS.
    
    Args:
        document_text: The text content to convert into a podcast
        document_name: Name of the source document
        language: Language for the podcast (default: Tamil)
    
    Returns:
        dict with success status and audio file path
    """
    try:
        # Prepare the text content
        text_content = f"Document: {document_name}\n\n{document_text[:15000]}"
        
        # Custom conversation config
        conversation_config = {
            "output_language": language,
            "word_count": 1500,
            "conversation_style": ["educational", "engaging"],
            "roles_person1": "Host",
            "roles_person2": "Expert",
            "dialogue_structure": [
                "Introduction",
                "Main Content Discussion",
                "Key Takeaways",
                "Conclusion"
            ],
            "podcast_name": "Study Companion Pro",
            "podcast_tagline": "Learning made easy through conversation",
            "creativity": 0.7
        }
        
        # Generate output filename
        safe_name = "".join(c for c in document_name if c.isalnum() or c in "._- ")[:50]
        output_filename = f"podcast_{safe_name}_{language}.mp3"
        output_path = PODCAST_OUTPUT_DIR / output_filename
        
        # Generate the podcast using podcastfy with raw_text
        audio_file = generate_podcast(
            text=text_content,
            tts_model="elevenlabs",
            llm_model_name="gemini-2.5-flash-preview-09-2025",
            conversation_config=conversation_config
        )
        
        # Move the generated file to our podcasts directory
        if audio_file and Path(audio_file).exists():
            shutil.move(audio_file, output_path)
            return {
                "success": True,
                "audio_file": output_filename,
                "audio_path": str(output_path),
                "message": f"Podcast generated successfully in {language}"
            }
        else:
            return {
                "success": False,
                "error": "Failed to generate podcast audio"
            }
            
    except Exception as e:
        return {
            "success": False,
            "error": str(e)
        }


def get_podcast_path(filename: str) -> Path:
    """Get the full path for a podcast file."""
    return PODCAST_OUTPUT_DIR / filename


def list_podcasts() -> list:
    """List all generated podcasts."""
    if not PODCAST_OUTPUT_DIR.exists():
        return []
    return [f.name for f in PODCAST_OUTPUT_DIR.glob("*.mp3")]
