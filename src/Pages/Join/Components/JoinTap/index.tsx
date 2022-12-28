import { useState } from 'react';
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';

import { client } from '../../../../axiosInstance';
import * as S from './styled';
import {
  validateEmail,
  validatePw,
  warningNickname,
  warningEmail,
  warningPw,
  state,
  IsJoinDialog,
} from '../../Utils';
import { MODE, TOKEN } from '../../Atoms';

const JoinTap = () => {
  const [token, setToken] = useRecoilState(TOKEN);
  const navigate = useNavigate();
  const [mode, setMode] = useRecoilState(MODE);
  const [nicknamestate, setNicknameState] = useState<string>(state.NORMAL);
  const [emailstate, setEmailState] = useState<string>(state.NORMAL);
  const [pwstate, setPwState] = useState<string>(state.NORMAL);
  const [joinstate, setJoinState] = useState<string>(state.NORMAL);

  const [successMessage, setSuccessMessage] = useState<string>('');
  const [errorMessage, setErrorMessage] = useState<string>('');

  const [nickname, setNickname] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [pw, setpw] = useState<string>('');

  const [flag, setFlag] = useState<boolean>(false);

  const changeNickNameHandler = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const nickNameInput = e.target.value;
    console.log(nickNameInput);
    if (nickNameInput.length < 2 || nickNameInput.length > 8) {
      setNicknameState(state.STRERROR);
    } else {
      setNicknameState(state.SUCCESS);
      setNickname(nickNameInput);
    }
  };

  const changeEmailHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailInput = e.target.value;
    console.log(emailInput);
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

  //  회원가입 button
  const clickJoinHandler = async () => {
    if (
      !(
        nicknamestate === state.SUCCESS &&
        emailstate === state.SUCCESS &&
        pwstate === state.SUCCESS
      )
    ) {
      return;
    }
    try {
      const result = await client.post(`/users`, {
        nickname,
        email,
        password: pw,
      });
      console.log(result);
      const loginresult = await client.post(`/auth/login`, {
        email,
        password: pw,
      });
      setToken(loginresult.data.data);
      setJoinState(state.SUCCESS);
      setFlag(true);
    } catch (err: any) {
      setJoinState(state.ERROR);
      setErrorMessage(err.response.data.message);
      setFlag(true);
    }
  };

  const agreeFn = async () => {
    console.log('확인');
    setFlag(false);
    if (joinstate === state.SUCCESS) navigate('/menu/maps');
    navigate('/menu/maps');
    return flag;
  };

  return (
    <>
      <S.Form>
        <div className="title">닉네임</div>
        <div>
          <input placeholder="닉네임" onChange={changeNickNameHandler} />
          <div>{warningNickname(nicknamestate)}</div>
        </div>
      </S.Form>
      <S.Form>
        <div className="title">이메일</div>
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
      <S.Button onClick={clickJoinHandler}>회원가입</S.Button>
      {flag ? (
        <IsJoinDialog
          flag={flag}
          tapstate={joinstate}
          errorMessage={errorMessage}
          agreeFn={agreeFn}
        />
      ) : null}
    </>
  );
};

export default JoinTap;
