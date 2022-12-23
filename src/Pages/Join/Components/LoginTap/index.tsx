import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import axios from 'axios';

import { authenticatedState, userState, TOKEN } from '../../Atoms';
import DialogTest from '../../../../Components/Commons/Dialog';
import * as S from './styled';
import {
  validateEmail,
  validatePw,
  warningEmail,
  warningPw,
  state,
  LOCAL_URL,
} from '../../Utils';

const LoginTap = () => {
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(TOKEN);
  const [emailstate, setEmailState] = useState<string>(state.NORMAL);
  const [pwstate, setPwState] = useState<string>(state.NORMAL);
  const [loginState, setLoginState] = useState<string>(state.NORMAL);

  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [email, setEmail] = useState<string>('');
  const [pw, setpw] = useState<string>('');

  const [flag, setFlag] = useState<boolean>(false);

  const changeEmailHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailInput = e.target.value;
    if (!validateEmail(emailInput)) {
      setEmailState(state.STRERROR);
    } else {
      setEmailState(state.SUCCESS);
      setEmail(emailInput);
    }
  };
  const changePwHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwInput = e.target.value;
    console.log(pwInput);
    if (!validatePw(pwInput)) {
      setPwState(state.STRERROR);
    } else {
      setPwState(state.SUCCESS);
      setpw(pwInput);
    }
  };
  //  로그인 button
  const clickLoginHandler = async () => {
    if (!(emailstate === state.SUCCESS && pwstate === state.SUCCESS)) {
      console.log('다시');
      return;
    }
    try {
      const result = await axios.post(`${LOCAL_URL}/auth/login`, {
        email,
        password: pw,
      });
      setLoginState(state.SUCCESS);
      setToken(result.data.token);
      setFlag(true);
    } catch (err: any) {
      setLoginState(state.ERROR);
      setErrorMessage(err.response.data.message);
      setFlag(true);
    }
  };
  const agreeFn = () => {
    console.log('확인');
    setFlag(false);
    navigate(loginState === state.SUCCESS ? '/' : '/join');
    return flag;
  };

  const disAgreeFn = () => {
    console.log('취소');
    setFlag(false);
    navigate(loginState === state.SUCCESS ? '/' : '/join');
    return flag;
  };
  const dialog = (): JSX.Element => {
    let title = '';
    let content = '';
    if (loginState === state.SUCCESS) {
      [title, content] = [`로그인 성공`, `로그인이 정상적으로 이루어졌습니다`];
    } else {
      [title, content] = [`로그인 오류`, errorMessage];
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
