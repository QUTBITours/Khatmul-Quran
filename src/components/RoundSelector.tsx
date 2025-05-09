import React from 'react';
import { useQuran } from '../context/QuranContext';
import './RoundSelector.css';

const RoundSelector: React.FC = () => {
  const { state, dispatch } = useQuran();
  const { rounds, currentRound } = state;

  const handleRoundChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const roundNumber = parseInt(e.target.value, 10);
    dispatch({ type: 'CHANGE_ROUND', payload: roundNumber });
  };

  return (
    <div className="round-selector">
      <select 
        value={currentRound} 
        onChange={handleRoundChange}
        className="round-select"
      >
        {rounds.map((round) => (
          <option key={round.id} value={round.id}>
            Quran #{round.id}
          </option>
        ))}
      </select>
    </div>
  );
};

export default RoundSelector;