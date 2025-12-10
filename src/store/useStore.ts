import { create } from 'zustand';

export interface Document {
  id: string;
  name: string;
  type: 'pdf' | 'docx' | 'ppt' | 'image';
  uploadedAt: Date;
  pages: number;
  thumbnail?: string;
  fileUrl?: string; // Data URL or object URL for the uploaded file
  fileData?: string; // Base64 encoded file data for display
  extractedText?: string; // Extracted text content for AI processing
}

export interface Flashcard {
  id: string;
  question: string;
  answer: string;
  known: boolean;
}

export interface MCQ {
  id: string;
  question: string;
  options: string[];
  correctIndex: number;
  userAnswer?: number;
}

export interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  citations?: { page: number; snippet: string }[];
  timestamp: Date;
}

interface StudyStore {
  // Documents
  documents: Document[];
  selectedDocument: Document | null;
  addDocument: (doc: Document) => void;
  setSelectedDocument: (doc: Document | null) => void;

  // Current page
  currentPage: number;
  setCurrentPage: (page: number) => void;

  // Q&A
  messages: Message[];
  addMessage: (msg: Message) => void;
  clearMessages: () => void;

  // Flashcards
  flashcards: Flashcard[];
  setFlashcards: (cards: Flashcard[]) => void;
  toggleFlashcardKnown: (id: string) => void;

  // MCQs
  mcqs: MCQ[];
  setMCQs: (questions: MCQ[]) => void;
  answerMCQ: (id: string, answer: number) => void;

  // UI State
  activePanel: 'qa' | 'summary' | 'flashcards' | 'mcqs' | 'podcast' | 'analytics';
  setActivePanel: (panel: 'qa' | 'summary' | 'flashcards' | 'mcqs' | 'podcast' | 'analytics') => void;

  // Offline mode
  offlineMode: boolean;
  toggleOfflineMode: () => void;
}

export const useStore = create<StudyStore>((set) => ({
  // Documents
  documents: [],
  selectedDocument: null,
  addDocument: (doc) => set((state) => ({ documents: [...state.documents, doc] })),
  setSelectedDocument: (doc) => set({ selectedDocument: doc, currentPage: 1 }),

  // Current page
  currentPage: 1,
  setCurrentPage: (page) => set({ currentPage: page }),

  // Q&A
  messages: [],
  addMessage: (msg) => set((state) => ({ messages: [...state.messages, msg] })),
  clearMessages: () => set({ messages: [] }),

  // Flashcards
  flashcards: [],
  setFlashcards: (cards) => set({ flashcards: cards }),
  toggleFlashcardKnown: (id) => set((state) => ({
    flashcards: state.flashcards.map(card =>
      card.id === id ? { ...card, known: !card.known } : card
    )
  })),

  // MCQs
  mcqs: [],
  setMCQs: (questions) => set({ mcqs: questions }),
  answerMCQ: (id, answer) => set((state) => ({
    mcqs: state.mcqs.map(q =>
      q.id === id ? { ...q, userAnswer: answer } : q
    )
  })),

  // UI State
  activePanel: 'qa',
  setActivePanel: (panel) => set({ activePanel: panel }),

  // Offline mode
  offlineMode: false,
  toggleOfflineMode: () => set((state) => ({ offlineMode: !state.offlineMode })),
}));
