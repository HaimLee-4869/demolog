import React from 'react';
import './TermsModal.css';

const TermsModal = ({ show, onHide, onAgree }) => {
  if (!show) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <div className="modal-header">
          <h2>이용약관 및 주의사항</h2>

        </div>
        <div className="modal-body">
          <div className="terms-content">
            <h5>서비스 이용약관 및 주의사항</h5>
            <p>
                1. 이용약관<br/>
                  본 서비스는 영화 정보를 제공하기 위해 TMDB API를 활용합니다. <br/>
                  회원가입 시 제공된 이메일과 비밀번호는 서비스 이용을 위한 인증에 사용되며, 개인 정보는 안전하게 보호됩니다.<br/>
                  회원은 정확한 정보를 입력하여 서비스 이용에 차질이 없도록 해야 합니다.<br/>
                  <br/>
                2. 주의사항<br/>
                  회원가입 시, 반드시 비밀번호란에 TMDB API KEY를 입력해 주셔야 합니다. <br/>
                  해당 API KEY가 입력되지 않으면 영화 데이터가 정상적으로 로딩되지 않아 서비스 이용이 제한될 수 있습니다.<br/>
                  API KEY는 TMDB 계정에서 발급받을 수 있습니다.<br/>
                  <br/>
                3. 책임의 한계<br/>
                  사용자의 부주의로 인한 API Key 누락이나 서비스 이용 불가에 대해 제작자는 책임을 지지 않습니다. <br/>
                  서비스 이용 중 문제가 발생하면 즉시 문의 바랍니다. <br/>
            </p>
          </div>
        </div>
        <div className="modal-footer">
          <button onClick={onHide}>취소</button>
          <button onClick={onAgree} className="agree-button">동의</button>
        </div>
      </div>
    </div>
  );
};

export default TermsModal;