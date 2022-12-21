import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { userState } from '../Join/Atoms';
import * as S from './styled';
import LoginTap from '../Join/Components/LoginTap';
import JoinTap from '../Join/Components/JoinTap';

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
  MYPOST: <LoginTap />,
  MYLIKE: <JoinTap />,
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
      <S.MyPage>
        <img className="profileImg" alt="프로필 사진" src={Image} />
        <div className="profileBody">
          <span className="nickname">{user.nickname}</span>
          <br />
          <span className="email">{user.email}</span>
          <S.Tap mode={mode}>
            <span
              onClick={clickHandler}
              className={state.MYPOST}
              role="presentation"
            >
              나의 사진
            </span>
            |
            <span
              onClick={clickHandler}
              className={state.MYLIKE}
              role="presentation"
            >
              좋아요한 사진
            </span>
          </S.Tap>
        </div>
        <Link to="/edit" className="editbtn">
          <img src={`${process.env.PUBLIC_URL}/edit.png`} alt="설정" />
        </Link>
      </S.MyPage>
      {stateTap[mode]}
    </>
  );
};

export default MyPage;
