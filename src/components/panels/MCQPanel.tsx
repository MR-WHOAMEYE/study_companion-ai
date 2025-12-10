import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { CheckCircle2, XCircle, Trophy, RefreshCw, CheckSquare, AlertCircle, Loader2, BookOpen } from 'lucide-react';
import { useStore, MCQ } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { generateMCQs, extractDocumentText } from '@/lib/api';

const MCQPanel = () => {
  const { mcqs, setMCQs, answerMCQ, selectedDocument } = useStore();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showResults, setShowResults] = useState(false);
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

  const handleGenerateMCQs = async () => {
    if (!selectedDocument || !extractedText) {
      setError('Please select a document first');
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      const result = await generateMCQs(selectedDocument.id, extractedText, 5);

      if (result.success && result.mcqs) {
        const formattedMCQs: MCQ[] = result.mcqs.map((q, index) => ({
          id: `${Date.now()}-${index}`,
          question: q.question,
          options: q.options,
          correctIndex: q.correctIndex,
        }));
        setMCQs(formattedMCQs);
        setShowResults(false);
        setCurrentIndex(0);
      } else {
        setError(result.error || 'Failed to generate quiz');
      }
    } catch (err) {
      setError('Failed to generate quiz. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const handleAnswer = (answerIndex: number) => {
    answerMCQ(mcqs[currentIndex].id, answerIndex);
    setTimeout(() => {
      if (currentIndex < mcqs.length - 1) setCurrentIndex(currentIndex + 1);
      else setShowResults(true);
    }, 800);
  };

  const resetQuiz = () => {
    setMCQs(mcqs.map(q => ({ ...q, userAnswer: undefined })));
    setCurrentIndex(0);
    setShowResults(false);
  };

  const currentMCQ = mcqs[currentIndex];
  const correctAnswers = mcqs.filter(q => q.userAnswer === q.correctIndex).length;
  const score = mcqs.length > 0 ? Math.round((correctAnswers / mcqs.length) * 100) : 0;

  if (mcqs.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <div className="w-20 h-20 mb-6 rounded-2xl bg-primary/20 flex items-center justify-center mx-auto">
            <CheckSquare className="w-10 h-10 text-primary" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">Quiz Mode</h3>
          <p className="text-sm text-muted-foreground mb-4 max-w-[250px]">AI-powered quizzes via Python Backend</p>

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
          <Button variant="glow" onClick={handleGenerateMCQs} disabled={isGenerating || !extractedText}>
            {isGenerating ? 'Generating...' : 'Start Quiz'}
          </Button>
        </motion.div>
      </div>
    );
  }

  if (showResults) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-6 text-center">
        <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
          <div className={cn("w-24 h-24 mb-6 rounded-full flex items-center justify-center mx-auto",
            score >= 75 ? "bg-success/20" : score >= 50 ? "bg-warning/20" : "bg-destructive/20"
          )}>
            <Trophy className={cn("w-12 h-12",
              score >= 75 ? "text-success" : score >= 50 ? "text-warning" : "text-destructive"
            )} />
          </div>
          <h3 className="text-2xl font-bold text-foreground mb-2">{score}%</h3>
          <p className="text-muted-foreground mb-2">{correctAnswers} of {mcqs.length} correct</p>
          <p className="text-sm text-muted-foreground mb-6">
            {score >= 75 ? 'Excellent!' : score >= 50 ? 'Good effort!' : 'Keep studying!'}
          </p>

          <div className="w-full text-left mb-6 space-y-2 max-h-48 overflow-y-auto">
            {mcqs.map((q, i) => (
              <div key={q.id} className={cn("flex items-center gap-2 p-2 rounded-lg text-sm",
                q.userAnswer === q.correctIndex ? "bg-success/10" : "bg-destructive/10"
              )}>
                {q.userAnswer === q.correctIndex
                  ? <CheckCircle2 className="w-4 h-4 text-success shrink-0" />
                  : <XCircle className="w-4 h-4 text-destructive shrink-0" />}
                <span className="truncate text-muted-foreground">Q{i + 1}: {q.question}</span>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Button variant="outline" onClick={resetQuiz} className="flex-1">
              <RefreshCw className="w-4 h-4 mr-2" />Retry
            </Button>
            <Button variant="glow" onClick={handleGenerateMCQs} disabled={isGenerating} className="flex-1">New Quiz</Button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col p-4">
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-foreground">Question {currentIndex + 1} of {mcqs.length}</span>
        </div>
        <div className="flex gap-1">
          {mcqs.map((q, i) => (
            <div key={q.id} className={cn("flex-1 h-1.5 rounded-full transition-colors",
              i < currentIndex ? (q.userAnswer === q.correctIndex ? "bg-success" : "bg-destructive")
                : i === currentIndex ? "bg-primary" : "bg-secondary"
            )} />
          ))}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div key={currentMCQ.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="flex-1 flex flex-col">
          <div className="panel p-4 mb-4">
            <p className="text-foreground font-medium leading-relaxed">{currentMCQ.question}</p>
          </div>

          <div className="space-y-2">
            {currentMCQ.options.map((option, i) => {
              const isAnswered = currentMCQ.userAnswer !== undefined;
              const isCorrect = i === currentMCQ.correctIndex;
              const isSelected = currentMCQ.userAnswer === i;

              return (
                <motion.button
                  key={i}
                  whileHover={!isAnswered ? { scale: 1.01 } : {}}
                  onClick={() => !isAnswered && handleAnswer(i)}
                  disabled={isAnswered}
                  className={cn("w-full text-left p-4 rounded-xl border-2 transition-all",
                    isAnswered
                      ? isCorrect ? "border-success bg-success/10"
                        : isSelected ? "border-destructive bg-destructive/10"
                          : "border-border bg-secondary/30 opacity-50"
                      : "border-border bg-secondary/30 hover:border-primary/50"
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div className={cn("w-6 h-6 rounded-full border-2 flex items-center justify-center text-xs font-semibold",
                      isAnswered
                        ? isCorrect ? "border-success text-success"
                          : isSelected ? "border-destructive text-destructive"
                            : "border-muted-foreground/30 text-muted-foreground/30"
                        : "border-muted-foreground text-muted-foreground"
                    )}>
                      {String.fromCharCode(65 + i)}
                    </div>
                    <span className={cn("text-sm", isAnswered && !isCorrect && !isSelected ? "text-muted-foreground" : "text-foreground")}>{option}</span>
                    {isAnswered && isCorrect && <CheckCircle2 className="w-5 h-5 text-success ml-auto" />}
                    {isAnswered && isSelected && !isCorrect && <XCircle className="w-5 h-5 text-destructive ml-auto" />}
                  </div>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MCQPanel;
