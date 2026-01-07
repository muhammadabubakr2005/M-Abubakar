import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaExternalLinkAlt, FaPlay, FaStar } from 'react-icons/fa';
import './Projects.css';

const Projects = () => {
  const [projectsData, setProjectsData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedProject, setSelectedProject] = useState(null);

  useEffect(() => {
    fetch('/data/projects.json')
      .then((res) => res.json())
      .then((data) => setProjectsData(data))
      .catch((err) => console.error('Error loading projects data:', err));
  }, []);

  const categories = [
    { id: 'all', label: 'All Projects' },
    { id: 'Web', label: 'Web' },
    { id: 'Mobile', label: 'Mobile' },
    { id: 'Other', label: 'Other' },
  ];

  const getFilteredProjects = () => {
    if (selectedCategory === 'all') {
      return projectsData;
    }
    return projectsData.filter((project) => project.category === selectedCategory);
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
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
    <div className="projects section">
      <div className="container">
        <motion.h1
          className="section-title"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          My Projects
        </motion.h1>
        <motion.p
          className="section-subtitle"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          Explore my latest work and contributions
        </motion.p>

        <motion.div
          className="projects-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              {category.label}
            </button>
          ))}
        </motion.div>

        <motion.div
          className="projects-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={`${selectedCategory}-${projectsData.length}`}
        >
          {getFilteredProjects().map((project) => (
            <motion.div
              key={project.id}
              className="project-card"
              variants={itemVariants}
              onClick={() => setSelectedProject(project)}
            >
              {/* {project.featured && (
                <div className="featured-badge">
                  <FaStar /> Featured
                </div>
              )} */}

              <div className="project-image">
                <img
                  src={project.thumbnail}
                  alt={project.title}
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/600x400/0a0a0a/00ffca?text=${encodeURIComponent(project.title)}`;
                  }}
                />
                <div className="project-overlay">
                  <button className="view-details-btn">View Details</button>
                </div>
              </div>

              <div className="project-content">
                <div className="project-header">
                  <h3 className="project-title">{project.title}</h3>
                  <span className="project-category">{project.category}</span>
                </div>

                <p className="project-subtitle">{project.subtitle}</p>
                <p className="project-description">{project.description}</p>

                <div className="project-tech">
                  {project.technologies.slice(0, 4).map((tech, index) => (
                    <span key={index} className="tech-badge">
                      {tech}
                    </span>
                  ))}
                  {project.technologies.length > 4 && (
                    <span className="tech-badge">+{project.technologies.length - 4}</span>
                  )}
                </div>

                <div className="project-links">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaGithub /> Code
                    </a>
                  )}
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="project-link"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <FaExternalLinkAlt /> Live Demo
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {getFilteredProjects().length === 0 && (
          <div className="no-projects">
            <p>No projects found in this category.</p>
          </div>
        )}
      </div>

      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}
    </div>
  );
};

const ProjectModal = ({ project, onClose }) => {
  const [lightboxImage, setLightboxImage] = useState(null);

  return (
    <>
      <motion.div
        className="modal-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
      >
        <motion.div
          className="modal-content"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close" onClick={onClose}>
            &times;
          </button>

          <div className="modal-header">
            <h2>{project.title}</h2>
            <span className="project-status">{project.status}</span>
          </div>

          <div className="modal-body">
            {project.video && (
              <div className="project-video">
                <video
                  controls
                  poster={project.thumbnail}
                  onError={(e) => {
                    e.target.style.display = 'none';
                  }}
                >
                  <source src={project.video} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            )}

            {(!project.video && (!project.images || project.images.length < 3)) && project.thumbnail && (
              <div className="project-images-grid">
                <img
                  src={project.thumbnail}
                  alt={`${project.title} thumbnail`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setLightboxImage(project.thumbnail);
                  }}
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/600x400/0a0a0a/00ffca?text=${encodeURIComponent(project.title)}`;
                  }}
                />
              </div>
            )}

            {project.images && project.images.length >= 3 && (
              <div className="project-images-grid">
                {project.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${project.title} screenshot ${index + 1}`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setLightboxImage(image);
                    }}
                    onError={(e) => {
                      e.target.src = `https://via.placeholder.com/400x300/0a0a0a/00ffca?text=Image+${index + 1}`;
                    }}
                  />
                ))}
              </div>
            )}

          <p className="project-long-description">{project.longDescription}</p>

          <div className="project-features">
            <h3>Key Features</h3>
            <ul>
              {project.features.map((feature, index) => (
                <li key={index}>{feature}</li>
              ))}
            </ul>
          </div>

          <div className="project-tech-list">
            <h3>Technologies Used</h3>
            <div className="tech-tags">
              {project.technologies.map((tech, index) => (
                <span key={index} className="tech-tag">
                  {tech}
                </span>
              ))}
            </div>
          </div>

          <div className="modal-links">
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
              >
                <FaGithub /> View Source Code
              </a>
            )}
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <FaExternalLinkAlt /> Visit Live Site
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>

    {lightboxImage && (
      <motion.div
        className="lightbox-overlay"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={() => setLightboxImage(null)}
      >
        <button className="lightbox-close" onClick={() => setLightboxImage(null)}>
          &times;
        </button>
        <motion.img
          src={lightboxImage}
          alt="Full size preview"
          className="lightbox-image"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          exit={{ scale: 0.8 }}
          onClick={(e) => e.stopPropagation()}
        />
      </motion.div>
    )}
  </>
  );
};

export default Projects;
