import { useState, useRef } from 'react';
import * as S from './styled';

const MyProfileTap = () => {
  const [Image, setImage] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  );
  const [state, setState] = useState('NORMAL');

  return (
    <>
      <S.Form className="editProfile">
        <div className="title">프로필</div>
        <img src={Image} alt="프로필" />
      </S.Form>
      <S.Form>
        <div className="title">닉네임</div>
        <div>
          <input />
          {state === 'ERROR' ? (
            <div>2자이상 8자 이하로 작성해주세요</div>
          ) : null}
        </div>
      </S.Form>
      <S.Form>
        <div className="title">이메일</div>
        <div>
          <input type="password" />
          {state === 'ERROR' ? (
            <div>2자이상 8자 이하로 작성해주세요</div>
          ) : null}
        </div>
      </S.Form>
    </>
  );
};

export default MyProfileTap;
