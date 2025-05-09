import React, { useState, useEffect } from 'react';
import { useQuran } from '../context/QuranContext';
import { User } from 'lucide-react';
import './UserIdentification.css';

const UserIdentification: React.FC = () => {
  const { state, dispatch } = useQuran();
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(state.userName || '');

  useEffect(() => {
    // If username is empty, prompt user to enter name
    if (!state.userName) {
      setIsEditing(true);
    }
  }, [state.userName]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim()) {
      dispatch({ type: 'SET_USERNAME', payload: name.trim() });
      setIsEditing(false);
    }
  };

  const toggleEdit = () => {
    setIsEditing(!isEditing);
    setName(state.userName);
  };

  if (isEditing) {
    return (
      <div className="user-identification">
        <form onSubmit={handleSubmit} className="user-form">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
            className="user-input"
            autoFocus
          />
          <button type="submit" className="save-button">Save</button>
        </form>
      </div>
    );
  }

  return (
    <div className="user-identification">
      <div className="user-display" onClick={toggleEdit}>
        <User size={16} />
        <span>{state.userName}</span>
      </div>
    </div>
  );
};

export default UserIdentification;