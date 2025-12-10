import { useState } from 'react';
import { motion } from 'framer-motion';
import Sidebar from '@/components/layout/Sidebar';
import DocumentViewer from '@/components/layout/DocumentViewer';
import RightPanel from '@/components/layout/RightPanel';
import UploadModal from '@/components/upload/UploadModal';
import { useStore } from '@/store/useStore';

const Index = () => {
  const [isUploadOpen, setIsUploadOpen] = useState(false);
  const { selectedDocument } = useStore();

  return (
    <>
      <div className="flex h-screen overflow-hidden bg-background">
        {/* Sidebar */}
        <Sidebar onUploadClick={() => setIsUploadOpen(true)} />

        {/* Main Content */}
        <main className="flex-1 flex overflow-hidden">
          <DocumentViewer />
          {selectedDocument && <RightPanel />}
        </main>

        {/* Background Glow Effect */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{
              opacity: [0.3, 0.5, 0.3],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="absolute -top-1/2 -left-1/2 w-full h-full"
            style={{
              background: 'radial-gradient(ellipse at center, hsl(174 72% 56% / 0.08) 0%, transparent 50%)',
            }}
          />
          <motion.div
            animate={{
              opacity: [0.2, 0.4, 0.2],
              scale: [1, 1.15, 1],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: 'easeInOut',
              delay: 2,
            }}
            className="absolute -bottom-1/2 -right-1/2 w-full h-full"
            style={{
              background: 'radial-gradient(ellipse at center, hsl(262 83% 68% / 0.06) 0%, transparent 50%)',
            }}
          />
        </div>
      </div>

      {/* Upload Modal */}
      <UploadModal isOpen={isUploadOpen} onClose={() => setIsUploadOpen(false)} />
    </>
  );
};

export default Index;
