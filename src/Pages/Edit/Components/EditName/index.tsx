import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import { useRecoilState } from 'recoil';

import { accessClient } from '../../../../axiosInstance';
import * as S from './styled';
import { Profile } from '../Default/styled';
import DialogTest from '../../../../Components/Commons/Dialog';
import { MuiButton } from '../../../../Components/Commons/Header/styled';
import defaultProfile from '../../assets/defaultProfile.svg';
import { warningNickname, state } from '../../../Join/Utils';
import { TOKEN } from '../../../Join/Atoms';
import HelperText from '../HelperText';
import { getUser } from '../../Utils';

interface IEditNameProps {
  setMode?: any;
}

const EditName = ({ setMode }: IEditNameProps) => {
  const [token, setToken] = useRecoilState(TOKEN);
  const [nickName, setnickName] = useState('');
  const [nickNamestate, setnickNameState] = useState<string>(state.NORMAL);
  const [errorMessage, setErrorMessage] = useState<string>('');
  const [Image, setImage] = useState(defaultProfile);
  const [flag, setFlag] = useState<boolean>(false);
  useEffect(() => {
    getUser(token).then((res) => {
      setImage(res.image_url || defaultProfile);
    });
  }, []);

  //  닉네임 input onChange
  const changenickNameHandler = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const nickNameInput = e.target.value;
    console.log(nickNameInput);

    if (nickNameInput.length < 2 || nickNameInput.length > 8) {
      setnickNameState(state.STRERROR);
    } else {
      setnickNameState(state.SUCCESS);
      setnickName(nickNameInput);
    }
  };
  //  수정 완료 버튼
  const clickEditHandler = async () => {
    if (!(nickNamestate === state.SUCCESS || nickNamestate === state.NORMAL)) {
      console.log('다시');
      return;
    }
    try {
      const result = await accessClient(token).patch(`/users/nickname`, {
        nickname: nickName,
      });
      setnickNameState(state.SUCCESS);
      setFlag(true);
    } catch (err: any) {
      setnickNameState(state.ERROR);
      setErrorMessage(err.response.data.message);
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
    if (nickNamestate === state.SUCCESS) {
      [title, content] = [
        `닉네임 수정 성공`,
        `닉네임이 정상적으로 이루어졌습니다`,
      ];
    } else {
      [title, content] = [`닉네임 수정 오류`, errorMessage];
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
      <motion.div layoutId="avatar">
        <S.Profile src={Image} alt="프로필 사진" />
      </motion.div>
      <S.NickName
        placeholder="새로운 닉네임을 적어주세요"
        onChange={changenickNameHandler}
      />
      <HelperText helper={warningNickname(nickNamestate)} content={nickName} />

      <div>
        <MuiButton
          style={{ width: '93px', marginTop: '22px' }}
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
          onClick={clickEditHandler}
        >
          수정 완료
        </MuiButton>
      </div>
      {dialog()}
    </S.Container>
  );
};
EditName.defaultProps = {
  setMode: () => {},
};
export default EditName;
