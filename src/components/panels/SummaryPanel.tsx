import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { FileText, Loader2, Sparkles, AlertCircle, BookOpen } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { generateSummary, extractDocumentText } from '@/lib/api';

type SummaryType = 'short' | 'detailed' | 'bullet';

const SummaryPanel = () => {
  const { selectedDocument } = useStore();
  const [summaryType, setSummaryType] = useState<SummaryType>('short');
  const [summary, setSummary] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isExtractingText, setIsExtractingText] = useState(false);
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Extract text when document changes
  useEffect(() => {
    const extractText = async () => {
      if (selectedDocument?.fileData) {
        setIsExtractingText(true);
        setExtractedText(null);
        setSummary(null);
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

  const handleGenerateSummary = async (type: SummaryType) => {
    if (!selectedDocument) {
      setError('Please select a document first');
      return;
    }

    if (!extractedText) {
      setError('No text content available. Please wait for text extraction.');
      return;
    }

    setSummaryType(type);
    setIsLoading(true);
    setError(null);

    try {
      const result = await generateSummary(
        selectedDocument.id,
        type,
        extractedText
      );

      if (result.success && result.data) {
        setSummary(result.data);
      } else {
        setError(result.error || 'Failed to generate summary');
      }
    } catch (err) {
      setError('Failed to generate summary. Please try again.');
      console.error('Summary error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const summaryTypes = [
    { id: 'short' as SummaryType, label: 'Brief', desc: '2-3 sentences' },
    { id: 'detailed' as SummaryType, label: 'Detailed', desc: 'Full analysis' },
    { id: 'bullet' as SummaryType, label: 'Bullet Points', desc: 'Key takeaways' },
  ];

  return (
    <div className="h-full flex flex-col p-4">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-1">Document Summary</h3>
        <p className="text-sm text-muted-foreground">
          AI-powered summaries via Python Backend
        </p>

        {/* Text extraction status */}
        {selectedDocument && (
          <div className={cn(
            "text-xs px-2 py-1 rounded-full inline-flex items-center gap-1 mt-2",
            isExtractingText
              ? "bg-yellow-500/10 text-yellow-600"
              : extractedText
                ? "bg-green-500/10 text-green-600"
                : "bg-secondary text-muted-foreground"
          )}>
            {isExtractingText ? (
              <>
                <Loader2 className="w-3 h-3 animate-spin" />
                Extracting text...
              </>
            ) : extractedText ? (
              <>
                <BookOpen className="w-3 h-3" />
                Ready to summarize
              </>
            ) : (
              'No text available'
            )}
          </div>
        )}
      </div>

      {/* Summary Type Selection */}
      <div className="grid grid-cols-3 gap-2 mb-6">
        {summaryTypes.map((type) => (
          <motion.button
            key={type.id}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleGenerateSummary(type.id)}
            disabled={isLoading || isExtractingText || !extractedText}
            className={cn(
              "flex flex-col items-center p-3 rounded-xl border transition-all duration-200",
              summaryType === type.id && summary
                ? "border-primary bg-primary/10"
                : "border-border bg-secondary/30 hover:bg-secondary/50",
              (isLoading || isExtractingText || !extractedText) && "opacity-50 cursor-not-allowed"
            )}
          >
            <span className="text-sm font-medium text-foreground">{type.label}</span>
            <span className="text-xs text-muted-foreground">{type.desc}</span>
          </motion.button>
        ))}
      </div>

      {/* Error message */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 text-destructive text-sm mb-4"
        >
          <AlertCircle className="w-4 h-4" />
          {error}
        </motion.div>
      )}

      {/* Summary Content */}
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-48"
          >
            <Loader2 className="w-8 h-8 text-primary animate-spin mb-4" />
            <p className="text-sm text-muted-foreground">Generating summary via Backend...</p>
          </motion.div>
        ) : summary ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="panel p-4"
          >
            <div className="flex items-center gap-2 mb-3">
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-medium text-foreground">AI Summary</span>
            </div>
            <p className="text-sm text-muted-foreground whitespace-pre-wrap leading-relaxed">
              {summary}
            </p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-col items-center justify-center h-48 text-center"
          >
            <div className="w-16 h-16 mb-4 rounded-xl bg-secondary/50 flex items-center justify-center">
              <FileText className="w-8 h-8 text-muted-foreground" />
            </div>
            <p className="text-sm text-muted-foreground">
              {extractedText
                ? 'Select a summary type to get started'
                : 'Upload a document to generate summaries'}
            </p>
          </motion.div>
        )}
      </div>

      {/* Action Buttons */}
      {summary && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 flex gap-2"
        >
          <Button variant="outline" className="flex-1" onClick={() => navigator.clipboard.writeText(summary)}>
            Copy Summary
          </Button>
          <Button variant="glow" className="flex-1" onClick={() => handleGenerateSummary(summaryType)}>
            Regenerate
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default SummaryPanel;
