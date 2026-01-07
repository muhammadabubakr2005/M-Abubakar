import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { FaArrowRight, FaDownload } from 'react-icons/fa';
import './Home.css';

const Home = () => {
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

  return (
    <div className="home">
      <div className="home-container">
        <motion.div
          className="home-content"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.h1
            className="home-greeting"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            Hi, I'm
          </motion.h1>

          <motion.h2
            className="home-name"
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4 }}
          >
            {summaryData.name}
          </motion.h2>

          <div className="home-role">
            <TypeAnimation
              sequence={summaryData.taglines.flatMap((tagline) => [
                tagline,
                2000,
              ])}
              wrapper="span"
              speed={50}
              repeat={Infinity}
              className="typing-text"
            />
          </div>

          <motion.p
            className="home-bio"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            {summaryData.bio}
          </motion.p>

          <motion.div
            className="home-buttons"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
          >
            <Link to="/projects" className="btn btn-primary">
              View My Work <FaArrowRight />
            </Link>
            <a
              href={summaryData.resumeUrl}
              className="btn btn-secondary"
              download
            >
              Download Resume <FaDownload />
            </a>
          </motion.div>

          <motion.div
            className="home-stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            <div className="stat-item">
              <h3 className="stat-number">5+</h3>
              <p className="stat-label">Projects Completed</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">2+</h3>
              <p className="stat-label">Years Experience</p>
            </div>
            <div className="stat-item">
              <h3 className="stat-number">15+</h3>
              <p className="stat-label">Technologies</p>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          className="home-image"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="image-wrapper">
            <div className="image-border"></div>
            <img
              src={summaryData.profileImage}
              alt={summaryData.name}
              onError={(e) => {
                e.target.src = 'https://via.placeholder.com/400x400/0a0a0a/00ffca?text=M.A';
              }}
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Home;
