import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { MdEmail } from 'react-icons/md';
import { AiFillHeart } from 'react-icons/ai';
import './Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-social">
          <a
            key='Github'
            href='https://github.com/muhammadabubakr2005'
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label='Github'
          >
            <FaGithub />
          </a>
          
          <a
            key='LinkedIn'
            href='https://linkedin.com/in/muhammadabubakr2005'
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label='LinkedIn'
          >
            <FaLinkedin />
          </a>

          <a
            href="https://mail.google.com/mail/?view=cm&fs=1&to=abubakr.muhammad.5785@gmail.com"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
            aria-label="Email"
          >
            <MdEmail />
          </a>
          
        </div>
        <div className="footer-text">
          <p>
            Made with <AiFillHeart className="heart-icon" /> by Muhammad Abubakar
          </p>
          <p className="footer-copyright">
            &copy; {currentYear} All rights reserved
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
