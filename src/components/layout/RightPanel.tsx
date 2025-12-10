import { motion, AnimatePresence } from 'framer-motion';
import { MessageSquare, FileText, Layers, CheckSquare, Headphones, BarChart3 } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';
import QAPanel from '@/components/panels/QAPanel';
import SummaryPanel from '@/components/panels/SummaryPanel';
import FlashcardsPanel from '@/components/panels/FlashcardsPanel';
import MCQPanel from '@/components/panels/MCQPanel';
import PodcastPanel from '@/components/panels/PodcastPanel';
import AnalyticsPanel from '@/components/panels/AnalyticsPanel';

const tabs = [
  { id: 'qa', label: 'Q&A', icon: MessageSquare },
  { id: 'summary', label: 'Summary', icon: FileText },
  { id: 'flashcards', label: 'Cards', icon: Layers },
  { id: 'mcqs', label: 'Quiz', icon: CheckSquare },
  { id: 'podcast', label: 'Listen', icon: Headphones },
  { id: 'analytics', label: 'Stats', icon: BarChart3 },
] as const;

const RightPanel = () => {
  const { activePanel, setActivePanel, selectedDocument } = useStore();

  const renderPanel = () => {
    switch (activePanel) {
      case 'qa':
        return <QAPanel />;
      case 'summary':
        return <SummaryPanel />;
      case 'flashcards':
        return <FlashcardsPanel />;
      case 'mcqs':
        return <MCQPanel />;
      case 'podcast':
        return <PodcastPanel />;
      case 'analytics':
        return <AnalyticsPanel />;
      default:
        return <QAPanel />;
    }
  };

  return (
    <motion.aside
      initial={{ x: 380 }}
      animate={{ x: 0 }}
      className="w-[380px] h-screen bg-card border-l border-border flex flex-col"
    >
      {/* Tabs */}
      <div className="flex border-b border-border">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActivePanel(tab.id)}
            className={cn(
              "flex-1 flex flex-col items-center gap-1 py-3 text-xs font-medium transition-all duration-200 relative",
              activePanel === tab.id
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <tab.icon className="w-4 h-4" />
            <span>{tab.label}</span>
            {activePanel === tab.id && (
              <motion.div
                layoutId="activeTab"
                className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary"
              />
            )}
          </button>
        ))}
      </div>

      {/* Panel Content */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={activePanel}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="h-full"
          >
            {selectedDocument ? (
              renderPanel()
            ) : (
              <div className="h-full flex items-center justify-center p-6">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-secondary/50 flex items-center justify-center">
                    <MessageSquare className="w-8 h-8 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Select a document to get started
                  </p>
                </div>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.aside>
  );
};

export default RightPanel;
