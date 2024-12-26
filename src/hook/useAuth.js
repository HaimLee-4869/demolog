import { useSelector, useDispatch } from 'react-redux'; 
import { loginUser, registerUser, logout } from '../store/slices/authSlice'; // Redux 슬라이스에서 액션 및 상태 가져오기

/**
 * `useAuth`는 인증 관련 로직을 캡슐화한 커스텀 훅입니다.
 * Redux를 활용해 로그인, 회원가입, 로그아웃 상태 및 동작을 관리합니다.
 */
function useAuth() {
  const dispatch = useDispatch(); // Redux 액션을 디스패치하기 위한 함수
  const { isAuthenticated, user, loading, error } = useSelector((state) => state.auth); 
  // Redux 상태를 선택하여 인증 상태, 사용자 정보, 로딩 상태, 오류를 가져옴

  /**
   * 사용자 로그인 처리 함수
   * @param {string} email - 사용자의 이메일
   * @param {string} password - 사용자의 비밀번호
   * @returns {Object} - 로그인 성공 시 반환된 사용자 데이터
   * @throws {Error} - 로그인 실패 시 발생한 오류
   */
  const handleLogin = async (email, password) => {
    try {
      // `loginUser` 액션 디스패치 및 결과 처리
      const response = await dispatch(loginUser({ email, password })).unwrap(); 
      // `.unwrap()`은 비동기 Thunk 액션의 성공 또는 실패 결과를 반환
      return response; // 성공적인 로그인 결과 반환
    } catch (err) {
      console.error("Login error:", err); // 로그인 실패 시 오류 로그 출력
      throw err; // 오류를 호출한 함수로 다시 전달
    }
  };

  /**
   * 사용자 회원가입 처리 함수
   * @param {string} email - 사용자의 이메일
   * @param {string} password - 사용자의 비밀번호
   * @returns {Object} - 회원가입 성공 시 반환된 사용자 데이터
   * @throws {Error} - 회원가입 실패 시 발생한 오류
   */
  const handleRegister = async (email, password) => {
    try {
      // `registerUser` 액션 디스패치 및 결과 처리
      const response = await dispatch(registerUser({ email, password })).unwrap();
      return response; // 성공적인 회원가입 결과 반환
    } catch (err) {
      console.error("Register error:", err); // 회원가입 실패 시 오류 로그 출력
      throw err; // 오류를 호출한 함수로 다시 전달
    }
  };

  /**
   * 사용자 로그아웃 처리 함수
   * 로그아웃 액션을 디스패치하여 Redux 상태 초기화
   */
  const handleLogout = () => {
    dispatch(logout()); // `logout` 액션 디스패치
  };

  /**
   * `useAuth` 훅이 반환하는 값
   * - `isAuthenticated`: 현재 사용자 인증 여부 (true/false)
   * - `user`: 현재 인증된 사용자 정보
   * - `loading`: 인증 관련 로딩 상태
   * - `error`: 인증 관련 오류 메시지
   * - `handleLogin`: 로그인 처리 함수
   * - `handleRegister`: 회원가입 처리 함수
   * - `handleLogout`: 로그아웃 처리 함수
   */
  return {
    isAuthenticated, // 인증 여부
    user,            // 사용자 정보
    loading,         // 로딩 상태
    error,           // 오류 상태
    handleLogin,     // 로그인 함수
    handleRegister,  // 회원가입 함수
    handleLogout,    // 로그아웃 함수
  };
}

export default useAuth;
