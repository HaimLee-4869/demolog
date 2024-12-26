import React, { useState, useEffect, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleWishlist } from '../../store/slices/wishlistSlice'; // Wishlist 상태 관리 액션 가져오기
import useFetch from '../../hook/useFetch'; // 데이터 fetch를 위한 커스텀 훅
import './InfiniteScroll.css'; // 스타일 파일

// 무한 스크롤 컴포넌트
function InfiniteScroll({ apiKey, genreCode, sortingOrder, voteEverage }) {
  // `useFetch` 훅을 통해 데이터를 가져옴
  const { data, loading, error } = useFetch(getFetchUrl());

  // 상태 정의
  const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 상태
  const [rowSize, setRowSize] = useState(4); // 테이블 뷰에서 한 페이지의 영화 수
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // 모바일 뷰인지 확인
  const [currentView, setCurrentView] = useState('grid'); // 현재 뷰 모드 ('grid' 또는 'table')
  const [hasMore, setHasMore] = useState(true); // 추가 데이터를 로드할 수 있는지 확인
  const [showTopButton, setShowTopButton] = useState(false); // 'Top' 버튼 표시 여부

  // 참조 변수
  const gridContainerRef = useRef(null); // 그리드 컨테이너 참조
  const loadingTriggerRef = useRef(null); // 로딩 트리거 참조

  // Redux 디스패처 및 상태 접근
  const dispatch = useDispatch(); // Redux 액션 디스패처
  const wishlist = useSelector((state) => state.wishlist.wishlist); // Redux에서 위시리스트 상태 가져오기

  // `useEffect`로 컴포넌트 로드 시 이벤트와 설정 처리
  useEffect(() => {
    setupIntersectionObserver(); // 무한 스크롤을 위한 Intersection Observer 설정
    if (data && data.results) {
      filterAndSetMovies(data.results); // 데이터를 필터링하고 상태에 설정
    }
    handleResize(); // 초기 창 크기 설정
    window.addEventListener('resize', handleResize); // 창 크기 변경 이벤트
    window.addEventListener('scroll', handleScroll); // 스크롤 이벤트

    // 정리(clean-up) 작업
    return () => {
      window.removeEventListener('resize', handleResize); // 리사이즈 이벤트 제거
      window.removeEventListener('scroll', handleScroll); // 스크롤 이벤트 제거
      if (observer.current) {
        observer.current.disconnect(); // Intersection Observer 정리
      }
    };
  }, [data]); // data가 변경될 때마다 실행

  // Intersection Observer 참조
  const observer = useRef(null);

  // API URL 생성
  function getFetchUrl() {
    return genreCode === '0'
      ? 'https://api.themoviedb.org/3/movie/popular' // 인기 영화 API
      : 'https://api.themoviedb.org/3/discover/movie'; // 특정 장르 API
  }

  // Intersection Observer 설정 함수
  const setupIntersectionObserver = () => {
    observer.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore && currentView === 'grid') {
          fetchMoreMovies(); // 추가 데이터 로드
        }
      },
      { rootMargin: '100px', threshold: 0.1 } // 가시성 조건 설정
    );

    if (loadingTriggerRef.current) {
      observer.current.observe(loadingTriggerRef.current); // 로딩 트리거 관찰
    }
  };

  // 데이터 필터링 및 상태 업데이트
  const filterAndSetMovies = (fetchedMovies) => {
    let filteredMovies = fetchedMovies;

    // 정렬 기준에 따른 필터링
    if (sortingOrder !== 'all') {
      filteredMovies = filteredMovies.filter(
        (movie) => movie.original_language === sortingOrder
      );
    }

    // 평점 기준에 따른 필터링
    if (voteEverage !== -1 && voteEverage !== -2) {
      filteredMovies = filteredMovies.filter((movie) => 
        movie.vote_average >= voteEverage && movie.vote_average < voteEverage + 1
      );
    } else if (voteEverage === -2) {
      filteredMovies = filteredMovies.filter((movie) => movie.vote_average <= 4);
    }

    // 필터링된 영화 추가 및 데이터가 더 이상 없는지 확인
    setMovies((prevMovies) => [...prevMovies, ...filteredMovies]);
    if (filteredMovies.length === 0) {
      setHasMore(false);
    }
  };

  // 추가 데이터 로드
  const fetchMoreMovies = () => {
    if (loading || !hasMore) return; // 로딩 중이거나 더 이상 데이터가 없으면 실행 안 함
    setCurrentPage((prevPage) => prevPage + 1); // 다음 페이지 설정
  };

  // 영화 데이터를 상태로 관리
  const [movies, setMovies] = useState([]);

  // 영화 포스터 이미지 URL 생성
  const getImageUrl = (path) => {
    return path ? `https://image.tmdb.org/t/p/w300${path}` : '/placeholder-image.jpg';
  };

  // 창 크기 조정 이벤트 핸들러
  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768); // 모바일 뷰 여부 업데이트
  };

  // 스크롤 이벤트 핸들러
  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    setShowTopButton(scrollTop > 300); // 스크롤 위치에 따라 'Top' 버튼 표시
  };

  // 맨 위로 스크롤 및 영화 목록 초기화
  const scrollToTopAndReset = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
    resetMovies();
  };

  // 영화 목록 초기화
  const resetMovies = () => {
    setMovies([]); // 영화 목록 초기화
    setCurrentPage(1); // 페이지 초기화
    setHasMore(true); // 추가 로드 가능 상태 초기화
  };

  // 위시리스트 추가/제거 핸들러
  const toggleWishlistHandler = (movie) => {
    dispatch(toggleWishlist(movie)); // Redux 액션 호출
  };

  // 영화가 위시리스트에 있는지 확인
  const isInWishlist = (movieId) => {
    return wishlist.some((movie) => movie.id === movieId); // 위시리스트 여부 반환
  };

  // 뷰 전환 핸들러
  const switchView = () => {
    setCurrentView((prevView) => (prevView === 'grid' ? 'table' : 'grid')); // 'grid'와 'table' 전환
    resetMovies(); // 영화 목록 초기화
  };

  return (
    <div>
      {/* 뷰 전환 버튼 */}
      <div className="view-switch" style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 1000 }}>
        <button onClick={switchView}>
          {currentView === 'grid' ? 'Switch to Table View' : 'Switch to Infinite Scroll'}
        </button>
      </div>

      {/* 그리드 뷰 */}
      {currentView === 'grid' ? (
        <div className="movie-grid" ref={gridContainerRef}>
          <div className={`grid-container grid`}>
            {movies.map((movie) => (
              <div
                key={movie.id}
                className="movie-card"
                onClick={() => toggleWishlistHandler(movie)}
              >
                <img src={getImageUrl(movie.poster_path)} alt={movie.title} />
                <div className="movie-title">{movie.title}</div>
                {isInWishlist(movie.id) && (
                  <div className="wishlist-indicator">🌸</div> /* 위시리스트 표시 */
                )}
              </div>
            ))}
          </div>
          <div ref={loadingTriggerRef} className="loading-trigger">
            {loading && hasMore && (
              <div className="loading-indicator">
                <div className="spinner"></div>
                <span>Loading...</span>
              </div>
            )}
          </div>
          {showTopButton && (
            <button onClick={scrollToTopAndReset} className="top-button">
              Top
            </button>
          )}
        </div>
      ) : (
        // 테이블 뷰
        <div className="movie-table">
          <table>
            <thead>
              <tr>
                <th>Poster</th>
                <th>Title</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {movies.slice((currentPage - 1) * rowSize, currentPage * rowSize).map((movie) => (
                <tr key={movie.id} onClick={() => toggleWishlistHandler(movie)}>
                  <td><img src={getImageUrl(movie.poster_path)} alt={movie.title} /></td>
                  <td>{movie.title}</td>
                  <td>{movie.vote_average}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="pagination">
            <button onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} disabled={currentPage === 1}>
              Previous
            </button>
            <span>{currentPage}</span>
            <button onClick={() => setCurrentPage((prev) => prev + 1)} disabled={currentPage === Math.ceil(movies.length / rowSize)}>
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default InfiniteScroll;
