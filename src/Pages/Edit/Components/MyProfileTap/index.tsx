import { useState, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { userState } from '../../../Join/Atoms';
import * as S from './styled';

const MyProfileTap = () => {
  const [user, setUser] = useRecoilState(userState);

  const [Image, setImage] = useState<string>(
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
        <div>{user.nickname}</div>
      </S.Form>
      <S.Form>
        <div className="title">이메일</div>
        <div>{user.email}</div>
      </S.Form>
    </>
  );
};

export default MyProfileTap;
