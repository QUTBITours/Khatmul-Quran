export interface Sipara {
  sipara: number;
  takenBy: string;
  isCompleted: boolean;
}

export interface QuranRound {
  id: number;
  siparas: Sipara[];
}

export interface QuranState {
  currentRound: number;
  rounds: QuranRound[];
  userName: string;
}

export type QuranAction = 
  | { type: 'SET_USERNAME'; payload: string }
  | { type: 'TAKE_SIPARA'; payload: { sipara: number, userName: string } }
  | { type: 'COMPLETE_SIPARA'; payload: { sipara: number, isCompleted: boolean } }
  | { type: 'CHANGE_ROUND'; payload: number }
  | { type: 'CREATE_NEW_ROUND' };