import React from 'react';
import './PdfViewer.css';

const PdfViewer = ({ isOpen, onClose, pdfUrl, paperTitle }) => {
  if (!isOpen) return null;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className="pdf-viewer-overlay" onClick={handleBackdropClick}>
      <div className="pdf-viewer-modal">
        <div className="pdf-viewer-header">
          <h3>{paperTitle}</h3>
          <button className="close-button" onClick={onClose}>
            ×
          </button>
        </div>
        <div className="pdf-viewer-content">
          <iframe
            src={pdfUrl}
            title={paperTitle}
            width="100%"
            height="100%"
            style={{ border: 'none' }}
          />
        </div>
      </div>
    </div>
  );
};

export default PdfViewer;