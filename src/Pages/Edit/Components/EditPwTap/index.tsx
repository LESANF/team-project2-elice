import { useState } from 'react';
import * as S from './styled';

const EditPwTap = () => {
  const [state, setState] = useState('NORMAL');
  return (
    <>
      <S.Form>
        <div className="title">새 비밀번호</div>
        <div>
          <input type="password" />
          {state === 'ERROR' ? (
            <div>2자이상 8자 이하로 작성해주세요</div>
          ) : null}
        </div>
      </S.Form>
      <S.Form>
        <div className="title">새 비밀번호 확인</div>
        <div>
          <input type="password" />
          {state === 'ERROR' ? (
            <div>2자이상 8자 이하로 작성해주세요</div>
          ) : null}
        </div>
      </S.Form>
      <S.Button>비밀번호 변경</S.Button>
    </>
  );
};

export default EditPwTap;
