import React, { useState } from 'react';
import { uploadPaper } from '../api/papers';
import { useAuth } from '../context/AuthContext';

const UploadPaperForm = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!user) {
      setError('You must be logged in to upload papers');
      return;
    }
    
    if (!file) {
      setError('Please select a PDF file');
      return;
    }
    
    try {
      setSubmitting(true);
      setError('');
      
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('pdf', file);
      
      await uploadPaper(formData, user.token);
      
      setSuccess('Paper uploaded successfully!');
      // Clear form
      setTitle('');
      setDescription('');
      setFile(null);
    } catch (err) {
      setError(err.message || 'Failed to upload paper');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="upload-paper-page">
      <div className="upload-form">
        <h2>📚 Publish Research Paper</h2>
        <p className="text-center text-muted mb-3">Share your research with the global academic community</p>
        {success && <div className="success">{success}</div>}
        {error && <div className="error">{error}</div>}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Paper Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter the title of your research paper"
              required
              disabled={submitting}
            />
          </div>
          <div className="form-group">
            <label>Abstract / Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows="4"
              placeholder="Provide a brief abstract or description of your research..."
              disabled={submitting}
            />
          </div>
          <div className="form-group">
            <label>PDF Document</label>
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              required
              disabled={submitting}
            />
            <small className="text-muted">Please upload a PDF file (max 5MB)</small>
          </div>
          <button type="submit" className="btn btn-primary" disabled={submitting}>
            {submitting ? '⏳ Publishing...' : '📤 Publish Paper'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadPaperForm;