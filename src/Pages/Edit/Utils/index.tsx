import React, {
  useEffect,
  useState,
  forwardRef,
  Ref,
  ReactElement,
} from 'react';
import Button from '@mui/material/Button';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { accessClient } from '../../../axiosInstance';

interface IState {
  NORMAL: string; // 입력 전
  SUCCESS: string; //  성공
  STRERROR: string; // 길이 문법 오류
  ERROR: string;

  EDITPW: string;
  EDITNAME: string;
  DEFAULT: string;
}
export const state: IState = {
  NORMAL: 'NORMAL', // 입력 전
  SUCCESS: 'SUCCESS',
  STRERROR: 'STRERROR',
  ERROR: 'ERROR',

  EDITPW: 'EDITPW',
  EDITNAME: 'EDITNAME',
  DEFAULT: 'DEFAULT',
};

export const getUser = async (token: string) => {
  const result = await accessClient(token).get(`profiles/user`);
  console.log(`UTIL`, result.data.data[0]);
  return result.data.data[0];
};
// page 탈퇴하기
export const deleteUserHandler = async (token: string, setToken: any) => {
  console.log('탈퇴');
  const result = await accessClient(token).delete(`users`);
  setToken(null);
};

//  Edit 다이얼로그
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
export const EditDialog = (props: IDialogProps) => {
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

//  IEditProps interface
interface IEditProps {
  flag: boolean;
  tapstate?: string;
  errorMessage?: any;
  agreeFn(): any;
}
//  회원정보 Edit시 다이얼로그
export const IsEditNameDialog = (props: IEditProps): JSX.Element => {
  const { flag, tapstate, errorMessage, agreeFn } = props;
  let title = '';
  let content = '';
  if (tapstate === state.SUCCESS) {
    [title, content] = [
      `닉네임 수정 성공`,
      `닉네임이 정상적으로 이루어졌습니다`,
    ];
  } else {
    [title, content] = [`닉네임 수정 오류`, errorMessage];
  }

  return (
    <EditDialog
      openFlag={flag}
      title={title}
      content={content}
      agreeFn={agreeFn}
    />
  );
};

//  비밀번호 Edit시 다이얼로그
export const IsEditPwDialog = (props: IEditProps): JSX.Element => {
  const { flag, tapstate, errorMessage, agreeFn } = props;
  let title = '';
  let content = '';
  if (tapstate === state.SUCCESS) {
    [title, content] = [
      `비밀번호 변경`,
      `비밀번호 변경이 정상적으로 이루어졌습니다`,
    ];
  } else {
    [title, content] = [
      `비밀번호 변경 오류`,
      `비밀번호가 정상적으로 변경되지 않았습니다.`,
    ];
  }

  return (
    <EditDialog
      openFlag={flag}
      title={title}
      content={content}
      agreeFn={agreeFn}
    />
  );
};

// 탈퇴 다이얼로그
//  회원정보 Edit시 다이얼로그
export const IsDeleteDialog = (props: IEditProps): JSX.Element => {
  const { flag, tapstate, errorMessage, agreeFn } = props;
  const title = '탈퇴하기';
  const content = '정말 탈퇴하시겠습니까?';

  return (
    <EditDialog
      openFlag={flag}
      title={title}
      content={content}
      agreeFn={agreeFn}
    />
  );
};
