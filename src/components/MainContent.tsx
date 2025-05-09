import React, { useState } from 'react';
import { useQuran } from '../context/QuranContext';
import SiparaSelection from './SiparaSelection';
import SiparaList from './SiparaList';
import ReciterList from './ReciterList';
import { Tabs, Tab } from './Tabs';
import './MainContent.css';

const MainContent: React.FC = () => {
  const { state, checkAllSiparasTaken, dispatch } = useQuran();
  const [activeTab, setActiveTab] = useState('siparas');
  
  // Check if new round should be created
  const allTaken = checkAllSiparasTaken();
  
  const handleCreateNewRound = () => {
    dispatch({ type: 'CREATE_NEW_ROUND' });
  };

  return (
    <main className="main-content pattern-bg">
      <div className="container main-container">
        {state.userName ? (
          <>
            <SiparaSelection />
            
            <Tabs activeTab={activeTab} onChange={setActiveTab}>
              <Tab id="siparas" title="All Siparas">
                <SiparaList />
              </Tab>
              <Tab id="reciters" title="By Reciter">
                <ReciterList />
              </Tab>
            </Tabs>
            
            {allTaken && (
              <div className="new-round-container card slide-in">
                <h3>All Siparas Have Been Taken!</h3>
                <p>Would you like to start a new Quran round?</p>
                <button 
                  className="new-round-button"
                  onClick={handleCreateNewRound}
                >
                  Start New Quran Round
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="welcome-container card">
            <h2>Welcome to Khatmul Quran Tracker</h2>
            <p>Please enter your name above to get started.</p>
          </div>
        )}
      </div>
    </main>
  );
};

export default MainContent;