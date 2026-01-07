import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaBriefcase, FaMapMarkerAlt, FaClock } from 'react-icons/fa';
import './Experience.css';

const Experience = () => {
  const [experienceData, setExperienceData] = useState([]);

  useEffect(() => {
    fetch('/data/experience.json')
      .then((res) => res.json())
      .then((data) => setExperienceData(data))
      .catch((err) => console.error('Error loading experience data:', err));
  }, []);

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
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  };

  return (
    <div className="experience section">
      <div className="container">
        <motion.h1
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          Work Experience
        </motion.h1>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          My professional journey and achievements
        </motion.p>

        <motion.div
          key={experienceData.length}
          className="experience-timeline"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {experienceData.map((exp, index) => (
            <motion.div
              key={exp.id}
              className="experience-item"
              variants={itemVariants}
            >
              <div className="timeline-connector">
                <div className="timeline-dot"></div>
                {index < experienceData.length - 1 && <div className="timeline-line"></div>}
              </div>

              <div className="experience-card">
                <div className="experience-header">
                  <div className="company-logo">
                    <img
                      src={exp.logo}
                      alt={exp.company}
                      onError={(e) => {
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'flex';
                      }}
                    />
                    <div className="company-logo-placeholder" style={{ display: 'none' }}>
                      {exp.company.charAt(0)}
                    </div>
                  </div>

                  <div className="experience-info">
                    <h3 className="job-title">{exp.title}</h3>
                    <div className="company-details">
                      <span className="company-name">
                        <FaBriefcase /> {exp.company}
                      </span>
                      <span className="job-type">{exp.type}</span>
                    </div>
                    <div className="experience-meta">
                      <span className="location">
                        <FaMapMarkerAlt /> {exp.location}
                      </span>
                      <span className="duration">
                        <FaClock /> {exp.duration}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="experience-description">{exp.description}</p>

                <div className="responsibilities">
                  <h4>Key Responsibilities & Achievements</h4>
                  <ul>
                    {exp.responsibilities.map((resp, idx) => (
                      <li key={idx}>{resp}</li>
                    ))}
                  </ul>
                </div>

                <div className="experience-technologies">
                  <h4>Technologies Used</h4>
                  <div className="tech-tags">
                    {exp.technologies.map((tech, idx) => (
                      <span key={idx} className="tech-tag">
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {experienceData.length === 0 && (
          <div className="loading">Loading experience data...</div>
        )}

        <motion.div
          className="education-section"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8 }}
        >
          <h2 className="education-title">Education</h2>
          <div className="education-card">
            <div className="education-icon">🎓</div>
            <div className="education-content">
              <h3>Bachelors in Computer Science</h3>
              <p className="university">FAST NUCES, Lahore</p>
              <div className="education-meta">
                <span className="education-year">2022 - Present</span>
                <span className="education-gpa">CGPA: 3.50/4.00</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Experience;
