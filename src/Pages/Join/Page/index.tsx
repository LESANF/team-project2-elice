import { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import { motion, AnimatePresence } from 'framer-motion';
import * as S from './styled';
import LoginTap from '../Components/LoginTap';
import JoinTap from '../Components/JoinTap';
import FindPwTap from '../Components/FindPwTap';
import SelectWrapper from '../../../Components/Commons/SelectBox';
import InputWrapper from '../../../Components/Commons/Input';
import { Header, HeaderForPost } from '../../../Components/Commons/Header';
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
  const taps = [
    { label: '로그인', mode: state.LOGIN },
    { label: '회원가입', mode: state.JOIN },
    { label: '비밀번호 찾기', mode: state.FINDPW },
  ];
  return (
    <>
      <HeaderForPost />
      <S.Container>
        <S.TapItems>
          {taps.map((item) => (
            <S.TapItem
              key={item.mode}
              onClick={() => {
                setMode(item.mode);
              }}
            >
              {item.label}
              {mode === item.mode ? (
                <S.TapUnderline layoutId="underline" />
              ) : null}
            </S.TapItem>
          ))}
        </S.TapItems>
        <AnimatePresence mode="wait">
          <motion.div
            key={mode}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.2 }}
          >
            {stateTap[mode]}
          </motion.div>
        </AnimatePresence>
      </S.Container>
    </>
  );
};

export default Join;
