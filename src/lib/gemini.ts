// Gemini AI API Service
const GEMINI_API_KEY = 'AIzaSyDte6jVHQFNUpVvCXdY3i1u1D_BxwSMHkc';
const GEMINI_API_URL = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

export interface GeminiMessage {
    role: 'user' | 'model';
    parts: { text: string }[];
}

export interface GeminiResponse {
    candidates: {
        content: {
            parts: { text: string }[];
            role: string;
        };
        finishReason: string;
    }[];
}

// Ask a question about a document
export async function askGemini(
    question: string,
    documentContext?: string,
    documentName?: string
): Promise<string> {
    const systemPrompt = documentContext
        ? `You are a helpful AI study assistant. You are helping the user study a document called "${documentName}". 
       Answer questions based on the document content provided below. Be concise, accurate, and helpful.
       If the answer is not in the document, say so politely.
       
       Document Content:
       ${documentContext}
       
       ---
       Now answer the user's question:`
        : `You are a helpful AI study assistant. Answer the user's question helpfully and concisely.`;

    const prompt = `${systemPrompt}\n\nUser Question: ${question}`;

    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [{ text: prompt }],
                    },
                ],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 2048,
                },
            }),
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'Failed to get response from Gemini');
        }

        const data: GeminiResponse = await response.json();
        return data.candidates[0]?.content?.parts[0]?.text || 'No response generated';
    } catch (error) {
        console.error('Gemini API error:', error);
        throw error;
    }
}

// Generate a summary of a document
export async function generateSummary(documentContent: string, documentName: string): Promise<string> {
    const prompt = `You are a study assistant. Summarize the following document in a clear, structured way. 
Include:
- Main topic and purpose
- Key points (as bullet points)
- Important concepts or definitions
- Conclusion or takeaways

Document: "${documentName}"

Content:
${documentContent}

Provide a comprehensive but concise summary:`;

    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [{ text: prompt }],
                    },
                ],
                generationConfig: {
                    temperature: 0.5,
                    maxOutputTokens: 2048,
                },
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to generate summary');
        }

        const data: GeminiResponse = await response.json();
        return data.candidates[0]?.content?.parts[0]?.text || 'Failed to generate summary';
    } catch (error) {
        console.error('Summary generation error:', error);
        throw error;
    }
}

// Generate flashcards from document content
export async function generateFlashcards(
    documentContent: string,
    documentName: string,
    count: number = 10
): Promise<{ question: string; answer: string }[]> {
    const prompt = `You are a study assistant. Create ${count} flashcards from the following document to help with studying.

Each flashcard should have:
- A clear question that tests understanding
- A concise but complete answer

Document: "${documentName}"

Content:
${documentContent}

Return the flashcards in this exact JSON format (no markdown, just raw JSON):
[
  {"question": "Question 1?", "answer": "Answer 1"},
  {"question": "Question 2?", "answer": "Answer 2"}
]

Generate ${count} flashcards:`;

    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [{ text: prompt }],
                    },
                ],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 4096,
                },
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to generate flashcards');
        }

        const data: GeminiResponse = await response.json();
        const text = data.candidates[0]?.content?.parts[0]?.text || '[]';

        // Parse JSON from the response (handle potential markdown code blocks)
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        return [];
    } catch (error) {
        console.error('Flashcard generation error:', error);
        throw error;
    }
}

// Generate MCQ questions from document content
export async function generateMCQs(
    documentContent: string,
    documentName: string,
    count: number = 5
): Promise<{ question: string; options: string[]; correctIndex: number }[]> {
    const prompt = `You are a study assistant. Create ${count} multiple choice questions from the following document to test understanding.

Each question should have:
- A clear question
- 4 options (A, B, C, D)
- The correct answer marked

Document: "${documentName}"

Content:
${documentContent}

Return the questions in this exact JSON format (no markdown, just raw JSON):
[
  {"question": "Question text?", "options": ["Option A", "Option B", "Option C", "Option D"], "correctIndex": 0}
]

Note: correctIndex is 0-based (0 for A, 1 for B, 2 for C, 3 for D)

Generate ${count} MCQ questions:`;

    try {
        const response = await fetch(`${GEMINI_API_URL}?key=${GEMINI_API_KEY}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                contents: [
                    {
                        parts: [{ text: prompt }],
                    },
                ],
                generationConfig: {
                    temperature: 0.7,
                    maxOutputTokens: 4096,
                },
            }),
        });

        if (!response.ok) {
            throw new Error('Failed to generate MCQs');
        }

        const data: GeminiResponse = await response.json();
        const text = data.candidates[0]?.content?.parts[0]?.text || '[]';

        // Parse JSON from the response (handle potential markdown code blocks)
        const jsonMatch = text.match(/\[[\s\S]*\]/);
        if (jsonMatch) {
            return JSON.parse(jsonMatch[0]);
        }
        return [];
    } catch (error) {
        console.error('MCQ generation error:', error);
        throw error;
    }
}
