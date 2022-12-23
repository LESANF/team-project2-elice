import React, {
  useEffect,
  useState,
  forwardRef,
  Ref,
  ReactElement,
} from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import * as S from './styled';
import { TOKEN } from '../../Atoms';
import {
  validateEmail,
  validatePw,
  warningEmail,
  warningPw,
  state,
  LOCAL_URL,
} from '../../Utils';

const Transition = forwardRef(
  (
    props: TransitionProps & {
      children: ReactElement<any, any>;
    },
    ref: Ref<unknown>,
  ) => <Slide direction="up" ref={ref} {...props} />,
);

interface IDialogProps {
  openFlag: boolean;
  title: string | JSX.Element;
  content: string | JSX.Element;
  agreeFn(): any;
  disAgreeFn(): any;
  sizeW?: string | undefined;
  sizeH?: string | undefined;
}
const LoginTitle = (): JSX.Element => (
  <S.Title>
    <img src={`${process.env.PUBLIC_URL}/logo512.png`} alt="로고" />
    포토로그에 오신 것을 환영합니다!
  </S.Title>
);
const LoginContent = (): JSX.Element => {
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
    setErrorMessage('');
    const emailInput = e.target.value;
    setEmail(emailInput);

    if (!validateEmail(emailInput)) {
      setEmailState(state.STRERROR);
    } else {
      setEmailState(state.SUCCESS);
    }
  };
  const changePwHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setErrorMessage('');

    const pwInput = e.target.value;
    console.log(pwInput);
    setpw(pwInput);

    if (!validatePw(pwInput)) {
      setPwState(state.STRERROR);
    } else {
      setPwState(state.SUCCESS);
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
      setFlag(false);
      navigate('/');
    } catch (err: any) {
      console.log('err', err.response.data.message);
      setLoginState(state.ERROR);
      setErrorMessage(err.response.data.message);
      setEmail('');
      setpw('');
      setFlag(true);
    }
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
        <div className="body">
          <input
            placeholder="이메일"
            onChange={changeEmailHandler}
            value={email}
          />
          <div>{warningEmail(emailstate)}</div>
        </div>
      </S.Form>
      <S.Form>
        <div className="title">비밀번호</div>
        <div className="body">
          <input
            type="password"
            placeholder="비밀번호"
            onChange={changePwHandler}
            value={pw}
          />
          <div>{warningPw(pwstate)}</div>
        </div>
      </S.Form>
      <S.Button onClick={clickLoginHandler}>로그인</S.Button>
      <div>{errorMessage}</div>
    </>
  );
};

const DialogTest = (props: IDialogProps) => {
  const { title, content, agreeFn, disAgreeFn, openFlag } = props;
  const setOpen = useState<boolean>(false)[1];
  const [dialogSize, setDialogSize] = useState<{
    sizeW: string | undefined;
    sizeH: string | undefined;
  }>({
    sizeW: '230px',
    sizeH: '170px',
  });

  useEffect(() => {
    if (props.sizeW && props.sizeH)
      setDialogSize((prev) => {
        let prevObj = { ...prev };
        prevObj = { ...prevObj, sizeW: props.sizeW, sizeH: props.sizeH };
        return prevObj;
      });
  }, []);

  const handleClose = (flag: boolean) => {
    setOpen(flag);
  };

  const dialogStyle = {
    sx: {
      width: dialogSize.sizeW,
      height: dialogSize.sizeH,
      borderRadius: '25px',
      padding: '40px',
    },
  };

  return (
    <div>
      <Dialog
        open={openFlag}
        TransitionComponent={Transition}
        keepMounted
        aria-describedby="alert-dialog-slide-description"
        PaperProps={dialogStyle}
      >
        <DialogActions>
          <Button
            onClick={() => handleClose(disAgreeFn())}
            style={{
              fontSize: '35px',
              fontWeight: '40',
            }}
          >
            X
          </Button>
          {/* <Button onClick={() => handleClose(agreeFn())}>확인</Button> */}
        </DialogActions>
        <DialogTitle>
          <LoginTitle />
        </DialogTitle>
        <DialogContent>
          <DialogContentText
            id="alert-dialog-slide-description"
            style={{
              height: '90%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <LoginContent />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const LoginDialog = () => {
  const [flag, setFlag] = useState(false);
  const disAgreeFn = () => {
    console.log('취소');
    setFlag(false);
    return flag;
  };
  return (
    <>
      <button
        onClick={() => {
          setFlag(true);
        }}
      >
        testloginDialog
      </button>
      <DialogTest
        openFlag={flag}
        title="test"
        content="test"
        agreeFn={() => {}}
        disAgreeFn={disAgreeFn}
        sizeW="600px"
        sizeH="800px"
      />
    </>
  );
};
export default LoginDialog;
