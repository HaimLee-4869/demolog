// src/SignIn/SignIn.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './SignIn.css';

function SignIn() {
  const navigate = useNavigate();

  /**
   * [카카오 로그인 버튼 클릭] → 팝업 → 사용자 정보 조회
   */
  const handleKakaoLogin = () => {
    if (!window.Kakao) {
      toast.error('Kakao SDK를 로드하지 못했습니다.');
      return;
    }

    // Kakao SDK의 login 함수 호출
    window.Kakao.Auth.login({
      scope: 'profile_nickname, account_email', // 필요한 동의항목
      success: function(authObj) {
        console.log('카카오 로그인 성공!', authObj);

        // 로그인 성공 후 사용자 정보 조회
        window.Kakao.API.request({
          url: '/v2/user/me',
          success: function(res) {
            console.log('카카오 사용자 정보:', res);

            // 닉네임·이메일 등 필요한 정보 추출
            const kakaoNickname = res.kakao_account?.profile?.nickname || '';
            const kakaoEmail = res.kakao_account?.email || '';

            // localStorage 등에 저장 (원하면 Redux 사용 가능)
            localStorage.setItem('kakaoNickname', kakaoNickname);
            localStorage.setItem('kakaoEmail', kakaoEmail);
            localStorage.setItem('kakaoAccessToken', authObj.access_token);

            toast.success(`카카오 로그인 성공! 닉네임: ${kakaoNickname}`);

            // 메인 페이지로 이동
            navigate('/');
          },
          fail: function(error) {
            console.error('카카오 사용자 정보 요청 실패:', error);
            toast.error('카카오 사용자 정보를 불러오지 못했습니다.');
          },
        });
      },
      fail: function(err) {
        console.error('카카오 로그인 실패:', err);
        toast.error('카카오 로그인에 실패했습니다.');
      },
    });
  };

  return (
    <div>
      {/* (선택) 배경 이미지나 스타일 유지 */}
      <div className="bg-image"></div>
      <div className="container">
        <div className="kakao-login-box">
          <h1>카카오 로그인</h1>

          {/* 카카오 로그인 버튼 */}
          <button
            type="button"
            className="kakao-login-btn"
            style={{ backgroundColor: '#FEE500', marginTop: '20px' }}
            onClick={handleKakaoLogin}
          >
            카카오로 로그인
          </button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default SignIn;
