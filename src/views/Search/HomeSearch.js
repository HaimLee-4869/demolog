import React, { useState } from 'react';
import MovieSearch from '../../components/Search/Search';
import InfiniteScroll from '../../components/InfiniteScroll/InfiniteScroll';
import './HomeSearch.css';

function HomeSearch() {
  const apiKey = localStorage.getItem('TMDb-Key') || ''; // 로컬 스토리지에서 API 키 가져오기
  const [genreId, setGenreId] = useState('28'); // 초기 장르 ID는 'Action'으로 설정
  const [ageId, setAgeId] = useState(-1); // 초기 평점 필터는 전체로 설정
  const [sortId, setSortId] = useState('all'); // 초기 정렬은 언어 전체로 설정

  // 장르 선택 코드 매핑
  const genreCode = {
    '장르 (전체)': '0',
    Action: '28',
    Adventure: '12',
    Comedy: '35',
    Crime: '80',
    Family: '10751',
  };

  // 정렬 기준 코드 매핑
  const sortingCode = {
    '언어 (전체)': 'all',
    영어: 'en',
    한국어: 'ko',
  };

  // 평점 범위 코드 매핑
  const ageCode = {
    '평점 (전체)': -1,
    '9~10': 9,
    '8~9': 8,
    '7~8': 7,
    '6~7': 6,
    '5~6': 5,
    '4~5': 4,
    '4점 이하': -2,
  };

  /**
   * 사용자가 선택한 옵션을 업데이트하는 함수
   * @param {object} options - 사용자 입력 옵션
   */
  const changeOptions = (options) => {
    setGenreId(genreCode[options.originalLanguage]); // 장르 ID 업데이트
    setAgeId(ageCode[options.translationLanguage]); // 평점 필터 업데이트
    setSortId(sortingCode[options.sorting]); // 정렬 기준 업데이트
  };

  return (
    <div className="container-search">
      <div className="container-search-bar">
        {/* 검색 컴포넌트를 렌더링하고 옵션 변경 함수 전달 */}
        <MovieSearch changeOptions={changeOptions} />
      </div>
      <div className="content-search">
        {/* 무한 스크롤 컴포넌트를 렌더링하고 필터링된 옵션 전달 */}
        <InfiniteScroll
          apiKey={apiKey}
          genreCode={genreId}
          sortingOrder={sortId}
          voteEverage={ageId}
        />
      </div>
    </div>
  );
}

export default HomeSearch; // HomeSearch 컴포넌트를 기본 내보내기
