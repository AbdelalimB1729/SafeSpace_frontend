import React, { useState } from 'react';

const ContactPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
    inquiryType: 'general'
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate form submission (you would integrate with your backend here)
    setTimeout(() => {
      setSubmitting(false);
      setSubmitted(true);
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
        inquiryType: 'general'
      });
    }, 1500);
  };

  return (
    <div className="contact-page">
      <div className="page-header">
        <h1>Get in Touch</h1>
        <p className="lead">Want to chat, ask questions, or just say hello? I'd love to hear from you! 😊</p>
      </div>

      <div className="contact-content" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '3rem', alignItems: 'start' }}>
        
        {/* Contact Information */}
        <div className="contact-info">
          <div className="card">
            <h2>Let's Connect!</h2>
            <p>
              Got a question about something I posted? Want to discuss research topics? Or maybe you just 
              want to say hi and share your own academic journey? I'm always excited to connect with 
              fellow students and curious minds!
            </p>

            <div className="contact-methods" style={{ marginTop: '2rem' }}>
              <div className="contact-method" style={{ marginBottom: '2rem', paddingLeft: '3rem', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '0', top: '0.2rem', fontSize: '1.5rem' }}>📧</div>
                <h4 style={{ marginBottom: '0.5rem' }}>Drop me an Email</h4>
                <p style={{ color: 'var(--secondary-color)', fontWeight: '500' }}>hello@mysafespace.com</p>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-light)' }}>
                  I'll get back to you as soon as I can! (Usually within a day or two)
                </p>
              </div>

              <div className="contact-method" style={{ marginBottom: '2rem', paddingLeft: '3rem', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '0', top: '0.2rem', fontSize: '1.5rem' }}>💬</div>
                <h4 style={{ marginBottom: '0.5rem' }}>Academic Chat</h4>
                <p style={{ color: 'var(--secondary-color)', fontWeight: '500' }}>chat@mysafespace.com</p>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-light)' }}>
                  Want to discuss research, share ideas, or talk about student life? Let's chat!
                </p>
              </div>

              <div className="contact-method" style={{ marginBottom: '2rem', paddingLeft: '3rem', position: 'relative' }}>
                <div style={{ position: 'absolute', left: '0', top: '0.2rem', fontSize: '1.5rem' }}>🤔</div>
                <h4 style={{ marginBottom: '0.5rem' }}>Questions & Suggestions</h4>
                <p style={{ color: 'var(--secondary-color)', fontWeight: '500' }}>questions@mysafespace.com</p>
                <p style={{ margin: 0, fontSize: '0.875rem', color: 'var(--text-light)' }}>
                  Found a bug? Have ideas to make this place better? I'm all ears!
                </p>
              </div>
            </div>

            <div style={{ 
              background: 'var(--bg-tertiary)', 
              padding: '1.5rem', 
              borderRadius: 'var(--border-radius)', 
              marginTop: '2rem' 
            }}>
              <h4 style={{ marginBottom: '1rem', color: 'var(--primary-color)' }}>When I'm Around</h4>
              <p style={{ margin: 0 }}>
                <strong>Usually:</strong> After classes and on weekends<br/>
                <strong>Response time:</strong> 1-2 days (I'm still a student, so be patient! 😅)
              </p>
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="contact-form-section">
          <div className="card">
            <h2>Send us a Message</h2>
            
            {submitted ? (
              <div className="success" style={{ textAlign: 'center', padding: '2rem' }}>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>✅</div>
                <h3>Message Sent Successfully!</h3>
                <p>Thank you for contacting us. We'll get back to you as soon as possible.</p>
                <button 
                  onClick={() => setSubmitted(false)} 
                  className="btn btn-outline"
                  style={{ marginTop: '1rem' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ marginTop: '1.5rem' }}>
                <div className="form-group">
                  <label htmlFor="inquiryType">Type of Inquiry</label>
                  <select
                    id="inquiryType"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleChange}
                    required
                  >
                    <option value="general">General Question</option>
                    <option value="technical">Technical Support</option>
                    <option value="academic">Academic Partnership</option>
                    <option value="feedback">Feedback & Suggestions</option>
                    <option value="account">Account Issues</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                  <div className="form-group">
                    <label htmlFor="name">Full Name</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your full name"
                      required
                      disabled={submitting}
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email address"
                      required
                      disabled={submitting}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="subject">Subject</label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    placeholder="Brief description of your inquiry"
                    required
                    disabled={submitting}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows="6"
                    placeholder="Please provide details about your inquiry..."
                    required
                    disabled={submitting}
                  />
                </div>

                <button 
                  type="submit" 
                  className="btn btn-primary" 
                  disabled={submitting}
                  style={{ width: '100%' }}
                >
                  {submitting ? '📤 Sending Message...' : '📧 Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="faq-section" style={{ marginTop: '4rem' }}>
        <div className="card">
          <h2>Frequently Asked Questions</h2>
          <div style={{ marginTop: '2rem' }}>
            <div className="faq-item" style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-light)' }}>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '0.75rem' }}>
                How do I upload my research paper?
              </h4>
              <p>
                To upload a research paper, you need to have an admin account. Navigate to the "Upload Paper" 
                section, fill in the title and abstract, and upload your PDF file. Your paper will be 
                immediately available to the community.
              </p>
            </div>

            <div className="faq-item" style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-light)' }}>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '0.75rem' }}>
                Is my research data secure on MySafeSpace?
              </h4>
              <p>
                Yes, we take security very seriously. All data is encrypted in transit and at rest. 
                We implement industry-standard security measures to protect your intellectual property 
                and personal information.
              </p>
            </div>

            <div className="faq-item" style={{ marginBottom: '2rem', paddingBottom: '1.5rem', borderBottom: '1px solid var(--border-light)' }}>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '0.75rem' }}>
                Can I collaborate with other researchers?
              </h4>
              <p>
                Absolutely! MySafeSpace is designed to foster collaboration. You can comment on papers 
                and blogs, engage in discussions, and connect with researchers in your field.
              </p>
            </div>

            <div className="faq-item" style={{ marginBottom: '0' }}>
              <h4 style={{ color: 'var(--primary-color)', marginBottom: '0.75rem' }}>
                How do I get admin privileges to upload content?
              </h4>
              <p>
                Admin privileges are granted based on academic credentials and community contribution. 
                Please contact us at support@mysafespace.com with your academic background and 
                research interests for consideration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;