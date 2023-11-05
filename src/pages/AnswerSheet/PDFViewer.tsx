// import React, { useState } from 'react';
// import { Document, Page, pdfjs } from 'react-pdf';

// // Import the worker file
// pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

// interface PDFViewerProps {
//   pdfUrl: string;
// }

// const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
//   const [numPages, setNumPages] = useState<number | null>(null);

//   const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
//     setNumPages(numPages);
//   };

//   return (
//     <div>
//       <Document file={pdfUrl} onLoadSuccess={onDocumentLoadSuccess}>
//         {Array.from(new Array(numPages || 0), (el, index) => (
//           <Page key={`page_${index + 1}`} pageNumber={index + 1} />
//         ))}
//       </Document>
//     </div>
//   );
// };

// export default PDFViewer;

import React, { useState } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';

const PdfViewer: React.FC = () => {
  const [numPages, setNumPages] = useState<number | null>(null);
  const [pageNumber, setPageNumber] = useState<number>(1);

  // Replace 'YOUR_GOOGLE_DRIVE_SHARED_PDF_LINK' with the shared link of your PDF file
  const pdfFile: string = 'https://www.africau.edu/images/default/sample.pdf';

  // Enable pdfjs worker
  pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`;

  function onDocumentLoadSuccess({ numPages }: { numPages: number }): void {
    setNumPages(numPages);
  }

  return (
    <div>
      <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
        <Page pageNumber={pageNumber} />
      </Document>
      <p>
        Page {pageNumber} of {numPages}
      </p>
    </div>
  );
};

export default PdfViewer;
