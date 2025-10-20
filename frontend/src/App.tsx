
import React from 'react';
import './App.css';
import ComisionCalculator from './components/ComisionCalculator';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
    <div className="App">
      <Header />
      
      <main className="main-content">
        <div className="container">
          <ComisionCalculator />
        </div>
      </main>
      
      <Footer />
    </div>
  );
}

export default App;