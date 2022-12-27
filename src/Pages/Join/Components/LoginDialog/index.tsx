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
// import div from '@mui/material/div';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import FormControl from '@mui/material/FormControl';
import { client } from '../../../../axiosInstance';
import HelperText from '../HelperText';
import * as S from './styled';
import { TOKEN } from '../../Atoms';
import {
  validateEmail,
  validatePw,
  warningEmail,
  warningPw,
  state,
} from '../../Utils';
import { ReactComponent as Favicon } from './favicon.svg';

const Transition = forwardRef(
  (
    props: TransitionProps & {
      children: ReactElement<any, any>;
    },
    ref: Ref<unknown>,
  ) => <Slide direction="up" ref={ref} {...props} />,
);

interface IDialogProps {
  openFlag: any;
  title: string | JSX.Element;
  content: string | JSX.Element;
  agreeFn(): any;
  disAgreeFn(): any;
  sizeW?: string | undefined;
  sizeH?: string | undefined;
}
const LoginTitle = (): JSX.Element => (
  <S.Title>
    <Favicon />
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
    if (emailInput === '') setEmailState(state.NORMAL);
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
    if (pwInput === '') setPwState(state.NORMAL);
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
      setFlag(false);
      navigate('/menu/maps');
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '10px',
      }}
    >
      <FormControl
        sx={{
          width: '42ch',
          height: '100px',
        }}
        style={{ marginTop: '10px' }}
      >
        <S.Input
          margin="normal"
          label="이메일"
          fullWidth
          className="title"
          state={warningEmail(emailstate)}
          onChange={changeEmailHandler}
        />
        <HelperText helper={warningEmail(emailstate)} content={email} />
      </FormControl>
      <FormControl
        sx={{
          width: '42ch',
          height: '100px',
        }}
        style={{ marginTop: '10px' }}
      >
        <S.Input
          type="password"
          margin="normal"
          label="비밀번호"
          fullWidth
          className="title"
          state={warningPw(pwstate)}
          onChange={changePwHandler}
        />
        <HelperText helper={warningPw(pwstate)} content={pw} />
      </FormControl>
      <S.Button onClick={clickLoginHandler}>로그인</S.Button>
      <div>{errorMessage}</div>
    </div>
  );
};

export const DialogTest = (props: IDialogProps) => {
  const { title, content, agreeFn, disAgreeFn, openFlag } = props;
  const setOpen = useState<boolean>(false)[1];
  const [dialogSize, setDialogSize] = useState<{
    sizeW: string | undefined;
    sizeH: string | undefined;
  }>({
    sizeW: '500px',
    sizeH: '600px',
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
  const handleOutsideClose = (event: any, reason: any) => {
    if (reason === 'backdropClick') setOpen(disAgreeFn());
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
        onClose={handleOutsideClose}
      >
        <DialogActions>
          {/* <Button onClick={() => handleClose(agreeFn())}>확인</Button> */}
        </DialogActions>
        <DialogTitle>
          <LoginTitle />
        </DialogTitle>
        <DialogContent>
          <div
            id="alert-dialog-slide-description"
            style={{
              height: '90%',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <LoginContent />
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

const LoginDialog = () => {
  const [flag, setFlag] = useState(true);
  const disAgreeFn = () => {
    console.log('취소');
    setFlag(false);
    return flag;
  };
  return (
    <DialogTest
      openFlag={flag}
      title="test"
      content="test"
      agreeFn={() => {}}
      disAgreeFn={disAgreeFn}
      sizeW="600px"
      sizeH="800px"
    />
  );
};
export default LoginDialog;
