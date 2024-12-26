// src/ProtectedRoute/ProtectedRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';
// 예) Redux를 쓰고 있다면:
import { useSelector } from 'react-redux';

function ProtectedRoute({ children }) {
  // 1) Redux 사용 예시 (auth.isAuthenticated 여부 확인)
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  // 2) 혹은 Kakao SDK 직접 사용 예시:
  // const isKakaoLoggedIn = window.Kakao?.Auth?.getAccessToken();

  // 원하는 로직을 적용하세요
  // 여기서는 Redux 방식으로 예시
  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  return children;
}

export default ProtectedRoute;