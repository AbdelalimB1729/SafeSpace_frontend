import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { createBlog } from '../api/blogs';
import { useAuth } from '../context/AuthContext';

const CreateBlogPage = () => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!title || !content) {
      setError('Please fill all fields');
      return;
    }
    
    try {
      setSubmitting(true);
      await createBlog({ title, content }, user.token);
      navigate('/blogs');
    } catch (err) {
      setError(err.message || 'Failed to create blog');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="create-blog-page">
      <h1>Create New Blog Post</h1>
      
      {error && <div className="error">{error}</div>}
      
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            required
            disabled={submitting}
          />
        </div>
        
        <div className="form-group">
          <label>Content</label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your blog content"
            rows={10}
            required
            disabled={submitting}
          />
        </div>
        
        <button 
          type="submit" 
          disabled={submitting}
          className="btn btn-primary"
        >
          {submitting ? '⏳ Publishing...' : '📝 Publish Blog'}
        </button>
      </form>
    </div>
  );
};

export default CreateBlogPage;