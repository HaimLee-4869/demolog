// src/App.js
import React, { useEffect } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import AppContent from './Router';

function App() {
  useEffect(() => {
    // 카카오 SDK 초기화
    const KAKAO_KEY = process.env.REACT_APP_KAKAO_JAVASCRIPT_KEY;
    if (window.Kakao && !window.Kakao.isInitialized()) {
      window.Kakao.init(KAKAO_KEY);
      console.log('Kakao init success:', window.Kakao.isInitialized());
    }
  }, []);

  return (
    <Router basename="/haimoive">
      <AppContent />
    </Router>
  );
}

export default App;
