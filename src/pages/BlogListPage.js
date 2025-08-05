import React from 'react';
import BlogList from '../components/BlogList';
import EnhancedButton from '../components/EnhancedButton';
import { useAuth } from '../context/AuthContext';

const BlogListPage = () => {
  const { user } = useAuth();
  const isAdmin = user?.role === 'admin';

  return (
    <div className="blog-list-page">
      <div className="page-header">
        <h1>Research Blogs</h1>
        {isAdmin && (
          <EnhancedButton 
            to="/blogs/create" 
            variant="create" 
            icon="✍️"
          >
            Create New Blog
          </EnhancedButton>
        )}
      </div>
      <BlogList />
    </div>
  );
};

export default BlogListPage;