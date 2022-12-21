import { useState } from 'react';
import * as S from './styled';
import EditProfileTap from '../Components/EditProfileTap';
import EditPwTap from '../Components/EditPwTap';
import MyProfileTap from '../Components/MyProfileTap';

interface State {
  MYPROFILE: string;
  EDITPROFILE: string;
  EDITPW: string;
}
const state: State = {
  MYPROFILE: 'MYPROFILE',
  EDITPROFILE: 'EDITPROFILE',
  EDITPW: 'EDITPW',
};

interface StateTap {
  [index: string]: JSX.Element;
  MYPROFILE: JSX.Element;
  EDITPROFILE: JSX.Element;
  EDITPW: JSX.Element;
}

const stateTap: StateTap = {
  MYPROFILE: <MyProfileTap />,
  EDITPROFILE: <EditProfileTap />,
  EDITPW: <EditPwTap />,
};
const Edit = () => {
  const [mode, setMode] = useState<string>(state.EDITPROFILE);
  const clickHandler = (evt: any) => {
    setMode(evt.target.className);
  };
  return (
    <S.Container>
      <br />
      <S.Tap mode={mode}>
        <span
          onClick={clickHandler}
          className={state.MYPROFILE}
          role="presentation"
        >
          내 정보
        </span>
        |
        <span
          onClick={clickHandler}
          className={state.EDITPROFILE}
          role="presentation"
        >
          프로필 수정
        </span>
        |
        <span
          onClick={clickHandler}
          className={state.EDITPW}
          role="presentation"
        >
          비밀번호 변경
        </span>
      </S.Tap>
      {stateTap[mode]}
    </S.Container>
  );
};

export default Edit;
