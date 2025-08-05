import React from 'react';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="page-header">
        <h1>About MySafeSpace</h1>
        <p className="lead">My personal digital corner where I share my research journey and thoughts 📚✨</p>
      </div>

      <div className="about-content">
        <section className="card">
          <h2>What is MySafeSpace?</h2>
          <p>
            Hi there! 👋 MySafeSpace is my personal platform where I share my research papers, academic thoughts, 
            and learning journey as a student. Think of it as my digital portfolio mixed with a personal blog - 
            a space where I can document my academic adventures and maybe help fellow students along the way!
          </p>
          <p>
            I created this space because I believe sharing knowledge should be fun and accessible. Whether it's 
            a research paper I'm proud of or just some thoughts about my studies, this is where I put it all out 
            there for anyone interested in learning or connecting.
          </p>
        </section>

        <section className="card">
          <h2>Why I Built This</h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem', marginTop: '1.5rem' }}>
            <div>
              <h3 style={{ color: 'var(--secondary-color)', marginBottom: '1rem' }}>🎯 Personal Growth</h3>
              <p>
                I wanted a place to track my academic journey, share my progress, and reflect on what I'm learning. 
                It's like a digital diary of my educational adventure!
              </p>
            </div>
            <div>
              <h3 style={{ color: 'var(--secondary-color)', marginBottom: '1rem' }}>🤝 Sharing is Caring</h3>
              <p>
                Why keep all the cool stuff I discover to myself? I love sharing interesting research and 
                insights with fellow students and anyone curious about learning.
              </p>
            </div>
            <div>
              <h3 style={{ color: 'var(--secondary-color)', marginBottom: '1rem' }}>💡 Learning by Teaching</h3>
              <p>
                They say the best way to learn is to teach. By writing about my research and studies, 
                I deepen my own understanding while hopefully helping others too!
              </p>
            </div>
            <div>
              <h3 style={{ color: 'var(--secondary-color)', marginBottom: '1rem' }}>🌟 Fun with Academia</h3>
              <p>
                Research doesn't have to be boring! I try to make learning fun and approachable. 
                Academic work can be serious but still enjoyable and engaging.
              </p>
            </div>
          </div>
        </section>

        <section className="card">
          <h2>What You'll Find Here</h2>
          <div className="features-list" style={{ marginTop: '1.5rem' }}>
            <div className="feature-item" style={{ marginBottom: '1.5rem', paddingLeft: '2rem', position: 'relative' }}>
              <div style={{ position: 'absolute', left: '0', top: '0.2rem', fontSize: '1.25rem' }}>📄</div>
              <h4 style={{ marginBottom: '0.5rem' }}>My Research Papers</h4>
              <p>The papers I've worked on and want to share with the world. Some are class projects, others are personal research - all are things I'm excited about!</p>
            </div>
            
            <div className="feature-item" style={{ marginBottom: '1.5rem', paddingLeft: '2rem', position: 'relative' }}>
              <div style={{ position: 'absolute', left: '0', top: '0.2rem', fontSize: '1.25rem' }}>✍️</div>
              <h4 style={{ marginBottom: '0.5rem' }}>Study Blogs & Thoughts</h4>
              <p>Random thoughts about my studies, cool things I've learned, study tips, and maybe some academic rants. It's like a study diary but more fun!</p>
            </div>
            
            <div className="feature-item" style={{ marginBottom: '1.5rem', paddingLeft: '2rem', position: 'relative' }}>
              <div style={{ position: 'absolute', left: '0', top: '0.2rem', fontSize: '1.25rem' }}>💭</div>
              <h4 style={{ marginBottom: '0.5rem' }}>Learning Journey</h4>
              <p>Follow along as I navigate through my academic path. The struggles, the "aha!" moments, and everything in between.</p>
            </div>
            
            <div className="feature-item" style={{ marginBottom: '1.5rem', paddingLeft: '2rem', position: 'relative' }}>
              <div style={{ position: 'absolute', left: '0', top: '0.2rem', fontSize: '1.25rem' }}>🌱</div>
              <h4 style={{ marginBottom: '0.5rem' }}>Growing Together</h4>
              <p>This space grows with me as I learn. Today it might be basic, but who knows what cool stuff I'll add tomorrow!</p>
            </div>
          </div>
        </section>

        <section className="card">
          <h2>The Vibe Here</h2>
          <p>
            MySafeSpace is all about being genuine and approachable. I'm not trying to be the most formal 
            academic platform out there - I'm just a student sharing what I love. If you find something 
            helpful or interesting, awesome! If you want to chat about research or studies, even better!
          </p>
          <p>
            This is a judgment-free zone where learning is celebrated, questions are encouraged, and 
            everyone's academic journey is respected. Whether you're a fellow student, curious learner, 
            or just someone who stumbled upon this space - welcome! 🎉
          </p>
          
          <div style={{ 
            background: 'var(--bg-tertiary)', 
            padding: '2rem', 
            borderRadius: 'var(--border-radius)', 
            marginTop: '2rem',
            textAlign: 'center'
          }}>
            <h3 style={{ color: 'var(--primary-color)', marginBottom: '1rem' }}>Want to Connect?</h3>
            <p style={{ marginBottom: '1.5rem' }}>
              Feel free to explore, comment on posts, or reach out if you want to chat about research, studies, or just say hi!
            </p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <a href="/register" className="btn btn-primary">Join the Fun</a>
              <a href="/contact" className="btn btn-outline">Say Hello</a>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutPage;