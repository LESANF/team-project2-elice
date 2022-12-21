import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSetRecoilState } from 'recoil';
import axios from 'axios';

import { authenticatedState } from '../../Atoms';
import DialogTest from '../../../../Components/Commons/Dialog';
import * as S from './styled';
import {
  validateEmail,
  validatePw,
  IsExist,
  warningEmail,
  warningPw,
  state,
} from '../../Utils';

const LoginTap = () => {
  const navigate = useNavigate();
  const setAuthenticated = useSetRecoilState(authenticatedState);
  const [emailstate, setEmailState] = useState<string>(state.NORMAL);
  const [pwstate, setPwState] = useState<string>(state.NORMAL);
  const [loginstate, setLoginState] = useState<string>(state.NORMAL);

  const [email, setEmail] = useState<string>('');
  const [pw, setpw] = useState<string>('');

  const [flag, setFlag] = useState<boolean>(false);

  const changeEmailHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailInput = e.target.value;
    console.log(emailInput, await IsExist(emailInput, 'email'));
    if (!validateEmail(emailInput)) {
      setEmailState(state.STRERROR);
    } else if ((await IsExist(emailInput, 'email')) === undefined) {
      setEmailState(state.NONEXISTERROR);
    } else {
      setEmailState(state.SUCCESS);
      setEmail(emailInput);
    }
  };
  const changePwHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwInput = e.target.value;
    console.log(pwInput);
    //  비밀번호 해시 암호화하는거 만들어야함
    if (!validatePw(pwInput)) {
      setPwState(state.STRERROR);
    } else {
      setPwState(state.SUCCESS);
      setpw(pwInput);
    }
  };
  //  로그인 button //  로직 수정 필요
  const clickLoginHandler = async () => {
    try {
      if (emailstate === state.SUCCESS && pwstate === state.SUCCESS) {
        const result = await axios.post(`http://localhost:3232/login`, {
          email,
          password: pw,
        });
        //  토큰
        if (result.data.accessToken) {
          console.log('토큰', result.data.accessToken);
          setAuthenticated(true);
          localStorage.setItem('login-token', result.data.accessToken);
        }
        console.log(result);
        setLoginState(state.SUCCESS);
        setFlag(true);
      } else {
        setLoginState(state.ERROR);
        setFlag(true);
      }
    } catch {
      setLoginState(state.ERROR);
      setFlag(true);
    }
  };
  const agreeFn = () => {
    console.log('확인');
    setFlag(false);
    if (loginstate === state.SUCCESS) navigate(`/`);
    return flag;
  };

  const disAgreeFn = () => {
    console.log('취소');
    setFlag(false);
    if (loginstate === state.SUCCESS) navigate(`/`);
    return flag;
  };
  const dialog = (): JSX.Element => {
    let title = '';
    let content = '';
    if (loginstate === state.SUCCESS) {
      [title, content] = [`로그인 완료`, `로그인이 정상적으로 이루어졌습니다`];
    } else {
      //  일단 이렇게 해둠
      [title, content] = [`로그인 오류`, `일치하는 회원정보가 없습니다`];
    }
    return (
      <DialogTest
        openFlag={flag}
        title={title}
        content={content}
        agreeFn={agreeFn}
        disAgreeFn={disAgreeFn}
        sizeW="700px"
        sizeH="300px"
      />
    );
  };
  return (
    <>
      <S.Form>
        <div
          placeholder="이메일"
          className="title"
          onChange={changeEmailHandler}
        >
          이메일
        </div>
        <div>
          <input placeholder="이메일" onChange={changeEmailHandler} />
          <div>{warningEmail(emailstate)}</div>
        </div>
      </S.Form>
      <S.Form>
        <div className="title">비밀번호</div>
        <div>
          <input
            type="password"
            placeholder="비밀번호"
            onChange={changePwHandler}
          />
          <div>{warningPw(pwstate)}</div>
        </div>
      </S.Form>
      <S.Button onClick={clickLoginHandler}>로그인</S.Button>
      {dialog()}
    </>
  );
};

export default LoginTap;
