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
  title: string;
  content: string;
  agreeFn(): boolean;
  disAgreeFn(): boolean;
  sizeW?: string | undefined;
  sizeH?: string | undefined;
  agreeOnly?: boolean;
}

const DialogComponent = (props: IDialogProps) => {
  const { title, content, agreeFn, disAgreeFn, openFlag, agreeOnly } = props;
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
          <DialogContentText
            id="alert-dialog-slide-description"
            style={{ textAlign: 'center' }}
          >
            {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {agreeOnly ? (
            ''
          ) : (
            <Button onClick={() => handleClose(disAgreeFn())}>취소</Button>
          )}
          <Button onClick={() => handleClose(agreeFn())}>확인</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DialogComponent;
