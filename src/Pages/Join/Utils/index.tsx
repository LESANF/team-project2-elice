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
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import { useRecoilState } from 'recoil';
import { TOKEN } from '../Atoms';
import { getUser } from '../../Edit/Utils';

interface IState {
  NORMAL: string; // 입력 전
  SUCCESS: string; //  성공
  STRERROR: string; // 길이 문법 오류
  EXISTERROR: string; // 중복오류
  NONEXISTERROR: string; // 일치하는 정보 없음 오류
  NONCONFIRMERROR: string;
  ERROR: string;
}
export const state: IState = {
  NORMAL: 'NORMAL', // 입력 전
  SUCCESS: 'SUCCESS',
  STRERROR: 'STRERROR',
  EXISTERROR: 'EXISTERROR', // 회원가입
  NONEXISTERROR: 'NONEXISTERROR', // 로그인
  NONCONFIRMERROR: 'NONCONFIRMERROR', // 비밀번호 확인 불일치
  ERROR: 'ERROR',
};
export const validateEmail = (i: string) =>
  String(i)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
export const validatePw = (i: string) =>
  String(i).match(/^(?=.*?[A-Z])(?=.*?[0-9]).{8,16}$/);

//  경고문구
export const warningNickname = (s: string) => {
  let warning = '';
  switch (s) {
    case state.STRERROR:
      warning = `2자이상 8자 이하로 작성해주세요`;
      break;
    case state.EXISTERROR:
      warning = `이미 존재하는 닉네임이 있습니다`;
      break;
    default:
      break;
  }
  return warning;
};

export const warningEmail = (s: string) => {
  let warning = '';
  switch (s) {
    case state.STRERROR:
      warning = `올바른 이메일 형식을 작성해주세요`;
      break;
    case state.EXISTERROR:
      warning = `이미 존재하는 이메일이 있습니다`;
      break;
    case state.NONEXISTERROR:
      warning = `일치하는 회원정보가 없습니다`;
      break;
    default:
      break;
  }
  return warning;
};

export const warningPw = (s: string) => {
  let warning = '';
  switch (s) {
    case state.STRERROR:
      warning = `대문자,숫자 포함 8자 이상 16자 이하로 작성해주세요`;
      break;
    case state.NONCONFIRMERROR:
      warning = `새 비밀번호와 일치하지 않습니다`;
      break;
    default:
      break;
  }
  return warning;
};

//  join 다이얼로그
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
}

export const JoinDialog = (props: IDialogProps) => {
  const { title, content, agreeFn, openFlag } = props;
  const setOpen = useState<boolean>(false)[1];
  const [dialogSize, setDialogSize] = useState<{
    sizeW: string | undefined;
    sizeH: string | undefined;
  }>({
    sizeW: '700px',
    sizeH: '300px',
  });

  const handleClose = (flag: boolean) => {
    setOpen(flag);
  };

  const dialogStyle = {
    sx: {
      width: dialogSize.sizeW,
      height: dialogSize.sizeH,
      borderRadius: '12px',
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
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>
          <div
            id="alert-dialog-slide-description"
            style={{ textAlign: 'center' }}
          >
            {content}
          </div>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClose(agreeFn())}>확인</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};
//  로그인시 다이얼로그
interface IJoinProps {
  flag: boolean;
  tapstate: string;
  errorMessage: string;
  agreeFn(): any;
}
export const IsLoginDialog = (props: IJoinProps): JSX.Element => {
  const [token, setToken] = useRecoilState(TOKEN);
  const [nickname, setNickname] = useState('');
  const { flag, tapstate, errorMessage, agreeFn } = props;
  let title = '';
  let content = '';
  useEffect(() => {
    getUser(token).then((res) => setNickname(res.profile_nickname));
  }, []);

  if (tapstate === state.SUCCESS) {
    [title, content] = [
      `${nickname}님, 안녕하세요`,
      `로그인이 정상적으로 이루어졌습니다`,
    ];
  } else {
    [title, content] = [`로그인 오류`, errorMessage];
  }

  return (
    <JoinDialog
      openFlag={flag}
      title={title}
      content={content}
      agreeFn={agreeFn}
    />
  );
};

// 회원가입시 다이얼로그
export const IsJoinDialog = (props: IJoinProps): JSX.Element => {
  const [token, setToken] = useRecoilState(TOKEN);
  const [nickname, setNickname] = useState('');
  const { flag, tapstate, errorMessage, agreeFn } = props;
  let title = '';
  let content = '';
  useEffect(() => {
    getUser(token).then((res) => setNickname(res.profile_nickname));
  }, []);
  if (tapstate === state.SUCCESS) {
    [title, content] = [
      `${nickname}님, 환영합니다`,
      `회원가입이 정상적으로 이루어졌습니다`,
    ];
  } else {
    title = '회원가입 오류';
    [title, content] = ['회원가입 오류', errorMessage];
  }
  return (
    <JoinDialog
      openFlag={flag}
      title={title}
      content={content}
      agreeFn={agreeFn}
    />
  );
};

// 임시비밀번호 전송시 다이얼로그
export const IsfindpwDialog = (props: IJoinProps): JSX.Element => {
  const { flag, tapstate, errorMessage, agreeFn } = props;
  let title = '';
  let content = '';
  if (tapstate === state.SUCCESS) {
    [title, content] = [
      `임시비밀번호 전송 완료`,
      `임시비밀번호가 정상적으로 전송되었습니다`,
    ];
  } else {
    title = '임시비밀번호 전송 오류';
    [title, content] = ['임시비밀번호 전송 오류', errorMessage];
  }
  return (
    <JoinDialog
      openFlag={flag}
      title={title}
      content={content}
      agreeFn={agreeFn}
    />
  );
};

// 로그인, 회원가입 SRTERROR 실패시 스타일 다이얼로그
