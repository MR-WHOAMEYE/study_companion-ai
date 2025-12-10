import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Send, Sparkles, BookOpen, AlertCircle, Loader2 } from 'lucide-react';
import { useStore, Message } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { askQuestion, extractDocumentText } from '@/lib/api';

const QAPanel = () => {
  const { messages, addMessage, selectedDocument } = useStore();
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isExtractingText, setIsExtractingText] = useState(false);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

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
            console.log('Extracted text from backend, length:', result.text.length);
          } else {
            console.error('Backend extraction failed:', result.error);
            setExtractedText(null);
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

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: input,
      timestamp: new Date(),
    };

    addMessage(userMessage);
    const question = input;
    setInput('');
    setIsLoading(true);
    setError(null);

    try {
      const result = await askQuestion(
        selectedDocument?.id || 'no-document',
        question,
        extractedText || ''
      );

      if (result.success && result.data) {
        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          type: 'assistant',
          content: result.data,
          timestamp: new Date(),
        };
        addMessage(aiMessage);
      } else {
        setError(result.error || 'Failed to get AI response');
      }
    } catch (err) {
      setError('Failed to get AI response. Please try again.');
      console.error('AI Error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const suggestedQuestions = [
    "Summarize the main concepts",
    "What are the key takeaways?",
    "Explain the methodology",
    "List important definitions",
  ];

  return (
    <div className="h-full flex flex-col">
      {/* Document text status */}
      {selectedDocument && (
        <div className="px-4 pt-2">
          <div className={cn(
            "text-xs px-2 py-1 rounded-full inline-flex items-center gap-1",
            isExtractingText
              ? "bg-yellow-500/10 text-yellow-600"
              : extractedText
                ? "bg-green-500/10 text-green-600"
                : "bg-secondary text-muted-foreground"
          )}>
            {isExtractingText ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" />
                Extracting text (Backend)...
              </>
            ) : extractedText ? (
              <>
                <BookOpen className="w-3 h-3" />
                Document loaded via Backend
              </>
            ) : (
              'No text extracted'
            )}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="h-full flex flex-col items-center justify-center text-center"
          >
            <div className="w-16 h-16 mb-4 rounded-2xl bg-primary/20 flex items-center justify-center">
              <Sparkles className="w-8 h-8 text-primary" />
            </div>
            <h3 className="text-lg font-semibold text-foreground mb-2">Ask anything</h3>
            <p className="text-sm text-muted-foreground mb-6 max-w-[250px]">
              Powered by Gemini AI via Python Backend
            </p>
            <div className="space-y-2 w-full">
              {suggestedQuestions.map((q, i) => (
                <motion.button
                  key={q}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => setInput(q)}
                  disabled={isExtractingText}
                  className="w-full text-left text-sm p-3 rounded-lg bg-secondary/50 hover:bg-secondary text-muted-foreground hover:text-foreground transition-colors disabled:opacity-50"
                >
                  {q}
                </motion.button>
              ))}
            </div>
          </motion.div>
        ) : (
          <AnimatePresence>
            {messages.map((msg, index) => (
              <motion.div
                key={msg.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className={cn(
                  "flex",
                  msg.type === 'user' ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] rounded-2xl px-4 py-3",
                    msg.type === 'user'
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-secondary text-secondary-foreground rounded-bl-md"
                  )}
                >
                  <p className="text-sm whitespace-pre-wrap">{msg.content}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}

        {/* Error message */}
        {error && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm"
          >
            <AlertCircle className="w-4 h-4" />
            {error}
          </motion.div>
        )}

        {/* Loading indicator */}
        {isLoading && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex justify-start"
          >
            <div className="bg-secondary rounded-2xl rounded-bl-md px-4 py-3">
              <div className="flex gap-1">
                {[0, 1, 2].map((i) => (
                  <motion.div
                    key={i}
                    className="w-2 h-2 rounded-full bg-primary"
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{
                      repeat: Infinity,
                      duration: 0.8,
                      delay: i * 0.2,
                    }}
                  />
                ))}
              </div>
            </div>
          </motion.div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t border-border">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={isExtractingText ? "Extracting document text..." : "Ask a question..."}
            disabled={isExtractingText}
            className="flex-1 bg-input border border-border rounded-xl px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
          />
          <Button
            onClick={handleSend}
            disabled={!input.trim() || isLoading || isExtractingText}
            variant="glow"
            size="icon"
            className="shrink-0"
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QAPanel;
