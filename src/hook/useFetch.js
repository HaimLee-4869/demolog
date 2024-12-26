import { useQuery } from '@tanstack/react-query'; // react-query의 useQuery 훅을 가져옴
import axios from 'axios'; // HTTP 요청을 처리하기 위한 axios 라이브러리

const API_KEY = process.env.REACT_APP_TMDB_API_KEY; // .env 파일에 저장된 TMDB API 키를 가져옴

/**
 * 데이터 패칭을 위한 커스텀 훅
 * @param {string} url - 요청할 API의 기본 URL
 * @param {object} params - 추가적인 쿼리 파라미터 (기본값: 빈 객체)
 * @returns {object} - react-query의 useQuery에서 반환하는 데이터 및 상태 객체
 */
function useFetch(url, params = {}) {
  return useQuery({
    queryKey: [url, params], // 쿼리의 고유 키. URL과 파라미터 조합으로 캐싱 및 업데이트 관리
    queryFn: async () => {
      // URL에 API 키 추가하여 완전한 요청 URL 생성
      const fullUrl = `${url}?api_key=${API_KEY}`;

      // axios를 통해 GET 요청 실행
      const { data } = await axios.get(fullUrl, { params }); // params는 추가 쿼리 파라미터
      return data; // 성공적으로 응답받은 데이터를 반환
    },
    staleTime: 1000 * 60 * 5, // 데이터가 "신선"하다고 간주되는 시간 (5분)
    cacheTime: 1000 * 60 * 30, // 데이터가 캐시에 저장되는 최대 시간 (30분)
    keepPreviousData: true, // 쿼리가 새로 요청될 때 이전 데이터를 유지하여 깜빡임 방지
  });
}

export default useFetch; // useFetch 훅을 기본 내보내기
