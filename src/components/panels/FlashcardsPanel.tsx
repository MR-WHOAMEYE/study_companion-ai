import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RotateCcw, Check, X, Shuffle, Layers, AlertCircle, Loader2, BookOpen } from 'lucide-react';
import { useStore, Flashcard } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { generateFlashcards, extractDocumentText } from '@/lib/api';

const FlashcardsPanel = () => {
  const { flashcards, setFlashcards, toggleFlashcardKnown, selectedDocument } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExtractingText, setIsExtractingText] = useState(false);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Extract text when document changes
  useEffect(() => {
    const extractText = async () => {
      if (selectedDocument?.fileData) {
        setIsExtractingText(true);
        setExtractedText(null);
        try {
          const result = await extractDocumentText(
            selectedDocument.id,
            selectedDocument.name,
            selectedDocument.fileData
          );
          if (result.success && result.text) {
            setExtractedText(result.text);
          }
        } catch (err) {
          console.error('Failed to extract text:', err);
          setExtractedText(null);
        } finally {
          setIsExtractingText(false);
        }
      } else {
        setExtractedText(null);
      }
    };

    extractText();
  }, [selectedDocument?.id]);

  const handleGenerateFlashcards = async () => {
    if (!selectedDocument || !extractedText) {
      setError('Please select a document first');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const result = await generateFlashcards(
        selectedDocument.id,
        extractedText,
        8
      );

      if (result.success && result.flashcards) {
        const formattedCards: Flashcard[] = result.flashcards.map((card, index) => ({
          id: `${Date.now()}-${index}`,
          question: card.question,
          answer: card.answer,
          known: false,
        }));
        setFlashcards(formattedCards);
        setCurrentIndex(0);
        setIsFlipped(false);
      } else {
        setError(result.error || 'Failed to generate flashcards');
      }
    } catch (err) {
      setError('Failed to generate flashcards. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const shuffleCards = () => {
    const shuffled = [...flashcards].sort(() => Math.random() - 0.5);
    setFlashcards(shuffled);
    setCurrentIndex(0);
    setIsFlipped(false);
  };

  const nextCard = () => {
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1);
      setIsFlipped(false);
    }
  };

  const prevCard = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
      setIsFlipped(false);
    }
  };

  const currentCard = flashcards[currentIndex];
  const knownCount = flashcards.filter(c => c.known).length;
  const progress = flashcards.length > 0 ? (knownCount / flashcards.length) * 100 : 0;

  if (flashcards.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="w-20 h-20 mb-6 rounded-2xl bg-accent/20 flex items-center justify-center mx-auto">
            <Layers className="w-10 h-10 text-accent" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Generate Flashcards</h3>
          <p className="text-sm text-muted-foreground mb-4 max-w-[250px]">
            AI-powered flashcards via Python Backend
          </p>

          {selectedDocument && (
            <div className={cn(
              "text-xs px-2 py-1 rounded-full inline-flex items-center gap-1 mb-4",
              isExtractingText ? "bg-yellow-500/10 text-yellow-600"
                : extractedText ? "bg-green-500/10 text-green-600"
                  : "bg-secondary text-muted-foreground"
            )}>
              {isExtractingText ? (<><Loader2 className="w-3 h-3 animate-spin" />Extracting...</>)
                : extractedText ? (<><BookOpen className="w-3 h-3" />Ready</>)
                  : 'No text'}
            </div>
          )}

          {error && (
            <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm mb-4">
              <AlertCircle className="w-4 h-4" />{error}
            </div>
          )}
          <Button variant="glow" onClick={handleGenerateFlashcards} disabled={isGenerating || !extractedText}>
            {isGenerating ? 'Generating...' : 'Generate Cards'}
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-4">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Card {currentIndex + 1} of {flashcards.length}</span>
          <span className="text-sm text-muted-foreground">{knownCount} mastered</span>
        </div>
        <div className="h-2 bg-secondary rounded-full overflow-hidden">
          <motion.div className="h-full bg-success" initial={{ width: 0 }} animate={{ width: `${progress}%` }} />
        </div>
      </div>

      <div className="flex-1 flex items-center justify-center py-4">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${currentCard.id}-${isFlipped}`}
            initial={{ rotateY: 90, opacity: 0 }}
            animate={{ rotateY: 0, opacity: 1 }}
            exit={{ rotateY: -90, opacity: 0 }}
            transition={{ duration: 0.3 }}
            onClick={() => setIsFlipped(!isFlipped)}
            className={cn(
              "w-full aspect-[4/3] rounded-2xl p-6 cursor-pointer flex flex-col border-2",
              isFlipped ? "bg-primary/10 border-primary" : "bg-secondary border-border hover:border-primary/50"
            )}
          >
            <div className="text-xs font-semibold text-muted-foreground uppercase mb-4">
              {isFlipped ? 'Answer' : 'Question'}
            </div>
            <div className="flex-1 flex items-center justify-center overflow-y-auto">
              <p className="text-foreground text-center">{isFlipped ? currentCard.answer : currentCard.question}</p>
            </div>
            <div className="text-xs text-muted-foreground text-center">Tap to flip</div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="space-y-3">
        <div className="flex gap-2">
          <Button variant="outline" className="flex-1" onClick={() => { toggleFlashcardKnown(currentCard.id); nextCard(); }}>
            <X className="w-4 h-4 mr-2 text-destructive" />Still Learning
          </Button>
          <Button variant="glow" className="flex-1" onClick={() => { if (!currentCard.known) toggleFlashcardKnown(currentCard.id); nextCard(); }}>
            <Check className="w-4 h-4 mr-2" />Got It!
          </Button>
        </div>
        <div className="flex gap-2">
          <Button variant="ghost" size="sm" onClick={prevCard} disabled={currentIndex === 0} className="flex-1">Previous</Button>
          <Button variant="ghost" size="icon" onClick={shuffleCards}><Shuffle className="w-4 h-4" /></Button>
          <Button variant="ghost" size="icon" onClick={handleGenerateFlashcards} disabled={isGenerating}><RotateCcw className="w-4 h-4" /></Button>
          <Button variant="ghost" size="sm" onClick={nextCard} disabled={currentIndex === flashcards.length - 1} className="flex-1">Next</Button>
        </div>
      </div>
    </div>
  );
};

export default FlashcardsPanel;
