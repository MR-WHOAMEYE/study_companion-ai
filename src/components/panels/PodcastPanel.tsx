import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mic, Loader2, Play, Pause, Download, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useStore } from '@/store/useStore';
import { generatePodcast, getPodcastUrl, extractDocumentText } from '@/lib/api';

const PodcastPanel = () => {
  const { selectedDocument } = useStore();
  const [isGenerating, setIsGenerating] = useState(false);
  const [isExtracting, setIsExtracting] = useState(false);
  const [podcastUrl, setPodcastUrl] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [language, setLanguage] = useState('Tamil');
  const [audioElement, setAudioElement] = useState<HTMLAudioElement | null>(null);

  const handleGeneratePodcast = async () => {
    if (!selectedDocument?.fileData) {
      setError('Please upload a document first');
      return;
    }

    setIsGenerating(true);
    setError(null);
    setPodcastUrl(null);

    try {
      // First extract text from the document
      setIsExtracting(true);
      const extractResult = await extractDocumentText(
        selectedDocument.id,
        selectedDocument.name,
        selectedDocument.fileData
      );
      setIsExtracting(false);

      if (!extractResult.success || !extractResult.text) {
        setError('Failed to extract text from document');
        setIsGenerating(false);
        return;
      }

      // Generate podcast
      const result = await generatePodcast(
        selectedDocument.id,
        extractResult.text,
        language
      );

      if (result.success && result.audio_url) {
        const fullUrl = getPodcastUrl(result.audio_url);
        setPodcastUrl(fullUrl);

        // Create audio element
        const audio = new Audio(fullUrl);
        audio.onended = () => setIsPlaying(false);
        setAudioElement(audio);
      } else {
        setError(result.error || 'Failed to generate podcast');
      }
    } catch (err) {
      setError('An error occurred while generating the podcast');
    } finally {
      setIsGenerating(false);
    }
  };

  const togglePlayPause = () => {
    if (!audioElement) return;

    if (isPlaying) {
      audioElement.pause();
    } else {
      audioElement.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleDownload = () => {
    if (!podcastUrl) return;

    const link = document.createElement('a');
    link.href = podcastUrl;
    link.download = `podcast_${selectedDocument?.name || 'document'}_${language}.mp3`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="p-6 space-y-6">
      <div className="text-center">
        <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center">
          <Mic className="w-8 h-8 text-purple-500" />
        </div>
        <h3 className="text-lg font-semibold text-foreground mb-2">Generate Podcast</h3>
        <p className="text-sm text-muted-foreground">
          Convert your document into an engaging audio podcast
        </p>
      </div>

      {/* Language Selection */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-foreground">Language</label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="w-full p-2 rounded-lg border border-border bg-background text-foreground"
        >
          <option value="Tamil">Tamil (தமிழ்)</option>
          <option value="English">English</option>
          <option value="Hindi">Hindi (हिंदी)</option>
          <option value="Telugu">Telugu (తెలుగు)</option>
          <option value="Malayalam">Malayalam (മലയാളം)</option>
          <option value="Kannada">Kannada (ಕನ್ನಡ)</option>
        </select>
      </div>

      {/* Generate Button */}
      <Button
        onClick={handleGeneratePodcast}
        disabled={isGenerating || !selectedDocument}
        className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
      >
        {isGenerating ? (
          <>
            <Loader2 className="w-5 h-5 mr-2 animate-spin" />
            {isExtracting ? 'Extracting text...' : 'Generating podcast...'}
          </>
        ) : (
          <>
            <Mic className="w-5 h-5 mr-2" />
            Generate Podcast
          </>
        )}
      </Button>

      {/* Generation Notice */}
      {isGenerating && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg bg-purple-500/10 border border-purple-500/20"
        >
          <p className="text-sm text-purple-300 text-center">
            ⏳ This may take 1-2 minutes. We're creating an engaging conversation from your document.
          </p>
        </motion.div>
      )}

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="p-4 rounded-lg bg-destructive/10 border border-destructive/20"
        >
          <p className="text-sm text-destructive">{error}</p>
        </motion.div>
      )}

      {/* Audio Player */}
      {podcastUrl && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="space-y-4"
        >
          <div className="p-6 rounded-2xl bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20">
            <div className="flex items-center justify-center gap-4 mb-4">
              <Button
                onClick={togglePlayPause}
                size="lg"
                className="w-16 h-16 rounded-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
              >
                {isPlaying ? (
                  <Pause className="w-8 h-8" />
                ) : (
                  <Play className="w-8 h-8 ml-1" />
                )}
              </Button>
            </div>

            <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
              <Volume2 className="w-4 h-4" />
              <span>Podcast in {language}</span>
            </div>
          </div>

          {/* Native Audio Element */}
          <audio
            src={podcastUrl}
            controls
            className="w-full rounded-lg"
            onPlay={() => setIsPlaying(true)}
            onPause={() => setIsPlaying(false)}
            onEnded={() => setIsPlaying(false)}
          />

          {/* Download Button */}
          <Button
            onClick={handleDownload}
            variant="outline"
            className="w-full"
          >
            <Download className="w-4 h-4 mr-2" />
            Download Podcast
          </Button>
        </motion.div>
      )}

      {/* Info */}
      <div className="text-xs text-muted-foreground text-center space-y-1">
        <p>Powered by Podcastfy + ElevenLabs</p>
        <p>Creates a conversational podcast from your document</p>
      </div>
    </div>
  );
};

export default PodcastPanel;
