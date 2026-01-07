import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGraduationCap, FaMapMarkerAlt, FaEnvelope, FaPhone } from 'react-icons/fa';
import './About.css';

const About = () => {
  const [summaryData, setSummaryData] = useState(null);

  useEffect(() => {
    fetch('/data/summary.json')
      .then((res) => res.json())
      .then((data) => setSummaryData(data))
      .catch((err) => console.error('Error loading summary data:', err));
  }, []);

  if (!summaryData) {
    return <div className="loading">Loading...</div>;
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="about section">
      <div className="container">
        <motion.h1
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          About Me
        </motion.h1>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Get to know me better
        </motion.p>

        <motion.div
          className="about-content"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div className="about-image-section" variants={itemVariants}>
            <div className="about-image-wrapper">
              <img
                src={summaryData.profileImage}
                alt={summaryData.name}
                onError={(e) => {
                  e.target.src = 'https://via.placeholder.com/400x400/0a0a0a/00ffca?text=M.A';
                }}
              />
              <div className="image-overlay"></div>
            </div>
          </motion.div>

          <motion.div className="about-info-section" variants={itemVariants}>
            <h2 className="about-subtitle">Who am I?</h2>
            <p className="about-description">{summaryData.bio}</p>

            <div className="about-details">
              <div className="detail-item">
                <FaGraduationCap className="detail-icon" />
                <div className="detail-content">
                  <h4>Education</h4>
                  <p>Bachelors in Computer Science</p>
                  <p className="detail-extra">FAST NUCES, Lahore (2022 - Present)</p>
                  <p className="detail-extra">CGPA: 3.50/4.00</p>
                </div>
              </div>

              <div className="detail-item">
                <FaMapMarkerAlt className="detail-icon" />
                <div className="detail-content">
                  <h4>Location</h4>
                  <p>{summaryData.location}</p>
                </div>
              </div>

              <div className="detail-item">
                <FaEnvelope className="detail-icon" />
                <div className="detail-content">
                  <h4>Email</h4>
                  <a href={`mailto:${summaryData.email}`}>{summaryData.email}</a>
                </div>
              </div>

              <div className="detail-item">
                <FaPhone className="detail-icon" />
                <div className="detail-content">
                  <h4>Phone</h4>
                  <a href={`tel:${summaryData.phone}`}>{summaryData.phone}</a>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="about-interests"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="interests-title">What I Do</h2>
          <div className="interests-grid">
            <div className="interest-card">
              <div className="interest-icon">💻</div>
              <h3>Full-Stack Development</h3>
              <p>Building scalable web applications using modern technologies like React, Node.js, and PostgreSQL.</p>
            </div>
            <div className="interest-card">
              <div className="interest-icon">📱</div>
              <h3>Mobile Development</h3>
              <p>Creating cross-platform mobile apps with React Native and Expo for iOS and Android.</p>
            </div>
            <div className="interest-card">
              <div className="interest-icon">🤖</div>
              <h3>AI Integration</h3>
              <p>Implementing AI-powered features and machine learning models in web and mobile applications.</p>
            </div>
            <div className="interest-card">
              <div className="interest-icon">🎨</div>
              <h3>UI/UX Design</h3>
              <p>Designing intuitive and beautiful user interfaces with focus on user experience.</p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default About;
