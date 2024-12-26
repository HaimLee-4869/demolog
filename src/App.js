import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppContent from './Router';

function App() {
  useEffect(() => {
    // Kakao SDK 초기화
    if (window.Kakao && !window.Kakao.isInitialized()) {
      const KAKAO_KEY = process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY;
      window.Kakao.init(KAKAO_KEY);
      console.log('Kakao SDK initialized:', window.Kakao.isInitialized());
    }
  }, []);

  return (
    <Router basename="/haimoive">
      <AppContent />
    </Router>
  );
}

export default App;
