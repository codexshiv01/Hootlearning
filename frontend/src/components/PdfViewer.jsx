import React, { useState, useEffect } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import 'react-pdf/dist/Page/AnnotationLayer.css';
import 'react-pdf/dist/Page/TextLayer.css';
import './PdfViewer.css';

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString();

const PdfViewer = ({ documentData }) => {
  const [numPages, setNumPages] = useState(null);
  const [pageWidth, setPageWidth] = useState(
    window.innerWidth > 800 ? 800 : window.innerWidth - 20
  );

  useEffect(() => {
    const handleResize = () => {
      setPageWidth(window.innerWidth > 800 ? 800 : window.innerWidth - 20);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleScrollToPage = (pageNumber) => {
    const el = document.getElementById(`pdf-page-${pageNumber}`);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="pdf-reader-container">
      <Document 
        file={documentData.fileUrl} 
          onLoadSuccess={({ numPages }) => setNumPages(numPages)}
          loading={<div className="pdf-loading">Loading Document... 📄</div>}
          className="pdf-document-wrapper"
        >
          <div className="pdf-reader-layout">
            {/* Left Sidebar (Thumbnails) */}
            <div className="pdf-sidebar">
              {Array.from(new Array(numPages), (el, index) => (
                <div 
                  key={`thumb-${index}`} 
                  className="pdf-thumb-wrapper" 
                  onClick={() => handleScrollToPage(index + 1)}
                >
                  <Page 
                    pageNumber={index + 1} 
                    width={100} 
                    renderTextLayer={false} 
                    renderAnnotationLayer={false} 
                    className="pdf-thumb-page"
                  />
                  <span className="pdf-thumb-number">{index + 1}</span>
                </div>
              ))}
            </div>
            
            {/* Main Reading Area (Continuous Scroll) */}
            <div className="pdf-main-view">
              {Array.from(new Array(numPages), (el, index) => (
                <div 
                  key={`page-${index}`} 
                  id={`pdf-page-${index + 1}`} 
                  className="pdf-full-page"
                >
                  <Page 
                    pageNumber={index + 1} 
                    width={pageWidth} 
                    renderTextLayer={false} 
                    renderAnnotationLayer={false} 
                    className="pdf-main-page"
                  />
                  <div className="pdf-page-divider" />
                </div>
              ))}
            </div>
          </div>
        </Document>
    </div>
  );
};

export default PdfViewer;
