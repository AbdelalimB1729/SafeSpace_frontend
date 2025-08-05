import React from 'react';
import { useNavigate } from 'react-router-dom';
import UploadPaperForm from '../components/UploadPaperForm';
import { useAuth } from '../context/AuthContext';

const UploadPaperPage = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  // Redirect non-admins
  if (!user || user.role !== 'admin') {
    navigate('/papers');
    return null;
  }

  return (
    <div className="upload-paper-page">
      <h1>Upload Research Paper</h1>
      <UploadPaperForm onSuccess={() => navigate('/papers')} />
    </div>
  );
};

export default UploadPaperPage;