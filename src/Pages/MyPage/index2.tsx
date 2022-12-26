import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '../Join/Atoms';
import * as S from './styled';
import MypostTap from './Components/MypostTap';
import MylikeTap from './Components/MylikeTap';
import { Header } from '../../Components/Commons/Header';
import Nothing from './Components/Nothing';
import defaultProfile from './assets/defaultProfile.png';

interface IState {
  MYPOST: string;
  MYLIKE: string;
}
const state: IState = {
  MYPOST: 'MYPOST',
  MYLIKE: 'MYLIKE',
};

interface StateTap {
  [index: string]: JSX.Element;
  MYPOST: JSX.Element;
  MYLIKE: JSX.Element;
}

const stateTap: StateTap = {
  MYPOST: <MypostTap />,
  MYLIKE: <MylikeTap />,
};
const MyPage = () => {
  const [user, setUser] = useRecoilState(userState);

  const [Image, setImage] = useState<string>(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  );
  const [mode, setMode] = useState<string>(state.MYPOST);
  const clickHandler = (evt: any) => {
    setMode(evt.target.className);
  };
  return (
    <>
      <Header />
      <S.ProfileContainer>
        <S.Profile>
          <img width="150px" height="150px" src={defaultProfile} alt="프사" />
          <S.NickName>유저닉네임</S.NickName>
          <S.Email>photolog@naver.com</S.Email>
          <S.ChangeMode
            onClick={() => {
              setMode('MYPOST');
            }}
          >
            나의 사진
          </S.ChangeMode>
          <S.ChangeMode
            onClick={() => {
              setMode('MYLIKE');
            }}
          >
            좋아요 한 사진
          </S.ChangeMode>
        </S.Profile>
      </S.ProfileContainer>

      <S.PhotoContainer>
        {stateTap[mode]}
        <Nothing />
      </S.PhotoContainer>
    </>
  );
};

export default MyPage;
