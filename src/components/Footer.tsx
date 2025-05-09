import React from 'react';
import { Heart } from 'lucide-react';
import './Footer.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="container footer-container">
        <p className="footer-text">
          Khatmul Quran Tracker &copy; {currentYear}
        </p>
        <p className="footer-love">
          Made with <Heart size={14} className="heart-icon" /> for the Ummah
        </p>
      </div>
    </footer>
  );
};

export default Footer;