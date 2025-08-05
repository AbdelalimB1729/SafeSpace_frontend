import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getPapers, downloadPaper, getPaperViewUrl, deletePaper } from '../api/papers';
import { useAuth } from '../context/AuthContext';
import CommentForm from './CommentForm';
import CommentList from './CommentList';
import PdfViewer from './PdfViewer';
import AlertModal from './AlertModal';
import './PaperActions.css';

const PaperDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [paper, setPaper] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [downloadLoading, setDownloadLoading] = useState(false);
  const [downloadError, setDownloadError] = useState('');
  const [showPdfViewer, setShowPdfViewer] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [alertModal, setAlertModal] = useState({ isOpen: false });
  const { user } = useAuth();

  useEffect(() => {
    const fetchPaper = async () => {
      try {
        // Fetch all papers and find the matching one by ID
        const papers = await getPapers();
        const foundPaper = papers.find(p => p._id === id);
        
        if (foundPaper) {
          setPaper(foundPaper);
        } else {
          setError('Paper not found');
        }
      } catch (err) {
        setError(err.message || 'Failed to load paper details');
      } finally {
        setLoading(false);
      }
    };
    
    fetchPaper();
  }, [id]);

  const handleDownload = async () => {
    if (!paper) return;
    
    try {
      setDownloadLoading(true);
      setDownloadError('');
      
      const response = await downloadPaper(id);
      
      // Create a blob URL for the PDF
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', paper.filename);
      document.body.appendChild(link);
      link.click();
      link.remove();
      
      // Clean up the URL object
      window.URL.revokeObjectURL(url);
    } catch (err) {
      setDownloadError(err.message || 'Failed to download paper');
    } finally {
      setDownloadLoading(false);
    }
  };

  const handleViewPdf = () => {
    setShowPdfViewer(true);
  };

  const handleClosePdfViewer = () => {
    setShowPdfViewer(false);
  };

  const handleDeletePaper = () => {
    if (!user || user.role !== 'admin') {
      setAlertModal({
        isOpen: true,
        type: 'error',
        title: 'Access Denied',
        message: 'You must be an admin to delete papers.',
        confirmText: 'OK'
      });
      return;
    }

    setAlertModal({
      isOpen: true,
      type: 'danger',
      title: 'Delete Paper',
      message: `Are you sure you want to delete "${paper.title}"? This action cannot be undone and will also delete all associated comments.`,
      confirmText: 'Delete Paper',
      cancelText: 'Cancel',
      showCancel: true,
      onConfirm: confirmDeletePaper
    });
  };

  const confirmDeletePaper = async () => {
    try {
      setDeleteLoading(true);
      setAlertModal({ isOpen: false });
      await deletePaper(paper._id, user.token);
      
      setAlertModal({
        isOpen: true,
        type: 'success',
        title: 'Paper Deleted',
        message: 'The paper has been successfully deleted.',
        confirmText: 'OK',
        onConfirm: () => navigate('/papers')
      });
    } catch (error) {
      setAlertModal({
        isOpen: true,
        type: 'error',
        title: 'Deletion Failed',
        message: error.message || 'Failed to delete paper. Please try again.',
        confirmText: 'OK'
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  const closeAlertModal = () => {
    setAlertModal({ isOpen: false });
  };

  if (loading) return <div className="loading">Loading paper details...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!paper) return <div>Paper not found</div>;

  return (
    <div className="paper-detail">
      <div className="card">
        <div className="paper-header">
          <h1>{paper.title}</h1>
          <div className="blog-meta">
            <span>Uploaded by <strong>{paper.uploader?.username || 'Unknown Author'}</strong></span>
            <span>•</span>
            <span>{new Date(paper.createdAt).toLocaleDateString('en-US', { 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric' 
            })}</span>
            <span>•</span>
            <span>Research Paper</span>
          </div>
        </div>
        
        <div className="paper-description">
          <h3>Abstract</h3>
          <p>{paper.description || 'No description available for this research paper.'}</p>
        </div>
        
        <div className="paper-actions-container">
          <div className="action-buttons">
            <button 
              onClick={handleViewPdf}
              className="btn btn-primary"
              title="View PDF in browser"
            >
              📖 View PDF
            </button>
            <button 
              onClick={handleDownload} 
              disabled={downloadLoading}
              className="btn btn-secondary"
              title="Download PDF file"
            >
              {downloadLoading ? '⏳ Downloading...' : '📥 Download PDF'}
            </button>
          </div>
          
          {user && user.role === 'admin' && (
            <div className="admin-actions">
              <button 
                onClick={handleDeletePaper}
                disabled={deleteLoading}
                className="delete-paper-btn"
                title="Permanently delete this research paper and all associated data"
              >
                <span className="delete-icon">🗑️</span>
                {deleteLoading ? 'Deleting...' : 'Delete Paper'}
              </button>
            </div>
          )}
        </div>
        
        {downloadError && <div className="error">{downloadError}</div>}
      </div>
      
      <div className="comments-section">
        <h2>Discussion & Comments</h2>
        <CommentForm targetType="Paper" targetId={paper._id} />
        <CommentList targetType="Paper" targetId={paper._id} />
      </div>

      <PdfViewer
        isOpen={showPdfViewer}
        onClose={handleClosePdfViewer}
        pdfUrl={getPaperViewUrl(paper._id)}
        paperTitle={paper.title}
      />

      <AlertModal
        isOpen={alertModal.isOpen}
        onClose={closeAlertModal}
        title={alertModal.title}
        message={alertModal.message}
        type={alertModal.type}
        onConfirm={alertModal.onConfirm}
        confirmText={alertModal.confirmText}
        cancelText={alertModal.cancelText}
        showCancel={alertModal.showCancel}
      />
    </div>
  );
};

export default PaperDetail;