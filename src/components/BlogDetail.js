import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBlogById, deleteBlog } from '../api/blogs';
import { useAuth } from '../context/AuthContext';
import AlertModal from './AlertModal';

const BlogDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [alertModal, setAlertModal] = useState({ isOpen: false });
  const { user } = useAuth();

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const data = await getBlogById(id);
        setBlog(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchBlog();
  }, [id]);

  const handleDeleteBlog = () => {
    if (!user || user.role !== 'admin') {
      setAlertModal({
        isOpen: true,
        type: 'error',
        title: 'Access Denied',
        message: 'You must be an admin to delete blogs.',
        confirmText: 'OK'
      });
      return;
    }

    setAlertModal({
      isOpen: true,
      type: 'danger',
      title: 'Delete Blog',
      message: `Are you sure you want to delete "${blog.title}"? This action cannot be undone and will also delete all associated comments.`,
      confirmText: 'Delete Blog',
      cancelText: 'Cancel',
      showCancel: true,
      onConfirm: confirmDeleteBlog
    });
  };

  const confirmDeleteBlog = async () => {
    try {
      setDeleteLoading(true);
      setAlertModal({ isOpen: false });
      await deleteBlog(blog._id, user.token);
      
      setAlertModal({
        isOpen: true,
        type: 'success',
        title: 'Blog Deleted',
        message: 'The blog has been successfully deleted.',
        confirmText: 'OK',
        onConfirm: () => navigate('/blogs')
      });
    } catch (error) {
      setAlertModal({
        isOpen: true,
        type: 'error',
        title: 'Deletion Failed',
        message: error.message || 'Failed to delete blog. Please try again.',
        confirmText: 'OK'
      });
    } finally {
      setDeleteLoading(false);
    }
  };

  const closeAlertModal = () => {
    setAlertModal({ isOpen: false });
  };

  if (loading) return <div>Loading blog...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!blog) return <div>Blog not found</div>;

  return (
    <div className="blog-detail">
      <div className="card">
        <div className="card-header">
          <div>
            <h1 className="card-title">{blog.title}</h1>
            <div className="blog-meta">
              <span>By <strong>{blog.author?.username || 'Unknown Author'}</strong></span>
              <span>•</span>
              <span>{new Date(blog.createdAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
              <span>•</span>
              <span>{Math.ceil(blog.content.length / 1000)} min read</span>
            </div>
          </div>
          {user && user.role === 'admin' && (
            <div className="action-buttons">
              <button 
                onClick={handleDeleteBlog}
                disabled={deleteLoading}
                className="action-btn danger"
                title="Delete this blog post permanently"
              >
                {deleteLoading ? '⏳ Deleting...' : '🗑️ Delete Blog'}
              </button>
            </div>
          )}
        </div>
        
        <div className="blog-content">
          {blog.content.split('\n').map((paragraph, index) => {
            if (paragraph.trim() === '') return null;
            
            // Handle headings
            if (paragraph.startsWith('# ')) {
              return <h2 key={index}>{paragraph.substring(2)}</h2>;
            }
            if (paragraph.startsWith('## ')) {
              return <h3 key={index}>{paragraph.substring(3)}</h3>;
            }
            if (paragraph.startsWith('### ')) {
              return <h4 key={index}>{paragraph.substring(4)}</h4>;
            }
            
            // Handle quotes
            if (paragraph.startsWith('> ')) {
              return (
                <blockquote key={index}>
                  {paragraph.substring(2)}
                </blockquote>
              );
            }
            
            // Handle regular paragraphs
            return <p key={index}>{paragraph}</p>;
          })}
        </div>
      </div>

      <AlertModal
        isOpen={alertModal.isOpen}
        onClose={closeAlertModal}
        title={alertModal.title}
        message={alertModal.message}
        type={alertModal.type}
        onConfirm={alertModal.onConfirm}
        confirmText={alertModal.confirmText}
        cancelText={alertModal.cancelText}
        showCancel={alertModal.showCancel}
      />
    </div>
  );
};

export default BlogDetail;