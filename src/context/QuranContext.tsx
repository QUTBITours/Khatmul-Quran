import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { QuranState, QuranAction, Sipara, QuranRound } from '../types';
import { getFromLocalStorage, saveToLocalStorage } from '../utils/localStorage';

// Initial empty Quran round
const createEmptyRound = (id: number): QuranRound => {
  const siparas: Sipara[] = [];
  for (let i = 1; i <= 30; i++) {
    siparas.push({
      sipara: i,
      takenBy: '',
      isCompleted: false
    });
  }
  return { id, siparas };
};

// Initial state
const initialState: QuranState = {
  currentRound: 1,
  rounds: [createEmptyRound(1)],
  userName: ''
};

// Load state from localStorage or use initial state
const loadInitialState = (): QuranState => {
  const savedState = getFromLocalStorage('quranState');
  if (savedState) {
    return savedState as QuranState;
  }
  return initialState;
};

// Reducer function
const quranReducer = (state: QuranState, action: QuranAction): QuranState => {
  switch (action.type) {
    case 'SET_USERNAME':
      return { ...state, userName: action.payload };
    
    case 'TAKE_SIPARA': {
      const { sipara, userName } = action.payload;
      const updatedRounds = [...state.rounds];
      const currentRoundIndex = state.currentRound - 1;
      
      if (currentRoundIndex >= 0 && currentRoundIndex < updatedRounds.length) {
        const updatedSiparas = [...updatedRounds[currentRoundIndex].siparas];
        const siparaIndex = updatedSiparas.findIndex(s => s.sipara === sipara);
        
        if (siparaIndex !== -1) {
          updatedSiparas[siparaIndex] = {
            ...updatedSiparas[siparaIndex],
            takenBy: userName
          };
          
          updatedRounds[currentRoundIndex] = {
            ...updatedRounds[currentRoundIndex],
            siparas: updatedSiparas
          };
        }
      }
      
      return { ...state, rounds: updatedRounds };
    }
    
    case 'COMPLETE_SIPARA': {
      const { sipara, isCompleted } = action.payload;
      const updatedRounds = [...state.rounds];
      const currentRoundIndex = state.currentRound - 1;
      
      if (currentRoundIndex >= 0 && currentRoundIndex < updatedRounds.length) {
        const updatedSiparas = [...updatedRounds[currentRoundIndex].siparas];
        const siparaIndex = updatedSiparas.findIndex(s => s.sipara === sipara);
        
        if (siparaIndex !== -1) {
          updatedSiparas[siparaIndex] = {
            ...updatedSiparas[siparaIndex],
            isCompleted
          };
          
          updatedRounds[currentRoundIndex] = {
            ...updatedRounds[currentRoundIndex],
            siparas: updatedSiparas
          };
        }
      }
      
      return { ...state, rounds: updatedRounds };
    }
    
    case 'CHANGE_ROUND':
      return { ...state, currentRound: action.payload };
    
    case 'CREATE_NEW_ROUND': {
      const newRoundId = state.rounds.length + 1;
      return {
        ...state,
        rounds: [...state.rounds, createEmptyRound(newRoundId)],
        currentRound: newRoundId
      };
    }
    
    default:
      return state;
  }
};

// Create context
type QuranContextType = {
  state: QuranState;
  dispatch: React.Dispatch<QuranAction>;
  checkAllSiparasTaken: () => boolean;
  availableSiparas: number[];
};

const QuranContext = createContext<QuranContextType | undefined>(undefined);

// Provider component
export const QuranProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(quranReducer, loadInitialState());
  
  // Save state to localStorage whenever it changes
  useEffect(() => {
    saveToLocalStorage('quranState', state);
  }, [state]);
  
  // Check if all Siparas in current round are taken
  const checkAllSiparasTaken = (): boolean => {
    const currentRoundIndex = state.currentRound - 1;
    if (currentRoundIndex >= 0 && currentRoundIndex < state.rounds.length) {
      const currentRound = state.rounds[currentRoundIndex];
      return currentRound.siparas.every(sipara => sipara.takenBy !== '');
    }
    return false;
  };
  
  // Get available Siparas for selection
  const availableSiparas = (): number[] => {
    const currentRoundIndex = state.currentRound - 1;
    if (currentRoundIndex >= 0 && currentRoundIndex < state.rounds.length) {
      const currentRound = state.rounds[currentRoundIndex];
      return currentRound.siparas
        .filter(sipara => sipara.takenBy === '')
        .map(sipara => sipara.sipara);
    }
    return [];
  };
  
  return (
    <QuranContext.Provider value={{ 
      state, 
      dispatch, 
      checkAllSiparasTaken, 
      availableSiparas: availableSiparas() 
    }}>
      {children}
    </QuranContext.Provider>
  );
};

// Custom hook for using the Quran context
export const useQuran = () => {
  const context = useContext(QuranContext);
  if (context === undefined) {
    throw new Error('useQuran must be used within a QuranProvider');
  }
  return context;
};