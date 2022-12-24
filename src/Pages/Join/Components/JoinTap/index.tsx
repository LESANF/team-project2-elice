import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import axios from 'axios';
import DialogTest from '../../../../Components/Commons/Dialog';
import * as S from './styled';
import {
  LOCAL_URL,
  validateEmail,
  validatePw,
  warningNickname,
  warningEmail,
  warningPw,
  state,
} from '../../Utils';

const JoinTap = () => {
  const navigate = useNavigate();
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
      const result = await axios.post(`${LOCAL_URL}/users`, {
        nickname,
        email,
        password: pw,
      });
      console.log(result);
      setJoinState(state.SUCCESS);
      setFlag(true);
    } catch (err: any) {
      setJoinState(state.ERROR);
      setErrorMessage(err.response.data.message);
      setFlag(true);
    }
  };

  const agreeFn = () => {
    console.log('확인');
    setFlag(false);
    if (joinstate === state.SUCCESS) navigate(`/`);
    return flag;
  };

  const disAgreeFn = () => {
    console.log('취소');
    setFlag(false);
    if (joinstate === state.SUCCESS) navigate(`/`);
    return flag;
  };
  const dialog = (): JSX.Element => {
    let title = '';
    let content = '';
    if (joinstate === state.SUCCESS) {
      [title, content] = [
        `회원가입 완료`,
        `회원가입이 정상적으로 이루어졌습니다`,
      ];
    } else {
      title = '회원가입 오류';
      [title, content] = ['회원가입 오류', errorMessage];
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
      {dialog()}
    </>
  );
};

export default JoinTap;
