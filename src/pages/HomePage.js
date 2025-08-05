import React from 'react';
import { Link } from 'react-router-dom';
import BlogList from '../components/BlogList';
import PaperList from '../components/PaperList';

const HomePage = () => {
  return (
    <div className="home-page">
      <section className="hero">
        <h1>Welcome to MySafeSpace</h1>
        <p className="lead">My personal corner of the internet where I share my research journey, thoughts, and discoveries as a student. Come explore and maybe learn something cool along the way! 🎓✨</p>
        <div className="hero-actions" style={{ marginTop: '2rem', display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/papers" className="btn btn-primary">Check Out My Papers</Link>
          <Link to="/blogs" className="btn btn-outline">Read My Thoughts</Link>
        </div>
      </section>
      
      <section className="featured-content">
        <div className="section-header">
          <h2>My Latest Thoughts</h2>
          <Link to="/blogs" className="btn btn-outline">Read All Posts</Link>
        </div>
        <BlogList limit={3} />
      </section>
      
      <section className="featured-papers">
        <div className="section-header">
          <h2>My Recent Work</h2>
          <Link to="/papers" className="btn btn-outline">See All Papers</Link>
        </div>
        <PaperList limit={3} />
      </section>
      
      <section className="platform-stats">
        <div className="card text-center">
          <h3>What Makes This Space Special? 🌟</h3>
          <p className="text-muted">MySafeSpace is my personal digital home where I share what I'm passionate about - research, learning, and the amazing journey of being a student. It's casual, it's genuine, and it's all about growing together!</p>
          <div className="stats-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginTop: '2rem' }}>
            <div>
              <h4 style={{ color: 'var(--secondary-color)', marginBottom: '0.5rem' }}>📚 Student Perspective</h4>
              <p style={{ margin: 0, fontSize: '0.875rem' }}>Real thoughts from a real student's academic journey</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--secondary-color)', marginBottom: '0.5rem' }}>🤝 Learning Together</h4>
              <p style={{ margin: 0, fontSize: '0.875rem' }}>We're all figuring this out - let's help each other!</p>
            </div>
            <div>
              <h4 style={{ color: 'var(--secondary-color)', marginBottom: '0.5rem' }}>💡 Fun with Knowledge</h4>
              <p style={{ margin: 0, fontSize: '0.875rem' }}>Making academia approachable and enjoyable</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;