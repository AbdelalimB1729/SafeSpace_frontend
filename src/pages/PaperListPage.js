import React from 'react';
import PaperList from '../components/PaperList';
import EnhancedButton from '../components/EnhancedButton';
import { useAuth } from '../context/AuthContext';

const PaperListPage = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <div className="paper-list-page">
      <div className="page-header">
        <h1>Research Papers</h1>
        {isAdmin && (
          <EnhancedButton 
            to="/papers/upload" 
            variant="upload" 
            icon="📤"
          >
            Upload New Paper
          </EnhancedButton>
        )}
      </div>
      <PaperList />
    </div>
  );
};

export default PaperListPage;