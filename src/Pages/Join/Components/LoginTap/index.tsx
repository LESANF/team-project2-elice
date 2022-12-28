import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { client } from '../../../../axiosInstance';
import { TOKEN } from '../../Atoms';
import * as S from './styled';
import {
  validateEmail,
  validatePw,
  warningEmail,
  warningPw,
  state,
  IsLoginDialog,
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
  useEffect(() => {
    setToken(null);
    console.log(`토큰 초기화${token}`);
  }, []);

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
      const result = await client.post(`/auth/login`, {
        email,
        password: pw,
      });
      setLoginState(state.SUCCESS);
      setToken(result.data.data);
      console.log('토큰', result.data.data, token);

      setFlag(true);
    } catch (err: any) {
      setLoginState(state.ERROR);
      setErrorMessage(err.response.data.message);
      setFlag(true);
    }
  };
  const agreeFn = () => {
    console.log('확인');
    if (loginState === state.SUCCESS) navigate('/menu/maps');
    else setFlag(false);
    return flag;
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
      {flag ? (
        <IsLoginDialog
          flag={flag}
          tapstate={loginState}
          errorMessage={errorMessage}
          agreeFn={agreeFn}
        />
      ) : null}
    </>
  );
};

export default LoginTap;
