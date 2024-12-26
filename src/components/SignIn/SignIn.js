import React from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SignIn() {
  const navigate = useNavigate();

  const handleKakaoLogin = () => {
    if (!window.Kakao) {
      toast.error('Kakao SDK가 로드되지 않았습니다.');
      return;
    }
    if (!window.Kakao.isInitialized()) {
      toast.error('Kakao SDK가 초기화되지 않았습니다.');
      return;
    }

    window.Kakao.Auth.login({
      scope: 'profile_nickname, account_email',
      success: (authObj) => {
        console.log('카카오 로그인 성공:', authObj);

        window.Kakao.API.request({
          url: '/v2/user/me',
          success: (res) => {
            console.log('카카오 사용자 정보:', res);

            const nickname = res.kakao_account?.profile?.nickname || '';
            const email = res.kakao_account?.email || '';

            // 사용자 정보 저장
            localStorage.setItem('kakaoNickname', nickname);
            localStorage.setItem('kakaoEmail', email);

            navigate('/');
          },
          fail: (err) => {
            console.error(err);
            toast.error('사용자 정보 조회 실패');
          },
        });
      },
      fail: (err) => {
        console.error(err);
        toast.error('카카오 로그인 실패');
      },
    });
  };

  return (
    <div style={{ margin: 20 }}>
      <h1>카카오 로그인</h1>
      <button onClick={handleKakaoLogin} style={{ fontSize: '1rem' }}>
        카카오로 로그인
      </button>
    </div>
  );
}

export default SignIn;
