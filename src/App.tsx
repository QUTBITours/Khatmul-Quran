import React from 'react';
import { QuranProvider } from './context/QuranContext';
import Header from './components/Header';
import MainContent from './components/MainContent';
import Footer from './components/Footer';
import './App.css';

function App() {
  return (
    <QuranProvider>
      <div className="app-container">
        <Header />
        <MainContent />
        <Footer />
      </div>
    </QuranProvider>
  );
}

export default App;