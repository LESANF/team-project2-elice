import { useState } from 'react';
import { motion } from 'framer-motion';
import FormControl from '@mui/material/FormControl';
import OutlinedInput from '@mui/material/OutlinedInput';
import HelperText from '../HelperText';
import { MuiButton } from '../../../../Components/Commons/Header/styled';
import * as S from './styled';
import { ReactComponent as DefaultProfile } from '../../assets/defaultProfile.svg';
import { validatePw, warningPw, IsExist, state } from '../../../Join/Utils';

interface IEditPwProps {
  setMode?: any;
}

const EditPw = ({ setMode }: IEditPwProps) => {
  const [currentPw, setCurrentPw] = useState('');
  const [currentPwstate, setCurrentPwState] = useState(state.NORMAL);
  const [pw, setPw] = useState('');
  const [pwstate, setPwState] = useState(state.NORMAL);
  const [pwconfirm, setPwConfirm] = useState('');
  const [pwconfirmstate, setPwConfirmState] = useState(state.NORMAL);
  console.log(currentPwstate);
  // 현재 비번 input onChange
  const changeCurrentPwHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwInput = e.target.value;
    setCurrentPw(pwInput);
    if (!validatePw(pwInput)) {
      setCurrentPwState(state.STRERROR);
    } else {
      setCurrentPwState(state.SUCCESS);
    }
    if (!pwInput) setCurrentPwState(state.NORMAL);
  };
  //  새 비번 input onChange
  const changePwHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwInput = e.target.value;
    setPw(pwInput);
    if (!validatePw(pwInput)) {
      setPwState(state.STRERROR);
    } else {
      setPwState(state.SUCCESS);
    }
    if (!pwInput) setPwState(state.NORMAL);
  };
  //  새 비번 확인 input onChange
  const changePwConfirmHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const pwconfirmInput = e.target.value;
    setPwConfirm(pwconfirmInput);
    // console.log(pwconfirmInput, pw);
    console.log(warningPw(pwconfirmstate));
    if (pwconfirmInput !== pw) {
      setPwConfirmState(state.NONCONFIRMERROR);
    } else {
      setPwConfirmState(state.SUCCESS);
    }
    if (!pwconfirmInput) setPwConfirmState(state.NORMAL);
  };
  return (
    <S.Container>
      <motion.div layoutId="avatar">
        <DefaultProfile />
      </motion.div>
      <motion.div layoutId="nickname">
        <S.NickName>유저닉네임</S.NickName>
      </motion.div>
      <motion.div layoutId="email">
        <S.Email>photolog@naver.com</S.Email>
      </motion.div>

      <div style={{ height: '3vh' }} />

      <FormControl
        sx={{
          width: '30ch',
          height: '70px',
        }}
      >
        <S.PwInput
          placeholder="현재 비밀번호"
          type="password"
          onChange={changeCurrentPwHandler}
          state={warningPw(currentPwstate)}
          disableUnderline
        />
        <HelperText helper={warningPw(currentPwstate)} content={currentPw} />
      </FormControl>
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
          textColor="#07B8B8"
          hoverBackgroundColor="#f9f9f9"
          onClick={() => {
            setMode('DEFAULT');
          }}
        >
          취소
        </MuiButton>
        <MuiButton
          style={{ marginLeft: '24px' }}
          textColor="#ffffff"
          backgroundColor="#07B8B8"
          hoverBackgroundColor="#00A8A7"
        >
          변경하기
        </MuiButton>
      </div>
    </S.Container>
  );
};

export default EditPw;
