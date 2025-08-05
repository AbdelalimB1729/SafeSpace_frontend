import React from 'react';
import { useParams } from 'react-router-dom';
import PaperDetail from '../components/PaperDetail';

const PaperDetailPage = () => {
  const { id } = useParams();

  return (
    <div className="paper-detail-page">
      <PaperDetail paperId={id} />
    </div>
  );
};

export default PaperDetailPage;