import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { createComment } from '../api/comments';

const CommentForm = ({ targetType, targetId, onCommentAdded }) => {
  const [content, setContent] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const { user } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!user) {
      setError('You must be logged in to comment');
      return;
    }
    
    try {
      setSubmitting(true);
      await createComment(
        { content, targetType, targetId },
        user.token
      );
      setContent('');
      setError('');
      if (onCommentAdded) onCommentAdded();
    } catch (err) {
      setError(err.message || 'Failed to post comment');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="comment-form">
      <form onSubmit={handleSubmit}>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Add your comment..."
          rows="3"
          required
          disabled={submitting}
        />
        {error && <div className="error">{error}</div>}
        <button 
          type="submit" 
          disabled={submitting}
          className="btn btn-primary"
        >
          {submitting ? '⏳ Posting...' : '💬 Post Comment'}
        </button>
      </form>
    </div>
  );
};

export default CommentForm;