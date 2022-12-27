import { useState } from 'react';
import { useRecoilState } from 'recoil';

import FormControl from '@mui/material/FormControl';
import HelperText from '../HelperText';
import { MuiButton } from '../../../../Components/Commons/Header/styled';
import * as S from './styled';
import DialogTest from '../../../../Components/Commons/Dialog';
import { TOKEN } from '../../../Join/Atoms';

import { validatePw, warningPw, state } from '../../../Join/Utils';
import { accessClient } from '../../../../axiosInstance';

interface IEditPwProps {
  setMode?: any;
}

const EditPw = ({ setMode }: IEditPwProps) => {
  const [token, setToken] = useRecoilState(TOKEN);
  const [pw, setPw] = useState('');
  const [pwstate, setPwState] = useState(state.NORMAL);
  const [pwconfirm, setPwConfirm] = useState('');
  const [pwconfirmstate, setPwConfirmState] = useState(state.NORMAL);
  const [editpwstate, setEditPwState] = useState(state.NORMAL);

  const [flag, setFlag] = useState<boolean>(false);

  //  새 비번 input onChange
  const changePwHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwInput = e.target.value;
    if (!validatePw(pwInput)) {
      setPwState(state.STRERROR);
    } else {
      setPwState(state.SUCCESS);
      setPw(pwInput);
    }
  };
  //  새 비번 확인 input onChange
  const changePwConfirmHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwconfirmInput = e.target.value;
    console.log(warningPw(pwconfirmstate));
    if (pwconfirmInput !== pw) {
      setPwConfirmState(state.NONCONFIRMERROR);
    } else {
      setPwConfirmState(state.SUCCESS);
      setPwConfirm(pwconfirmInput);
    }
    if (!pwconfirmInput) setPwConfirmState(state.NORMAL);
  };

  // 비밀번호 변경 버튼
  const clickEditPwHandler = async () => {
    if (pwstate === state.SUCCESS && pwconfirmstate === state.SUCCESS) {
      const result = await accessClient(token).patch(`users/password`, {
        password: pw,
      });

      console.log(result);
      setEditPwState(state.SUCCESS);
      setFlag(true);
    } else {
      setEditPwState(state.ERROR);
      setFlag(true);
    }
  };

  const agreeFn = () => {
    console.log('확인');
    setFlag(false);
    setMode('DEFAULT');
    return flag;
  };

  const disAgreeFn = () => {
    console.log('취소');
    setFlag(false);
    setMode('DEFAULT');
    return flag;
  };
  const dialog = (): JSX.Element => {
    let title = '';
    let content = '';
    if (editpwstate === state.SUCCESS) {
      [title, content] = [
        `비밀번호 변경`,
        `비밀번호 변경이 정상적으로 이루어졌습니다`,
      ];
    } else {
      //  일단 이렇게 해둠
      [title, content] = [
        `비밀번호 변경 오류`,
        `비밀번호가 정상적으로 변경되지 않았습니다.`,
      ];
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
    <S.Container>
      <div style={{ height: '3vh' }} />

      <FormControl
        sx={{
          width: '30ch',
          height: '70px',
          display: 'flex',
          alignItems: 'center',
        }}
      >
        <S.PwInput
          placeholder="새 비밀번호"
          type="password"
          onChange={changePwHandler}
          state={warningPw(pwstate)}
          disableUnderline
        />
        <HelperText helper={warningPw(pwstate)} content={pw} />
      </FormControl>
      <FormControl
        sx={{
          width: '30ch',
          height: '70px',
        }}
      >
        <S.PwInput
          placeholder="비밀번호 확인"
          type="password"
          onChange={changePwConfirmHandler}
          state={warningPw(pwconfirmstate)}
          disableUnderline
        />
        <HelperText helper={warningPw(pwconfirmstate)} content={pwconfirm} />
      </FormControl>

      <div>
        <MuiButton
          style={{ width: '93px', marginTop: '44px;' }}
          textcolor="#07B8B8"
          hoverbackgroundcolor="#f9f9f9"
          onClick={() => {
            setMode('DEFAULT');
          }}
        >
          취소
        </MuiButton>
        <MuiButton
          style={{ marginLeft: '24px' }}
          textcolor="#ffffff"
          backgroundcolor="#07B8B8"
          hoverbackgroundcolor="#00A8A7"
          onClick={clickEditPwHandler}
        >
          변경하기
        </MuiButton>
      </div>
      {dialog()}
    </S.Container>
  );
};

export default EditPw;
