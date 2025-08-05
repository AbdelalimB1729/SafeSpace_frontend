import React from 'react';
import { Link } from 'react-router-dom';
import BlogList from '../components/BlogList';
import PaperList from '../components/PaperList';

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <h1>Welcome to MySafeSpace</h1>
        <p className="lead">Your trusted platform for sharing research papers, academic insights, and scholarly discussions. Connect with fellow researchers and contribute to the global knowledge community.</p>
        <div className="hero-actions" style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/papers" className="btn btn-primary">Explore Papers</Link>
          <Link to="/blogs" className="btn btn-outline">Read Blogs</Link>
        </div>
      </section>
      
      <section className="featured-content">
        <div className="section-header">
          <h2>Latest Research Insights</h2>
          <Link to="/blogs" className="btn btn-outline">View All Blogs</Link>
        </div>
        <BlogList limit={3} />
      </section>
      
      <section className="featured-papers">
        <div className="section-header">
          <h2>Recent Publications</h2>
          <Link to="/papers" className="btn btn-outline">Browse All Papers</Link>
        </div>
        <PaperList limit={3} />
      </section>
      
      <section className="platform-stats">
        <div className="card text-center">
          <h3>Join Our Research Community</h3>
          <p className="text-muted">MySafeSpace provides a secure and collaborative environment for researchers worldwide to share knowledge, discuss findings, and advance scientific understanding.</p>
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
            <div>
              <h4 style={{ color: 'var(--secondary-color)', marginBottom: '0.5rem' }}>Secure Platform</h4>
              <p style={{ margin: 0, fontSize: '0.875rem' }}>Protected environment for academic collaboration</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--secondary-color)', marginBottom: '0.5rem' }}>Global Community</h4>
              <p style={{ margin: 0, fontSize: '0.875rem' }}>Connect with researchers worldwide</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--secondary-color)', marginBottom: '0.5rem' }}>Knowledge Sharing</h4>
              <p style={{ margin: 0, fontSize: '0.875rem' }}>Share insights and discoveries</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;