import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import './Skills.css';

const Skills = () => {
  const [skillsData, setSkillsData] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');

  useEffect(() => {
    fetch('/data/frameworks.json')
      .then((res) => res.json())
      .then((data) => setSkillsData(data))
      .catch((err) => console.error('Error loading skills data:', err));
  }, []);

  if (!skillsData) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading Skills...</p>
      </div>
    );
  }

  const categories = [
    { id: 'all', label: 'All Skills', icon: '🎯' },
    { id: 'languages', label: 'Languages', icon: '💻' },
    { id: 'frontend', label: 'Frontend', icon: '🎨' },
    { id: 'backend', label: 'Backend', icon: '⚙️' },
    { id: 'databases', label: 'Databases', icon: '🗄️' },
    { id: 'tools', label: 'Tools', icon: '🔧' },
  ];

  const getAllSkills = () => {
    return [
      ...skillsData.languages,
      ...skillsData.frontend,
      ...skillsData.backend,
      ...skillsData.databases,
      ...skillsData.tools,
    ];
  };

  const getFilteredSkills = () => {
    if (selectedCategory === 'all') {
      return getAllSkills();
    }
    return skillsData[selectedCategory] || [];
  };

  const getProficiencyLevel = (proficiency) => {
    if (proficiency >= 90) return 'Expert';
    if (proficiency >= 80) return 'Advanced';
    if (proficiency >= 70) return 'Intermediate';
    return 'Beginner';
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: "easeOut"
      },
    },
  };

  return (
    <div className="skills-page">
      <div className="skills-container">
        <motion.div
          className="skills-header"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="skills-title">
            <span className="title-accent">Technical</span> Expertise
          </h1>
          <p className="skills-description">
            A comprehensive overview of my technical skills and proficiencies across various technologies and tools
          </p>
        </motion.div>

        <motion.div
          className="skills-filters"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          {categories.map((category) => (
            <button
              key={category.id}
              className={`filter-btn ${selectedCategory === category.id ? 'active' : ''}`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <span className="filter-icon">{category.icon}</span>
              <span className="filter-label">{category.label}</span>
            </button>
          ))}
        </motion.div>

        <motion.div
          className="skills-count"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <span className="count-number">{getFilteredSkills().length}</span>
          <span className="count-label"> {selectedCategory === 'all' ? 'Total' : categories.find(cat => cat.id === selectedCategory)?.label || ''} Skill{getFilteredSkills().length !== 1 ? 's' : ''}</span>
        </motion.div>

        <motion.div
          className="skills-grid"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          key={selectedCategory}
        >
          {getFilteredSkills().map((skill, index) => (
            <motion.div
              key={`${skill.name}-${index}`}
              className="skill-card"
              variants={itemVariants}
              whileHover={{ y: -8, transition: { duration: 0.2 } }}
            >
              <div className="skill-card-header">
                <div className="skill-icon-wrapper">
                  <img
                    src={skill.icon}
                    alt={skill.name}
                    className="skill-icon"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  <div className="skill-icon-placeholder" style={{ display: 'none' }}>
                    {skill.name.charAt(0)}
                  </div>
                </div>
                <div className="skill-level-badge">{getProficiencyLevel(skill.proficiency)}</div>
              </div>

              <h3 className="skill-name">{skill.name}</h3>

              <div className="skill-progress-wrapper">
                <div className="skill-progress-header">
                  <span className="progress-label">Proficiency</span>
                  <span className="progress-percentage">{skill.proficiency}%</span>
                </div>
                <div className="skill-progress-container">
                  <motion.div
                    className="skill-progress-bar"
                    initial={{ width: 0 }}
                    animate={{ width: `${skill.proficiency}%` }}
                    transition={{ duration: 1, delay: 0.3 + index * 0.05, ease: "easeOut" }}
                  />
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          className="soft-skills-section"
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="soft-skills-header">
            <h2 className="soft-skills-title">Professional Skills</h2>
            <p className="soft-skills-subtitle">Core competencies that drive success</p>
          </div>
          <div className="soft-skills-grid">
            {skillsData.softSkills.map((skill, index) => (
              <motion.div
                key={index}
                className="soft-skill-badge"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.6 + index * 0.08, duration: 0.3 }}
                whileHover={{ scale: 1.05, transition: { duration: 0.2 } }}
              >
                <span className="soft-skill-text">{skill}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Skills;
