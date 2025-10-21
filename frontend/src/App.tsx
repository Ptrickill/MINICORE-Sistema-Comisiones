
import React from 'react';
import './App.css';
import ComisionCalculator from './components/ComisionCalculator';
import Header from './components/Header';

function App() {
  return (
    <div className="App">
      <Header />
      
      <main className="main-content">
        <div className="container">
          <ComisionCalculator />
        </div>
      </main>
      

    </div>
  );
}

export default App;