import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaPhone, FaMapMarkerAlt, FaGithub, FaLinkedin, FaPaperPlane } from 'react-icons/fa';
import './Contact.css';

const Contact = () => {
  const [summaryData, setSummaryData] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState({ type: '', message: '' });

  useEffect(() => {
    fetch('/data/summary.json')
      .then((res) => res.json())
      .then((data) => setSummaryData(data))
      .catch((err) => console.error('Error loading summary data:', err));
  }, []);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setFormStatus({ type: 'loading', message: 'Sending message...' });

  try {
    const response = await fetch('https://formspree.io/f/mzdznenw', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
      body: JSON.stringify(formData),
    });

    const result = await response.json();

    if (response.ok) {
      setFormStatus({
        type: 'success',
        message: 'Thank you! Your message has been sent.',
      });
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    } else {
      throw new Error(result.error || 'Submission failed');
    }
  } catch (error) {
    setFormStatus({
      type: 'error',
      message: 'Failed to send message. Please try again later.',
    });
  }

  setTimeout(() => setFormStatus({ type: '', message: '' }), 4000);
};


  if (!summaryData) {
    return <div className="loading">Loading...</div>;
  }

  const contactInfo = [
    {
      icon: <FaEnvelope />,
      label: 'Email',
      value: summaryData.email,
      link: `mailto:${summaryData.email}`,
    },
    {
      icon: <FaPhone />,
      label: 'Phone',
      value: summaryData.phone,
      link: `tel:${summaryData.phone}`,
    },
    {
      icon: <FaMapMarkerAlt />,
      label: 'Location',
      value: summaryData.location,
      link: null,
    },
  ];

  const socialLinks = [
    {
      icon: <FaGithub />,
      label: 'GitHub',
      url: summaryData.social.github,
    },
    {
      icon: <FaLinkedin />,
      label: 'LinkedIn',
      url: summaryData.social.linkedin,
    },
  ];

  return (
    <div className="contact section">
      <div className="container">
        <motion.h1
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Get In Touch
        </motion.h1>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Let's discuss your next project
        </motion.p>

        <div className="contact-content">
          <motion.div
            className="contact-info"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}
          >
            <h2>Contact Information</h2>
            <p className="contact-intro">
              Feel free to reach out to me through any of the following channels.
              I'm always open to discussing new projects, creative ideas, or opportunities.
            </p>

            <div className="info-items">
              {contactInfo.map((item, index) => (
                <div key={index} className="info-item">
                  <div className="info-icon">{item.icon}</div>
                  <div className="info-content">
                    <h4>{item.label}</h4>
                    {item.link ? (
                      <a href={item.link}>{item.value}</a>
                    ) : (
                      <p>{item.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="contact-social">
              <h3>Follow Me</h3>
              <div className="social-links">
                {socialLinks.map((link, index) => (
                  <a
                    key={index}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="social-link"
                    aria-label={link.label}
                  >
                    {link.icon}
                    <span>{link.label}</span>
                  </a>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            className="contact-form-wrapper"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Your Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  placeholder="John Doe"
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Your Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="john@example.com"
                />
              </div>

              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  placeholder="Project Collaboration"
                />
              </div>

              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  placeholder="Tell me about your project..."
                ></textarea>
              </div>

              {formStatus.message && (
                <div className={`form-status ${formStatus.type}`}>
                  {formStatus.message}
                </div>
              )}

              <button
                type="submit"
                className="btn btn-primary submit-btn"
                disabled={formStatus.type === 'loading'}
              >
                {formStatus.type === 'loading' ? (
                  'Sending...'
                ) : (
                  <>
                    Send Message <FaPaperPlane />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
