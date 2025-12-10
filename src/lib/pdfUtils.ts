import { pdfjs } from 'react-pdf';

// Set up the worker for pdf.js (same as DocumentViewer)
pdfjs.GlobalWorkerOptions.workerSrc = `//unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`;

// Extract text content from a PDF data URL
export async function extractPdfText(pdfDataUrl: string, maxPages: number = 10): Promise<string> {
    try {
        const loadingTask = pdfjs.getDocument(pdfDataUrl);
        const pdf = await loadingTask.promise;

        const numPages = Math.min(pdf.numPages, maxPages); // Limit pages to avoid token limits
        let fullText = '';

        for (let pageNum = 1; pageNum <= numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const textContent = await page.getTextContent();
            const pageText = textContent.items
                .map((item: any) => item.str)
                .join(' ');

            fullText += `\n--- Page ${pageNum} ---\n${pageText}`;
        }

        // Limit text length to avoid token limits (roughly 30k chars = ~7500 tokens)
        if (fullText.length > 30000) {
            fullText = fullText.substring(0, 30000) + '\n\n[Content truncated due to length...]';
        }

        return fullText;
    } catch (error) {
        console.error('Error extracting PDF text:', error);
        throw new Error('Failed to extract text from PDF');
    }
}
