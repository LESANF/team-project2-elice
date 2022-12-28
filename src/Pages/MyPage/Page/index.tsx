// 충우님 코드
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import MypostTap from '../Components/MypostTap';
import MylikeTap from '../Components/MylikeTap';
import { Header } from '../../../Components/Commons/Header';
import Nothing from '../Components/Nothing';
import defaultProfile from '../assets/defaultProfile.png';
import { getUser } from '../../Edit/Utils';
import { TOKEN } from '../../Join/Atoms';
import * as S from './styled';

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
  const [token, setToken] = useRecoilState(TOKEN);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [Image, setImage] = useState('');

  useEffect(() => {
    getUser(token).then((res) => {
      setImage(res.image_url || defaultProfile);
      setNickname(res.profile_nickname);
      setEmail(res.user_email);
    });
  }, []);

  const [mode, setMode] = useState<string>(state.MYPOST);

  return (
    <>
      <Header />
      <S.ProfileContainer>
        <S.Profile>
          <img
            style={{ borderRadius: '75px', width: '150px', height: '150px' }}
            src={Image}
            alt="프사"
          />
          <S.NickName>{nickname}</S.NickName>
          <S.Email>{email}</S.Email>
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
        {/* <Nothing /> */}
      </S.PhotoContainer>
    </>
  );
};

export default MyPage;
