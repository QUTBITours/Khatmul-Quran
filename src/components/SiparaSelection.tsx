import React, { useState } from 'react';
import { useQuran } from '../context/QuranContext';
import { BookOpen } from 'lucide-react';
import './SiparaSelection.css';

const SiparaSelection: React.FC = () => {
  const { state, dispatch, availableSiparas } = useQuran();
  const [selectedSipara, setSelectedSipara] = useState<number | ''>('');
  
  const handleSiparaChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setSelectedSipara(value === '' ? '' : parseInt(value, 10));
  };
  
  const handleTakeSipara = () => {
    if (selectedSipara !== '' && state.userName) {
      dispatch({
        type: 'TAKE_SIPARA',
        payload: {
          sipara: selectedSipara,
          userName: state.userName
        }
      });
      setSelectedSipara('');
    }
  };
  
  // Check if there are available Siparas to take
  const hasAvailableSiparas = availableSiparas.length > 0;

  return (
    <div className="sipara-selection card fade-in">
      <h2 className="section-title">
        <BookOpen size={20} className="section-icon" />
        Select a Sipara
      </h2>
      
      {hasAvailableSiparas ? (
        <div className="selection-form">
          <div className="select-wrapper">
            <select 
              value={selectedSipara} 
              onChange={handleSiparaChange}
              className="sipara-select"
            >
              <option value="">-- Select a Sipara --</option>
              {availableSiparas.map(sipara => (
                <option key={sipara} value={sipara}>
                  Sipara {sipara}
                </option>
              ))}
            </select>
          </div>
          
          <button 
            className="take-button"
            onClick={handleTakeSipara}
            disabled={selectedSipara === ''}
          >
            Take Sipara
          </button>
        </div>
      ) : (
        <div className="no-siparas-message">
          <p>All Siparas have been taken for this Quran round.</p>
          {state.rounds.length > 1 && (
            <p>You can view other rounds using the selector in the header.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default SiparaSelection;