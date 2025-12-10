import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, ZoomIn, ZoomOut, Highlighter, Loader2 } from 'lucide-react';
import { useStore } from '@/store/useStore';
import { Button } from '@/components/ui/button';
import { useState, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';

// Set up the worker for pdf.js
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

const DocumentViewer = () => {
  const { selectedDocument, currentPage, setCurrentPage } = useStore();
  const [zoom, setZoom] = useState(100);
  const [highlightMode, setHighlightMode] = useState(false);
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageLoading, setPageLoading] = useState(true);
  const [nutrientLoading, setNutrientLoading] = useState(false);
  const nutrientContainerRef = useRef<HTMLDivElement>(null);
  const nutrientInstanceRef = useRef<any>(null);

  // Reset loading state when document or page changes
  useEffect(() => {
    setPageLoading(true);
  }, [selectedDocument?.id, currentPage]);

  // Initialize Nutrient SDK for DOCX/PPT files
  useEffect(() => {
    const isDocxOrPpt = selectedDocument?.type === 'docx' || selectedDocument?.type === 'ppt';

    if (isDocxOrPpt && selectedDocument?.fileData && nutrientContainerRef.current) {
      setNutrientLoading(true);

      // Convert base64 data URL to ArrayBuffer
      const base64Data = selectedDocument.fileData.split(',')[1];
      const binaryString = atob(base64Data);
      const bytes = new Uint8Array(binaryString.length);
      for (let i = 0; i < binaryString.length; i++) {
        bytes[i] = binaryString.charCodeAt(i);
      }
      const arrayBuffer = bytes.buffer;

      // Dynamically import Nutrient SDK
      import('@nutrient-sdk/viewer').then((NutrientViewer) => {
        // Unload previous instance
        if (nutrientInstanceRef.current) {
          NutrientViewer.default.unload(nutrientContainerRef.current!);
        }

        NutrientViewer.default.load({
          container: nutrientContainerRef.current!,
          document: arrayBuffer,
          baseUrl: `${window.location.origin}/nutrient-viewer/`,
        }).then((instance: any) => {
          nutrientInstanceRef.current = instance;
          setNutrientLoading(false);
        }).catch((error: any) => {
          console.error('Nutrient SDK error:', error);
          setNutrientLoading(false);
        });
      });
    }

    // Cleanup on unmount or document change
    return () => {
      if (nutrientInstanceRef.current && nutrientContainerRef.current) {
        import('@nutrient-sdk/viewer').then((NutrientViewer) => {
          NutrientViewer.default.unload(nutrientContainerRef.current!);
          nutrientInstanceRef.current = null;
        });
      }
    };
  }, [selectedDocument?.id, selectedDocument?.type, selectedDocument?.fileData]);

  if (!selectedDocument) {
    return (
      <div className="flex-1 flex items-center justify-center bg-background">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center p-8"
        >
          <div className="w-24 h-24 mx-auto mb-6 rounded-2xl bg-secondary/50 flex items-center justify-center">
            <svg className="w-12 h-12 text-muted-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-foreground mb-2">No Document Selected</h3>
          <p className="text-muted-foreground">Select a document from the sidebar or upload a new one</p>
        </motion.div>
      </div>
    );
  }

  const totalPages = numPages || selectedDocument.pages;
  const isImage = selectedDocument.type === 'image';
  const isPdf = selectedDocument.type === 'pdf';
  const isDocxOrPpt = selectedDocument.type === 'docx' || selectedDocument.type === 'ppt';

  const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
    setNumPages(numPages);
    if (selectedDocument) {
      selectedDocument.pages = numPages;
    }
  };

  const onPageLoadSuccess = () => {
    setPageLoading(false);
  };

  // Render content based on file type
  const renderContent = () => {
    // For images - show the actual image
    if (isImage && selectedDocument.fileData) {
      return (
        <div className="w-full h-full flex items-center justify-center p-4">
          <img
            src={selectedDocument.fileData}
            alt={selectedDocument.name}
            className="max-w-full max-h-full object-contain rounded-lg shadow-lg"
            style={{ transform: `scale(${zoom / 100})`, transformOrigin: 'center' }}
          />
        </div>
      );
    }

    // For PDFs - use react-pdf
    if (isPdf && selectedDocument.fileData) {
      return (
        <div className="w-full h-full flex flex-col items-center justify-start overflow-auto">
          <Document
            file={selectedDocument.fileData}
            onLoadSuccess={onDocumentLoadSuccess}
            loading={
              <div className="flex items-center justify-center p-8">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
                <span className="ml-2 text-muted-foreground">Loading PDF...</span>
              </div>
            }
            error={
              <div className="flex flex-col items-center justify-center p-8 text-destructive">
                <span>Failed to load PDF</span>
              </div>
            }
          >
            <Page
              pageNumber={currentPage}
              scale={zoom / 100}
              onLoadSuccess={onPageLoadSuccess}
              loading={
                <div className="flex items-center justify-center p-8 min-h-[400px]">
                  <Loader2 className="w-6 h-6 animate-spin text-primary" />
                </div>
              }
              className="shadow-lg rounded-lg overflow-hidden"
            />
          </Document>
        </div>
      );
    }

    // For DOCX and PPT - use Nutrient SDK
    if (isDocxOrPpt) {
      return (
        <div className="w-full h-full relative">
          {nutrientLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-background/80 z-10">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
              <span className="ml-2 text-muted-foreground">Loading document...</span>
            </div>
          )}
          <div
            ref={nutrientContainerRef}
            className="w-full h-full min-h-[600px]"
            style={{ backgroundColor: 'white' }}
          />
        </div>
      );
    }

    // Fallback
    return (
      <div className="w-full h-full flex flex-col items-center justify-center p-8">
        <Loader2 className="w-8 h-8 animate-spin text-primary mb-4" />
        <span className="text-muted-foreground">Loading document...</span>
      </div>
    );
  };

  return (
    <div className="flex-1 flex flex-col bg-background overflow-hidden">
      {/* Toolbar */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/50"
      >
        <div className="flex items-center gap-2">
          <h2 className="font-semibold text-foreground truncate max-w-[200px]">
            {selectedDocument.name}
          </h2>
          <span className="text-xs text-muted-foreground px-2 py-1 bg-secondary rounded-full">
            {selectedDocument.type.toUpperCase()}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {!isDocxOrPpt && (
            <>
              <Button variant="ghost" size="icon" onClick={() => setZoom(Math.max(50, zoom - 10))}>
                <ZoomOut className="w-4 h-4" />
              </Button>
              <span className="text-sm text-muted-foreground w-12 text-center">{zoom}%</span>
              <Button variant="ghost" size="icon" onClick={() => setZoom(Math.min(200, zoom + 10))}>
                <ZoomIn className="w-4 h-4" />
              </Button>
            </>
          )}

          {isPdf && (
            <>
              <div className="w-px h-6 bg-border mx-2" />
              <Button
                variant={highlightMode ? "default" : "ghost"}
                size="icon"
                onClick={() => setHighlightMode(!highlightMode)}
              >
                <Highlighter className="w-4 h-4" />
              </Button>
            </>
          )}
        </div>
      </motion.div>

      {/* Document Content */}
      <div className="flex-1 flex overflow-hidden">
        {/* Thumbnails - Only for PDFs */}
        {isPdf && (
          <div className="w-24 border-r border-border bg-card/30 overflow-y-auto p-2 space-y-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <motion.button
                key={i}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: Math.min(i * 0.02, 0.5) }}
                onClick={() => setCurrentPage(i + 1)}
                className={cn(
                  "w-full aspect-[3/4] rounded-lg border-2 transition-all duration-200 overflow-hidden",
                  currentPage === i + 1
                    ? "border-primary bg-primary/10"
                    : "border-transparent bg-secondary/50 hover:bg-secondary"
                )}
              >
                <div className="w-full h-full flex items-center justify-center">
                  <span className="text-xs text-muted-foreground">{i + 1}</span>
                </div>
              </motion.button>
            ))}
          </div>
        )}

        {/* Main Document Area */}
        <div className={cn(
          "flex-1 overflow-auto",
          isImage && "flex items-center justify-center p-4",
          isPdf && "flex items-start justify-center p-6",
          isDocxOrPpt && "p-0"
        )}>
          <AnimatePresence mode="wait">
            <motion.div
              key={`${selectedDocument.id}-${currentPage}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "overflow-hidden",
                isImage && "w-full h-full flex items-center justify-center",
                isPdf && "panel-elevated min-h-[500px] flex items-center justify-center bg-white",
                isDocxOrPpt && "w-full h-full"
              )}
            >
              {renderContent()}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Page Navigation - Only for PDFs */}
      {isPdf && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-center gap-4 py-4 border-t border-border bg-card/50"
        >
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <span className="text-sm text-foreground">
            Page <span className="font-semibold">{currentPage}</span> of <span className="font-semibold">{totalPages}</span>
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </motion.div>
      )}
    </div>
  );
};

export default DocumentViewer;
