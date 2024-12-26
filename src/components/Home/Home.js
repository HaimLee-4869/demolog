import React, { useState, useEffect } from 'react';
import useFetch from '../../services/useFetch';
import URLService from '../../services/Url';

function Home({ title, fetchUrl }) {
  // `useFetch` 훅으로 데이터를 가져오기
  const { data, loading, error } = useFetch(fetchUrl); // 영화 데이터를 가져옴
  const [movies, setMovies] = useState([]); // 영화 목록 상태 관리
  const [genres, setGenres] = useState({}); // 장르 데이터를 맵 형태로 저장

  // URLService 객체를 메모이제이션하여 불필요한 재생성을 방지
  const urlService = React.useMemo(() => new URLService(), []);

  // 장르 데이터를 가져오는 비동기 함수
  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const genresData = await urlService.fetchGenres(); // URLService에서 장르 데이터 가져오기
        const genresMap = {};
        genresData.forEach((genre) => {
          genresMap[genre.id] = genre.name; // 장르 데이터를 ID와 이름 매핑
        });
        setGenres(genresMap); // 상태에 저장
      } catch (error) {
        console.error("Error fetching genres:", error); // 에러 발생 시 로그 출력
      }
    };

    fetchGenres(); // 장르 데이터 가져오기 실행
  }, [urlService]); // urlService가 변경될 때만 재실행

  // 영화 데이터를 가져오면 상태에 저장
  useEffect(() => {
    if (data) {
      setMovies(data.results); // API 응답의 `results`를 movies 상태로 설정
    }
  }, [data]); // data가 업데이트될 때마다 실행

  // 영화 포스터 이미지를 생성하는 헬퍼 함수
  const getImageUrl = (path) => {
    return `https://image.tmdb.org/t/p/w300${path}`; // TMDB의 기본 이미지 URL 형식
  };

  // 로딩 상태일 때 표시할 컴포넌트
  if (loading) {
    return (
      <div className="movie-row flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">{title}</h2> {/* 섹션 제목 */}
        <div className="loading-spinner">Loading...</div> {/* 로딩 메시지 */}
      </div>
    );
  }

  // 에러 상태일 때 표시할 컴포넌트
  if (error) {
    return (
      <div className="movie-row flex flex-col items-center">
        <h2 className="text-2xl font-bold mb-4">{title}</h2> {/* 섹션 제목 */}
        <div className="text-red-500">Failed to load movies.</div> {/* 에러 메시지 */}
      </div>
    );
  }

  // 정상적으로 데이터를 로드했을 때 렌더링할 컴포넌트
  return (
    <div className="movie-row flex flex-col items-center">
      {/* 섹션 제목 */}
      <h2 className="text-2xl font-bold mb-4">{title}</h2>
      {/* 영화 목록을 그리드 형태로 렌더링 */}
      <div className="grid grid-cols-3 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.id} // 영화의 고유 ID를 키로 사용
            className="col-start-1 movie-card cursor-pointer overflow-hidden rounded-lg relative transform transition-transform duration-300 hover:scale-105"
          >
            {/* 영화 포스터 이미지 */}
            <img
              src={getImageUrl(movie.poster_path)} // TMDB API를 사용한 이미지 URL 생성
              alt={movie.title} // 영화 제목을 대체 텍스트로 설정
              className="w-full h-full object-cover"
            />
            {/* 영화 카드 오버레이 (호버 시 표시) */}
            <div className="movie-overlay absolute inset-0 bg-black bg-opacity-80 text-white opacity-0 transition-opacity duration-300 hover:opacity-100 flex flex-col justify-center items-center p-4">
              <h3 className="text-lg font-semibold mb-2">{movie.title}</h3> {/* 영화 제목 */}
              <p className="text-sm mb-1">{movie.overview}</p> {/* 영화 줄거리 */}
              <p className="text-sm">평점: {movie.vote_average}</p> {/* 영화 평점 */}
              <p className="text-sm">개봉일: {movie.release_date}</p> {/* 영화 개봉일 */}
              <p className="text-sm">
                장르: {movie.genre_ids.map((id) => genres[id]).join(', ')} {/* 영화 장르 */}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
