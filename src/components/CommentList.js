import React, { useEffect, useState } from 'react';
import { getComments, deleteComment } from '../api/comments';
import { useAuth } from '../context/AuthContext';
import AlertModal from './AlertModal';

const CommentList = ({ targetType, targetId }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [deletingComments, setDeletingComments] = useState(new Set());
  const [alertModal, setAlertModal] = useState({ isOpen: false });
  const [commentToDelete, setCommentToDelete] = useState(null);
  const { user } = useAuth();

  useEffect(() => {
    const fetchComments = async () => {
      try {
        const data = await getComments(targetType, targetId);
        setComments(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    
    fetchComments();
  }, [targetType, targetId]);

  const handleDeleteComment = (commentId) => {
    if (!user || user.role !== 'admin') {
      setAlertModal({
        isOpen: true,
        type: 'error',
        title: 'Access Denied',
        message: 'You must be an admin to delete comments.',
        confirmText: 'OK'
      });
      return;
    }

    setCommentToDelete(commentId);
    setAlertModal({
      isOpen: true,
      type: 'danger',
      title: 'Delete Comment',
      message: 'Are you sure you want to delete this comment? This action cannot be undone.',
      confirmText: 'Delete Comment',
      cancelText: 'Cancel',
      showCancel: true,
      onConfirm: confirmDeleteComment
    });
  };

  const confirmDeleteComment = async () => {
    const commentId = commentToDelete;
    
    // Early validation
    if (!commentId || commentId === 'null' || commentId === null) {
      setAlertModal({
        isOpen: true,
        type: 'error',
        title: 'Invalid Comment',
        message: 'Cannot delete comment: Invalid comment ID.',
        confirmText: 'OK',
        onConfirm: closeAlertModal
      });
      return;
    }
    
    try {
      setDeletingComments(prev => new Set([...prev, commentId]));
      setAlertModal({ isOpen: false });
      
      await deleteComment(commentId, user.token);
      setComments(prev => prev.filter(comment => comment._id !== commentId));
      
      // Show success message after a brief delay to ensure modal state is clean
      setTimeout(() => {
        setAlertModal({
          isOpen: true,
          type: 'success',
          title: 'Comment Deleted',
          message: 'The comment has been successfully deleted.',
          confirmText: 'OK',
          onConfirm: closeAlertModal
        });
      }, 100);
      
    } catch (error) {
      // Show error message after a brief delay to ensure modal state is clean
      setTimeout(() => {
        setAlertModal({
          isOpen: true,
          type: 'error',
          title: 'Deletion Failed',
          message: error.message || error.response?.data?.message || 'Failed to delete comment. Please try again.',
          confirmText: 'OK',
          onConfirm: closeAlertModal
        });
      }, 100);
      
    } finally {
      setDeletingComments(prev => {
        const newSet = new Set(prev);
        newSet.delete(commentId);
        return newSet;
      });
      setCommentToDelete(null);
    }
  };

  const closeAlertModal = () => {
    setAlertModal({ isOpen: false });
  };

  if (loading) return <div>Loading comments...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="comment-list">
      <h3>Comments ({comments.length})</h3>
      {comments.length === 0 ? (
        <p>No comments yet. Be the first to comment!</p>
      ) : (
        comments.map(comment => (
          <div key={comment._id} className="comment-item">
            <div className="comment-header">
              <div className="comment-author">
                <p><strong>{comment.user?.username || 'Anonymous'}:</strong></p>
                <small>{new Date(comment.createdAt).toLocaleString()}</small>
              </div>
              {user && user.role === 'admin' && (
                <button
                  onClick={() => handleDeleteComment(comment._id)}
                  disabled={deletingComments.has(comment._id)}
                  className="action-btn danger"
                  title="Delete Comment"
                >
                  {deletingComments.has(comment._id) ? (
                    <>⏳ Deleting...</>
                  ) : (
                    <>🗑️ Delete</>
                  )}
                </button>
              )}
            </div>
            <p>{comment.content}</p>
          </div>
        ))
      )}

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

export default CommentList;