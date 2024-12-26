import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Header() {
  const navigate = useNavigate();
  const [kakaoNickname, setKakaoNickname] = useState(null);

  useEffect(() => {
    const storedNickname = localStorage.getItem('kakaoNickname');
    if (storedNickname) {
      setKakaoNickname(storedNickname);
    }
  }, []);

  const handleLogout = () => {
    if (window.Kakao && window.Kakao.isInitialized()) {
      window.Kakao.Auth.logout(() => {
        console.log('카카오 로그아웃 완료');
      });
    }
    localStorage.removeItem('kakaoNickname');
    localStorage.removeItem('kakaoEmail');
    navigate('/signin');
  };

  return (
    <header style={{ background: '#ccc', padding: '10px' }}>
      {kakaoNickname ? (
        <div>
          {kakaoNickname} 님, 안녕하세요!
          <button onClick={handleLogout} style={{ marginLeft: '10px' }}>
            로그아웃
          </button>
        </div>
      ) : (
        <div>
          <button onClick={() => navigate('/signin')}>로그인</button>
        </div>
      )}
    </header>
  );
}

export default Header;
