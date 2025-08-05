import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getPapers } from '../api/papers';
import './PaperActions.css';

const PaperList = () => {
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPapers = async () => {
      try {
        const data = await getPapers();
        setPapers(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchPapers();
  }, []);

  if (loading) return <div>Loading papers...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="paper-list">
      <h2>Research Papers</h2>
      {papers.length === 0 ? (
        <p>No papers available</p>
      ) : (
        papers.map(paper => (
          <div key={paper._id} className="paper-item">
            <h3>
              <Link to={`/papers/${paper._id}`}>{paper.title}</Link>
            </h3>
            <p>By: {paper.uploader?.username || 'Unknown'}</p>
            <p>{paper.description}</p>
            <div className="paper-actions">
              <Link to={`/papers/${paper._id}`} className="view-link">
                📖 View Details
              </Link>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default PaperList;