import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import BlogDetail from '../components/BlogDetail';
import CommentForm from '../components/CommentForm';
import CommentList from '../components/CommentList';
import { getBlogById } from '../api/blogs';

const BlogDetailPage = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(id);
        setBlog(data);
      } catch (err) {
        setError(err.message || 'Failed to load blog');
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlog();
  }, [id]);

  if (loading) return <div className="loading">Loading blog...</div>;
  if (error) return <div className="error">Error: {error}</div>;
  if (!blog) return <div>Blog not found</div>;

  return (
    <div className="blog-detail-page">
      <BlogDetail blog={blog} />
      
      <div className="comments-section">
        <h2>Comments</h2>
        <CommentForm targetType="Blog" targetId={id} />
        <CommentList targetType="Blog" targetId={id} />
      </div>
    </div>
  );
};

export default BlogDetailPage;