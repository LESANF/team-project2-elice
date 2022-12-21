import { useState } from 'react';
import * as S from './styled';

const FindPwTap = () => {
  const [state, setState] = useState('NORMAL');
  return (
    <>
      <S.InfoTop>가입되어 있는 이메일 주소를 입력해주세요</S.InfoTop>
      <S.Form>
        <div className="title">이메일</div>
        <div>
          <input type="password" />
          {state === 'ERROR' ? (
            <div>2자이상 8자 이하로 작성해주세요</div>
          ) : null}
        </div>
      </S.Form>

      <S.InfoBottom>
        <ul>
          <li>전송된 메일로 임시 비밀번호가 전송됩니다</li>
          <li>로그인 후 꼭 비밀번호를 변경해주세요</li>
        </ul>
      </S.InfoBottom>

      <S.Button>임시 비밀번호 전송</S.Button>
    </>
  );
};

export default FindPwTap;
