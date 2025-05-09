import React from 'react';
import { useQuran } from '../context/QuranContext';
import { User, CheckCircle, XCircle } from 'lucide-react';
import './ReciterList.css';

interface ReciterData {
  name: string;
  siparas: {
    sipara: number;
    isCompleted: boolean;
  }[];
}

const ReciterList: React.FC = () => {
  const { state } = useQuran();
  const { currentRound, rounds } = state;
  
  // Get the current round
  const roundIndex = currentRound - 1;
  const currentRoundData = rounds[roundIndex];
  
  // Group by reciter
  const reciterMap = new Map<string, ReciterData>();
  
  currentRoundData.siparas.forEach(sipara => {
    if (sipara.takenBy) {
      if (!reciterMap.has(sipara.takenBy)) {
        reciterMap.set(sipara.takenBy, {
          name: sipara.takenBy,
          siparas: []
        });
      }
      
      const reciter = reciterMap.get(sipara.takenBy)!;
      reciter.siparas.push({
        sipara: sipara.sipara,
        isCompleted: sipara.isCompleted
      });
    }
  });
  
  // Convert to array and sort by name
  const reciters = Array.from(reciterMap.values())
    .sort((a, b) => a.name.localeCompare(b.name));

  return (
    <div className="reciter-list fade-in">
      {reciters.length > 0 ? (
        <div className="reciters-container">
          {reciters.map(reciter => (
            <div key={reciter.name} className="reciter-card card">
              <div className="reciter-header">
                <User size={20} />
                <h3 className="reciter-name">{reciter.name}</h3>
              </div>
              
              <div className="reciter-stats">
                <div className="reciter-stat">
                  <span className="stat-value">{reciter.siparas.length}</span>
                  <span className="stat-label">Siparas</span>
                </div>
                <div className="reciter-stat">
                  <span className="stat-value">
                    {reciter.siparas.filter(s => s.isCompleted).length}
                  </span>
                  <span className="stat-label">Completed</span>
                </div>
              </div>
              
              <ul className="reciter-siparas">
                {reciter.siparas.map(sipara => (
                  <li 
                    key={sipara.sipara} 
                    className={`sipara-item ${sipara.isCompleted ? 'completed' : ''}`}
                  >
                    <span className="sipara-number">Sipara {sipara.sipara}</span>
                    {sipara.isCompleted ? (
                      <CheckCircle size={16} className="status-icon completed" />
                    ) : (
                      <XCircle size={16} className="status-icon not-completed" />
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      ) : (
        <div className="no-reciters-message card">
          <p>No Siparas have been taken in this Quran round yet.</p>
          <p>Select a Sipara to be the first reciter!</p>
        </div>
      )}
    </div>
  );
};

export default ReciterList;