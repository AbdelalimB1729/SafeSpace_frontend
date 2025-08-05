import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getBlogs } from '../api/blogs';

const BlogList = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const data = await getBlogs();
        setBlogs(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlogs();
  }, []);

  if (loading) return <div>Loading blogs...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="blog-list">
      {blogs.length === 0 ? (
        <div className="card text-center">
          <h3>No blogs found</h3>
          <p className="text-muted">Be the first to publish a research blog!</p>
        </div>
      ) : (
        blogs.map(blog => (
          <article key={blog._id} className="blog-item">
            <h3>
              <Link to={`/blogs/${blog._id}`}>{blog.title}</Link>
            </h3>
            
            <div className="blog-meta">
              <span>By <strong>{blog.author?.username || 'Unknown Author'}</strong></span>
              <span>•</span>
              <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { 
                month: 'short', 
                day: 'numeric', 
                year: 'numeric' 
              })}</span>
              <span>•</span>
              <span>{Math.ceil(blog.content.length / 1000)} min read</span>
            </div>
            
            <div className="blog-content">
              <p>{blog.content.substring(0, 200)}...</p>
            </div>
            
            <div className="blog-actions">
              <Link to={`/blogs/${blog._id}`} className="btn btn-outline">
                Read Full Article
              </Link>
            </div>
          </article>
        ))
      )}
    </div>
  );
};

export default BlogList;