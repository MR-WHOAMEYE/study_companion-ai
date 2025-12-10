import { motion } from 'framer-motion';
import {
  BookOpen,
  Upload,
  FolderOpen,
  BarChart3,
  Settings,
  Brain,
  ChevronRight
} from 'lucide-react';
import { useStore } from '@/store/useStore';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

interface SidebarProps {
  onUploadClick: () => void;
}

const Sidebar = ({ onUploadClick }: SidebarProps) => {
  const { documents, selectedDocument, setSelectedDocument } = useStore();

  const menuItems = [
    { icon: FolderOpen, label: 'Documents', count: documents.length },
    { icon: BarChart3, label: 'Analytics' },
    { icon: Settings, label: 'Settings' },
  ];

  return (
    <motion.aside
      initial={{ x: -280 }}
      animate={{ x: 0 }}
      className="w-72 h-screen bg-sidebar border-r border-sidebar-border flex flex-col"
    >
      {/* Logo */}
      <div className="p-6 border-b border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
            <Brain className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-lg font-bold text-foreground">StudyAI</h1>
            <p className="text-xs text-muted-foreground">Smart Learning</p>
          </div>
        </div>
      </div>

      {/* Upload Button */}
      <div className="p-4">
        <Button
          onClick={onUploadClick}
          variant="glow"
          className="w-full justify-start gap-3"
        >
          <Upload className="w-4 h-4" />
          Upload Document
        </Button>
      </div>

      {/* Document List */}
      <div className="flex-1 overflow-auto px-4 pb-4">
        <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-3">
          Recent Documents
        </div>
        <div className="space-y-1">
          {documents.length === 0 ? (
            <div className="text-sm text-muted-foreground py-8 text-center">
              No documents yet
            </div>
          ) : (
            documents.map((doc, index) => (
              <motion.button
                key={doc.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.05 }}
                onClick={() => setSelectedDocument(doc)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-lg text-left transition-all duration-200 group",
                  selectedDocument?.id === doc.id
                    ? "bg-primary/20 text-foreground"
                    : "text-muted-foreground hover:bg-secondary hover:text-foreground"
                )}
              >
                <BookOpen className="w-4 h-4 shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium truncate">{doc.name}</div>
                  <div className="text-xs opacity-70">
                    {doc.type === 'image' ? 'Image' : `${doc.pages} pages`}
                  </div>
                </div>
                <ChevronRight className={cn(
                  "w-4 h-4 transition-transform",
                  selectedDocument?.id === doc.id && "text-primary"
                )} />
              </motion.button>
            ))
          )}
        </div>
      </div>
    </motion.aside>
  );
};

export default Sidebar;
