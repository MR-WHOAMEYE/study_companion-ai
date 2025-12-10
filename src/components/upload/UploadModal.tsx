import { useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useDropzone } from 'react-dropzone';
import { Upload, X, FileText, Image, File, CheckCircle2 } from 'lucide-react';
import { useStore, Document } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

interface UploadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface UploadingFile {
  file: File;
  progress: number;
  status: 'uploading' | 'complete' | 'error';
}

const UploadModal = ({ isOpen, onClose }: UploadModalProps) => {
  const { addDocument, setSelectedDocument, documents } = useStore();
  const [uploadingFiles, setUploadingFiles] = useState<UploadingFile[]>([]);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles = acceptedFiles.map(file => ({
      file,
      progress: 0,
      status: 'uploading' as const,
    }));

    setUploadingFiles(prev => [...prev, ...newFiles]);

    // Process each file - read as data URL and simulate upload
    newFiles.forEach((uploadFile, index) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        const fileDataUrl = e.target?.result as string;

        // Simulate upload progress
        const interval = setInterval(() => {
          setUploadingFiles(prev =>
            prev.map(f => {
              if (f.file === uploadFile.file) {
                const newProgress = Math.min(f.progress + Math.random() * 20, 100);
                if (newProgress >= 100) {
                  clearInterval(interval);

                  const fileType = getFileType(uploadFile.file.name);
                  // Add to document store with file data
                  const doc: Document = {
                    id: Date.now().toString() + index,
                    name: uploadFile.file.name,
                    type: fileType,
                    uploadedAt: new Date(),
                    pages: fileType === 'image' ? 1 : Math.floor(Math.random() * 50) + 5,
                    fileUrl: fileDataUrl,
                    fileData: fileDataUrl,
                  };
                  addDocument(doc);

                  // Auto-select the first uploaded document
                  if (index === 0) {
                    setSelectedDocument(doc);
                  }

                  return { ...f, progress: 100, status: 'complete' as const };
                }
                return { ...f, progress: newProgress };
              }
              return f;
            })
          );
        }, 200);
      };

      reader.readAsDataURL(uploadFile.file);
    });
  }, [addDocument, setSelectedDocument]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'application/pdf': ['.pdf'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
      'application/vnd.openxmlformats-officedocument.presentationml.presentation': ['.pptx'],
      'image/*': ['.png', '.jpg', '.jpeg'],
    },
  });

  const getFileType = (filename: string): Document['type'] => {
    const ext = filename.split('.').pop()?.toLowerCase();
    switch (ext) {
      case 'pdf': return 'pdf';
      case 'docx': return 'docx';
      case 'pptx': return 'ppt';
      default: return 'image';
    }
  };

  const getFileIcon = (type: Document['type']) => {
    switch (type) {
      case 'image': return Image;
      default: return FileText;
    }
  };

  const completedCount = uploadingFiles.filter(f => f.status === 'complete').length;

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        onClick={onClose}
      >
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          onClick={(e) => e.stopPropagation()}
          className="w-full max-w-lg panel-elevated overflow-hidden"
        >
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border">
            <h2 className="text-lg font-semibold text-foreground">Upload Documents</h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="w-4 h-4" />
            </Button>
          </div>

          {/* Dropzone */}
          <div className="p-4">
            <div
              {...getRootProps()}
              className={cn(
                "border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200",
                isDragActive
                  ? "border-primary bg-primary/10"
                  : "border-border hover:border-primary/50 hover:bg-secondary/30"
              )}
            >
              <input {...getInputProps()} />
              <motion.div
                animate={isDragActive ? { scale: 1.05 } : { scale: 1 }}
                className="flex flex-col items-center"
              >
                <div className={cn(
                  "w-16 h-16 rounded-2xl flex items-center justify-center mb-4 transition-colors",
                  isDragActive ? "bg-primary/20" : "bg-secondary"
                )}>
                  <Upload className={cn(
                    "w-8 h-8 transition-colors",
                    isDragActive ? "text-primary" : "text-muted-foreground"
                  )} />
                </div>
                <p className="text-foreground font-medium mb-1">
                  {isDragActive ? 'Drop files here' : 'Drag & drop files here'}
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  or click to browse
                </p>
                <div className="flex flex-wrap justify-center gap-2">
                  {['PDF', 'DOCX', 'PPT', 'Images'].map((type) => (
                    <span
                      key={type}
                      className="text-xs px-2 py-1 rounded-full bg-secondary text-muted-foreground"
                    >
                      {type}
                    </span>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>

          {/* Uploading Files */}
          {uploadingFiles.length > 0 && (
            <div className="px-4 pb-4">
              <div className="text-sm font-medium text-foreground mb-2">
                Uploading {completedCount}/{uploadingFiles.length} files
              </div>
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {uploadingFiles.map((uploadFile, i) => {
                  const FileIcon = getFileIcon(getFileType(uploadFile.file.name));
                  return (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-secondary/50"
                    >
                      <FileIcon className="w-5 h-5 text-muted-foreground shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm text-foreground truncate">
                          {uploadFile.file.name}
                        </p>
                        <div className="mt-1 h-1 bg-secondary rounded-full overflow-hidden">
                          <motion.div
                            className="h-full bg-primary"
                            initial={{ width: 0 }}
                            animate={{ width: `${uploadFile.progress}%` }}
                          />
                        </div>
                      </div>
                      {uploadFile.status === 'complete' ? (
                        <CheckCircle2 className="w-5 h-5 text-success shrink-0" />
                      ) : (
                        <span className="text-xs text-muted-foreground">
                          {Math.round(uploadFile.progress)}%
                        </span>
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex justify-end gap-2 p-4 border-t border-border bg-secondary/20">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              variant="glow"
              onClick={onClose}
              disabled={uploadingFiles.some(f => f.status === 'uploading')}
            >
              Done
            </Button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default UploadModal;
