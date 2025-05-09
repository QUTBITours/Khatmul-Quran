import React from 'react';
import { useQuran } from '../context/QuranContext';
import { CheckCircle, XCircle } from 'lucide-react';
import './SiparaList.css';

const SiparaList: React.FC = () => {
  const { state, dispatch } = useQuran();
  const { currentRound, rounds, userName } = state;
  
  // Get the current round
  const roundIndex = currentRound - 1;
  const currentRoundData = rounds[roundIndex];
  
  // Handle toggling completion status
  const handleToggleComplete = (sipara: number, isCompleted: boolean) => {
    dispatch({
      type: 'COMPLETE_SIPARA',
      payload: { sipara, isCompleted: !isCompleted }
    });
  };
  
  // Calculate completion stats
  const totalSiparas = currentRoundData.siparas.length;
  const takenSiparas = currentRoundData.siparas.filter(s => s.takenBy !== '').length;
  const completedSiparas = currentRoundData.siparas.filter(s => s.isCompleted).length;
  const completionPercentage = totalSiparas > 0 ? Math.round((completedSiparas / totalSiparas) * 100) : 0;

  return (
    <div className="sipara-list fade-in">
      <div className="sipara-stats">
        <div className="stat-item">
          <span className="stat-label">Total</span>
          <span className="stat-value">{totalSiparas}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Taken</span>
          <span className="stat-value">{takenSiparas}</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Completed</span>
          <span className="stat-value">{completedSiparas}</span>
        </div>
        <div className="stat-item completion-percentage">
          <span className="stat-label">Completion</span>
          <div className="progress-container">
            <div 
              className="progress-bar" 
              style={{ width: `${completionPercentage}%` }}
            ></div>
            <span className="progress-text">{completionPercentage}%</span>
          </div>
        </div>
      </div>
      
      <div className="siparas-grid">
        {currentRoundData.siparas.map((sipara) => (
          <div 
            key={sipara.sipara} 
            className={`sipara-card ${sipara.isCompleted ? 'completed' : ''} ${
              sipara.takenBy ? 'taken' : ''
            }`}
          >
            <div className="sipara-number">
              <span>Sipara</span>
              <h3>{sipara.sipara}</h3>
            </div>
            
            <div className="sipara-info">
              {sipara.takenBy ? (
                <>
                  <div className="reciter-name">{sipara.takenBy}</div>
                  <div className="completion-status">
                    {sipara.isCompleted ? (
                      <span className="status completed">
                        <CheckCircle size={16} /> Completed
                      </span>
                    ) : (
                      <span className="status not-completed">
                        <XCircle size={16} /> Not Completed
                      </span>
                    )}
                  </div>
                </>
              ) : (
                <div className="status available">Available</div>
              )}
            </div>
            
            {sipara.takenBy === userName && (
              <button 
                className="toggle-completion-button"
                onClick={() => handleToggleComplete(sipara.sipara, sipara.isCompleted)}
              >
                {sipara.isCompleted ? 'Mark as Incomplete' : 'Mark as Complete'}
              </button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default SiparaList;