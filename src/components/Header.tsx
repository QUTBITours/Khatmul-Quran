import React from 'react';
import { useQuran } from '../context/QuranContext';
import RoundSelector from './RoundSelector';
import UserIdentification from './UserIdentification';
import { BookOpenCheck } from 'lucide-react';
import './Header.css';

const Header: React.FC = () => {
  const { state } = useQuran();

  return (
    <header className="header pattern-bg">
      <div className="container header-container">
        <div className="logo-container">
          <BookOpenCheck size={36} className="logo-icon" />
          <div>
            <h1 className="app-title">Khatmul Quran Tracker</h1>
            <p className="title-arabic">ختم القرآن</p>
          </div>
        </div>
        
        <div className="header-controls">
          <UserIdentification />
          <RoundSelector />
        </div>
        
        <div className="round-indicator">
          <span className="current-round">Quran #{state.currentRound}</span>
        </div>
      </div>
    </header>
  );
};

export default Header;