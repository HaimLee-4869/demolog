import React from 'react';
import Banner from '../../../components/Banner/Banner';
import Home from '../../../components/Home/Home';
import URLService from '../../../services/Url';
import { useQuery } from '@tanstack/react-query';

function HomeMain() {
  const urlService = new URLService(); // URL 생성 및 API 호출 서비스를 초기화

  // 인기 영화 데이터를 가져오는 쿼리
  const {
    data: featuredMovie, // 데이터를 featuredMovie로 명명
    isLoading, // 로딩 상태
    isError, // 오류 발생 여부
    error, // 오류 객체
  } = useQuery({
    queryKey: ['featuredMovies'], // 쿼리를 고유하게 식별하기 위한 키
    queryFn: () => urlService.fetchPopularMovies(1), // 인기 영화 데이터 가져오기 (페이지 1 기준)
    select: (data) => data[0], // 첫 번째 영화를 선택해 featuredMovie로 설정
    staleTime: 1000 * 60 * 4, // 데이터가 신선하다고 간주되는 시간 (4분)
    cacheTime: 1000 * 60 * 25, // 데이터가 캐시에 유지되는 시간 (25분)
  });

  // 애니메이션 영화 데이터를 가져오는 쿼리
  const {
    data: animationMovies, // 데이터를 animationMovies로 명명
    isLoading: isLoadingAnimation, // 로딩 상태
    isError: isErrorAnimation, // 오류 발생 여부
    error: errorAnimation, // 오류 객체
  } = useQuery({
    queryKey: ['animationMovies'], // 쿼리를 고유하게 식별하기 위한 키
    queryFn: () => urlService.fetchMoviesByGenre(16, 1), // 애니메이션 장르 ID(16)로 영화 데이터 가져오기
    staleTime: 1000 * 60 * 4, // 데이터가 신선하다고 간주되는 시간 (4분)
    cacheTime: 1000 * 60 * 25, // 데이터가 캐시에 유지되는 시간 (25분)
  });

  // 다큐멘터리 영화 데이터를 가져오는 쿼리
  const {
    data: documentaryMovies, // 데이터를 documentaryMovies로 명명
    isLoading: isLoadingDocumentary, // 로딩 상태
    isError: isErrorDocumentary, // 오류 발생 여부
    error: errorDocumentary, // 오류 객체
  } = useQuery({
    queryKey: ['documentaryMovies'], // 쿼리를 고유하게 식별하기 위한 키
    queryFn: () => urlService.fetchMoviesByGenre(99, 1), // 다큐멘터리 장르 ID(99)로 영화 데이터 가져오기
    staleTime: 1000 * 60 * 4, // 데이터가 신선하다고 간주되는 시간 (4분)
    cacheTime: 1000 * 60 * 25, // 데이터가 캐시에 유지되는 시간 (25분)
  });

  // 로딩 중일 때 보여줄 메시지
  if (isLoading) return <p>영화를 불러오는 중...</p>;
  if (isError) return <p>영화를 불러오는 중 오류 발생: {error.message}</p>;

  if (isLoadingAnimation) return <p>애니메이션 영화를 불러오는 중...</p>;
  if (isErrorAnimation) return <p>애니메이션 영화 로드 중 오류: {errorAnimation.message}</p>;

  if (isLoadingDocumentary) return <p>다큐멘터리 영화를 불러오는 중...</p>;
  if (isErrorDocumentary) return <p>다큐멘터리 영화 로드 중 오류: {errorDocumentary.message}</p>;

  // 데이터를 모두 로드한 후 화면에 표시
  return (
    <div>
      <Banner movie={featuredMovie} /> {/* 첫 번째 영화 데이터를 배너로 표시 */}
      <Home title="대세 영화" fetchUrl={urlService.getURL4PopularMovies()} /> {/* 인기 영화 섹션 */}
      <Home title="최신 영화" fetchUrl={urlService.getURL4ReleaseMovies()} /> {/* 최신 영화 섹션 */}
      <Home title="대세 애니메이션 영화" fetchUrl={urlService.getURL4GenreMovies(16)} /> {/* 애니메이션 섹션 */}
      <Home title="인기 다큐멘터리" fetchUrl={urlService.getURL4GenreMovies(99)} /> {/* 다큐멘터리 섹션 */}
    </div>
  );
}

export default HomeMain; // 컴포넌트를 기본 내보내기
