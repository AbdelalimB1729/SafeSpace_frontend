import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BlogListPage from './pages/BlogListPage';
import BlogDetailPage from './pages/BlogDetailPage';
import CreateBlogPage from './pages/CreateBlogPage';
import PaperListPage from './pages/PaperListPage';
import PaperDetailPage from './pages/PaperDetailPage';
import UploadPaperPage from './pages/UploadPaperPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import ProtectedRoute from './components/ProtectedRoute';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="app">
          <Navbar />
          
          <main className="main-content">
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              
              <Route path="/blogs" element={<BlogListPage />} />
              <Route path="/blogs/:id" element={<BlogDetailPage />} />
              <Route 
                path="/blogs/create" 
                element={
                  <ProtectedRoute adminOnly>
                    <CreateBlogPage />
                  </ProtectedRoute>
                } 
              />
              
              <Route path="/papers" element={<PaperListPage />} />
              <Route path="/papers/:id" element={<PaperDetailPage />} />
              <Route 
                path="/papers/upload" 
                element={
                  <ProtectedRoute adminOnly>
                    <UploadPaperPage />
                  </ProtectedRoute>
                } 
              />
              
              <Route path="/about" element={<AboutPage />} />
              <Route path="/contact" element={<ContactPage />} />
              
              <Route path="*" element={<Navigate to="/" />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;