import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import * as S from './styled';
import LoginTap from '../Components/LoginTap';
import JoinTap from '../Components/JoinTap';
import FindPwTap from '../Components/FindPwTap';
import { Header } from '../../../Components/Commons/Header';
import { MODE } from '../Atoms';

interface IState {
  LOGIN: string;
  JOIN: string;
  FINDPW: string;
}
const state: IState = {
  LOGIN: 'login',
  JOIN: 'join',
  FINDPW: 'findpw',
};

interface IStateTap {
  [index: string]: JSX.Element;
  login: JSX.Element;
  join: JSX.Element;
  findpw: JSX.Element;
}

const stateTap: IStateTap = {
  login: <LoginTap />,
  join: <JoinTap />,
  findpw: <FindPwTap />,
};
const Join = () => {
  const [mode, setMode] = useRecoilState<string>(MODE);
  const clickHandler = (evt: any) => {
    setMode(evt.target.className);
  };
  return (
    <>
      <Header />
      <S.Container>
        <br />
        <S.Tap mode={mode}>
          <span
            onClick={clickHandler}
            className={state.LOGIN}
            role="presentation"
          >
            로그인
          </span>
          |
          <span
            onClick={clickHandler}
            className={state.JOIN}
            role="presentation"
          >
            회원가입
          </span>
          |
          <span
            onClick={clickHandler}
            className={state.FINDPW}
            role="presentation"
          >
            비밀번호 찾기
          </span>
        </S.Tap>
        {stateTap[mode]}
      </S.Container>
    </>
  );
};

export default Join;
