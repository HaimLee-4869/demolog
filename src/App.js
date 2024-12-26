import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppContent from './Router';

function App() {
  return (
    <Router basename="/haimoive">
      <AppContent />
    </Router>
  );
}

export default App;
