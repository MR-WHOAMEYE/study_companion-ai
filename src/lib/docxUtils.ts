import mammoth from 'mammoth';

export interface DocxConversionResult {
    html: string;
    messages: string[];
}

/**
 * Convert a DOCX file (base64 data URL) to HTML.
 * Preserves formatting, tables, and images.
 */
export async function convertDocxToHtml(base64DataUrl: string): Promise<DocxConversionResult> {
    try {
        // Extract base64 data from data URL
        let base64Data = base64DataUrl;
        if (base64Data.includes(',')) {
            base64Data = base64Data.split(',')[1];
        }

        // Convert base64 to ArrayBuffer
        const binaryString = atob(base64Data);
        const bytes = new Uint8Array(binaryString.length);
        for (let i = 0; i < binaryString.length; i++) {
            bytes[i] = binaryString.charCodeAt(i);
        }
        const arrayBuffer = bytes.buffer;

        // Convert DOCX to HTML using mammoth
        const result = await mammoth.convertToHtml(
            { arrayBuffer },
            {
                // Convert images to base64 data URLs
                convertImage: mammoth.images.imgElement(function (image) {
                    return image.read("base64").then(function (imageBuffer) {
                        return {
                            src: `data:${image.contentType};base64,${imageBuffer}`
                        };
                    });
                })
            }
        );

        return {
            html: result.value,
            messages: result.messages.map(m => m.message)
        };
    } catch (error) {
        console.error('DOCX conversion error:', error);
        throw new Error(`Failed to convert DOCX: ${error}`);
    }
}

/**
 * Extract styles for the rendered HTML content
 */
export function getDocxStyles(): string {
    return `
    .docx-content {
      font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
      font-size: 14px;
      line-height: 1.6;
      color: #000000;
    }
    .docx-content h1 { font-size: 2em; font-weight: bold; margin: 0.67em 0; color: #000000; }
    .docx-content h2 { font-size: 1.5em; font-weight: bold; margin: 0.75em 0; color: #000000; }
    .docx-content h3 { font-size: 1.17em; font-weight: bold; margin: 0.83em 0; color: #000000; }
    .docx-content h4 { font-size: 1em; font-weight: bold; margin: 1.12em 0; color: #000000; }
    .docx-content p { margin: 0.5em 0; color: #000000; }
    .docx-content table {
      border-collapse: collapse;
      width: 100%;
      margin: 1em 0;
    }
    .docx-content th, .docx-content td {
      border: 1px solid #cccccc;
      padding: 8px 12px;
      text-align: left;
      color: #000000;
    }
    .docx-content th {
      background-color: #f5f5f5;
      font-weight: bold;
    }
    .docx-content tr:nth-child(even) {
      background-color: #fafafa;
    }
    .docx-content img {
      max-width: 100%;
      height: auto;
      margin: 1em 0;
      border-radius: 4px;
    }
    .docx-content ul, .docx-content ol {
      margin: 0.5em 0;
      padding-left: 2em;
      color: #000000;
    }
    .docx-content li { margin: 0.25em 0; color: #000000; }
    .docx-content strong, .docx-content b { font-weight: bold; color: #000000; }
    .docx-content em, .docx-content i { font-style: italic; }
    .docx-content u { text-decoration: underline; }
    .docx-content a { color: #0066cc; text-decoration: underline; }
    .docx-content span { color: #000000; }
  `;
}

