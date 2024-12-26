import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import './Header.css';
import logo from './Haimoivee.png';

function Header() {
  // 상태 관리
  const [isScrolled, setIsScrolled] = useState(false); // 헤더가 스크롤될 때 스타일 적용
  const [isScrollUp, setIsScrollUp] = useState(false); // 사용자가 스크롤을 올리는지 감지
  const [lastScrollY, setLastScrollY] = useState(0); // 마지막 스크롤 위치 저장
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false); // 모바일 메뉴 열림/닫힘 상태
  const [userEmail, setUserEmail] = useState(null); // 로컬 스토리지에서 가져온 사용자 이메일 저장
  const navigate = useNavigate(); // 페이지 이동을 위한 React Router 훅

  // 스크롤 이벤트와 로컬 스토리지에서 이메일 가져오기
  useEffect(() => {
    const handleScroll = () => {
      // 사용자가 일정 위치 이상 스크롤하면 헤더에 스타일 적용
      setIsScrolled(window.scrollY > 50);
      
      // 현재 스크롤 위치와 이전 위치를 비교하여 스크롤 방향 감지
      if (window.scrollY > lastScrollY) {
        setIsScrollUp(true); // 스크롤 다운
      } else {
        setIsScrollUp(false); // 스크롤 업
      }
      setLastScrollY(window.scrollY); // 현재 스크롤 위치를 저장
    };

    // 스크롤 이벤트 추가
    window.addEventListener('scroll', handleScroll);

    // 로컬 스토리지에서 이메일 가져와 상태 업데이트
    const storedEmail = localStorage.getItem('savedEmail');
    if (storedEmail) {
      setUserEmail(storedEmail);
      console.log('Set userEmail state from savedEmail:', storedEmail); // 디버깅용
    }

    // 컴포넌트 언마운트 시 이벤트 제거
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  // 로그아웃 처리 함수
  const removeKey = () => {
    // 로컬 스토리지에서 관련 항목 제거
    localStorage.removeItem('userId');
    localStorage.removeItem('userEmail');
    localStorage.removeItem('savedEmail');
    setUserEmail(null); // 상태 초기화
    navigate('/signin'); // 로그인 페이지로 이동
  };

  // 모바일 메뉴 열림/닫힘 토글 함수
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <div id="container">
      {/* 헤더 영역 */}
      <header
        className={`app-header ${isScrolled ? 'scrolled' : ''} ${isScrollUp ? 'scroll-up' : ''}`}
      >
        {/* 헤더 왼쪽: 로고 및 내비게이션 */}
        <div className="header-left">
          {/* 로고 */}
          <div className="logo">
            <Link to="/">
              <img src={logo} alt="Logo" style={{ height: '50px', width: '50px' }} />
            </Link>
          </div>
          {/* 데스크톱 네비게이션 */}
          <nav className="nav-links desktop-nav">
            <ul>
              <li><Link to="/">홈</Link></li>
              <li><Link to="/popular">대세 콘텐츠</Link></li>
              <li><Link to="/wishlist">내가 찜한 리스트</Link></li>
              <li><Link to="/search">찾아보기</Link></li>
            </ul>
          </nav>
        </div>

        {/* 헤더 오른쪽: 사용자 정보 및 메뉴 버튼 */}
        <div className="header-right">
          {userEmail ? (
            // 사용자가 로그인한 경우 이메일과 로그아웃 버튼 표시
            <div className="user-info">
              <span className="user-email">{userEmail}</span>
              <button className="icon-button logout-button" onClick={removeKey}>
                로그아웃
              </button>
            </div>
          ) : (
            // 로그인하지 않은 경우 사용자 아이콘 버튼 표시
            <button className="icon-button" onClick={() => navigate('/signin')}>
              <FontAwesomeIcon icon={faUser} />
            </button>
          )}
          {/* 모바일 메뉴 열림/닫힘 버튼 */}
          <button className="icon-button mobile-menu-button" onClick={toggleMobileMenu}>
            <FontAwesomeIcon icon={faBars} />
          </button>
        </div>
      </header>

      {/* 모바일 네비게이션 메뉴 */}
      <div className={`mobile-nav ${isMobileMenuOpen ? 'open' : ''}`}>
        {/* 닫기 버튼 */}
        <button className="close-button" onClick={toggleMobileMenu}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
        <nav>
          <ul>
            <li><Link to="/" onClick={toggleMobileMenu}>홈</Link></li>
            <li><Link to="/popular" onClick={toggleMobileMenu}>대세 콘텐츠</Link></li>
            <li><Link to="/wishlist" onClick={toggleMobileMenu}>내가 찜한 리스트</Link></li>
            <li><Link to="/search" onClick={toggleMobileMenu}>찾아보기</Link></li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default Header;
