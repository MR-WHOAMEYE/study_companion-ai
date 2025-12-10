// API client for the Python backend
const API_BASE_URL = 'http://localhost:8000';

export interface AIResponse {
    success: boolean;
    data?: string;
    error?: string;
}

export interface FlashcardData {
    question: string;
    answer: string;
}

export interface MCQData {
    question: string;
    options: string[];
    correctIndex: number;
}

export interface ExtractedTextResponse {
    success: boolean;
    text?: string;
    pages?: number;
    error?: string;
}

// Extract text from a base64-encoded document
export async function extractDocumentText(
    documentId: string,
    filename: string,
    base64Data: string
): Promise<ExtractedTextResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/extract-base64`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                document_id: documentId,
                filename: filename,
                base64_data: base64Data
            })
        });
        return await response.json();
    } catch (error) {
        return { success: false, error: 'Failed to connect to backend' };
    }
}

// Ask a question about the document
export async function askQuestion(
    documentId: string,
    question: string,
    documentText: string
): Promise<AIResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/ask`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                document_id: documentId,
                question: question,
                document_text: documentText
            })
        });
        return await response.json();
    } catch (error) {
        return { success: false, error: 'Failed to connect to backend' };
    }
}

// Generate summary
export async function generateSummary(
    documentId: string,
    summaryType: string,
    documentText: string
): Promise<AIResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/summary`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                document_id: documentId,
                summary_type: summaryType,
                document_text: documentText
            })
        });
        return await response.json();
    } catch (error) {
        return { success: false, error: 'Failed to connect to backend' };
    }
}

// Generate flashcards
export async function generateFlashcards(
    documentId: string,
    documentText: string,
    count: number = 8
): Promise<{ success: boolean; flashcards?: FlashcardData[]; error?: string }> {
    try {
        const response = await fetch(`${API_BASE_URL}/flashcards`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                document_id: documentId,
                document_text: documentText,
                count: count
            })
        });
        return await response.json();
    } catch (error) {
        return { success: false, error: 'Failed to connect to backend' };
    }
}

// Generate MCQs
export async function generateMCQs(
    documentId: string,
    documentText: string,
    count: number = 5
): Promise<{ success: boolean; mcqs?: MCQData[]; error?: string }> {
    try {
        const response = await fetch(`${API_BASE_URL}/mcqs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                document_id: documentId,
                document_text: documentText,
                count: count
            })
        });
        return await response.json();
    } catch (error) {
        return { success: false, error: 'Failed to connect to backend' };
    }
}

export interface PodcastResponse {
    success: boolean;
    audio_url?: string;
    filename?: string;
    message?: string;
    error?: string;
}

// Generate Podcast from document using podcastfy + ElevenLabs
export async function generatePodcast(
    documentId: string,
    documentText: string,
    language: string = 'Tamil'
): Promise<PodcastResponse> {
    try {
        const response = await fetch(`${API_BASE_URL}/podcast`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                document_id: documentId,
                document_text: documentText,
                language: language
            })
        });
        return await response.json();
    } catch (error) {
        return { success: false, error: 'Failed to connect to backend' };
    }
}

// Get full podcast URL
export function getPodcastUrl(audioUrl: string): string {
    return `${API_BASE_URL}${audioUrl}`;
}
