import { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import axios from 'axios';

import DialogTest from '../../../../Components/Commons/Dialog';
import { userState } from '../../../Join/Atoms';
import * as S from './styled';
import {
  validateEmail,
  warningNickname,
  warningEmail,
  state,
  IsExist,
} from '../../../Join/Utils';

const EditProfileTap = () => {
  const navigate = useNavigate();

  const [user, setUser] = useRecoilState(userState);
  const [nickname, setNickname] = useState(user.nickname);
  const [email, setEmail] = useState(user.email);

  const [nicknamestate, setNicknameState] = useState<string>(state.NORMAL);
  const [emailstate, setEmailState] = useState<string>(state.NORMAL);
  const [editstate, setEditState] = useState<string>(state.NORMAL);

  const [flag, setFlag] = useState<boolean>(false);

  const [Image, setImage] = useState(
    user.imageUrlId ||
      'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  );

  const [imagestate, setImageState] = useState(state.NORMAL);
  const fileInput = useRef<any>(null);

  const changeHandler = (e: any) => {
    if (e.target.files[0]) {
      setImage(e.target.files[0]);
    } else {
      setImage(
        'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
      );
      return;
    }
    const reader: any = new FileReader();
    reader.onload = () => {
      if (reader.readyState === 2) {
        setImage(reader.result);
      }
    };
    reader.readAsDataURL(e.target.files[0]);
  };

  //  닉네임 input onChange
  const changeNickNameHandler = async (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const nickNameInput = e.target.value;
    console.log(nickNameInput);
    setNickname(nickNameInput);
    let result = await IsExist(nickNameInput, 'nickname');
    if (result && result.nickname === user.nickname) {
      result = undefined;
    }

    if (nickNameInput.length < 2 || nickNameInput.length > 8) {
      setNicknameState(state.STRERROR);
    } else if (result) {
      setNicknameState(state.EXISTERROR);
    } else {
      setNicknameState(state.SUCCESS);
      console.log('success');

      // setNickname(nickNameInput);
    }
  };
  //  이메일 input onChange
  const changeEmailHandler = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const emailInput = e.target.value;
    console.log(emailInput);
    setEmail(emailInput);
    let result = await IsExist(emailInput, 'email');
    if (result && result.email === user.email) {
      result = undefined;
    }
    if (!validateEmail(emailInput)) {
      setEmailState(state.STRERROR);
    } else if (result) {
      setEmailState(state.EXISTERROR);
    } else {
      setEmailState(state.SUCCESS);
      console.log('success');
      // setEmail(emailInput);
    }
  };

  //  회원정보 수정 버튼
  const clickEditHandler = async () => {
    console.log(nicknamestate, emailstate);

    if (
      (nicknamestate === state.SUCCESS || nicknamestate === state.NORMAL) &&
      (emailstate === state.SUCCESS || emailstate === state.NORMAL)
    ) {

      const result = await axios.patch(
        `http://localhost:3232/users/${user.id}`,
        {
          nickname,
          email,
          imageUrlId: Image,
        },
      );
      // console.log('토큰', result.data.accessToken);
      console.log(result);
      setUser((current: any) => {
        const currentdata = { ...current };
        currentdata.nickname = result.data.nickname;
        currentdata.email = result.data.email;
        currentdata.imageUrlId = result.data.imageUrlId;
        return currentdata;
      });
      setEditState(state.SUCCESS);
      setFlag(true);
    } else {
      setEditState(state.ERROR);
      setFlag(true);
    }
  };

  const agreeFn = () => {
    console.log('확인');
    setFlag(false);
    if (editstate === state.SUCCESS) navigate(`/`);
    return flag;
  };

  const disAgreeFn = () => {
    console.log('취소');
    setFlag(false);
    if (editstate === state.SUCCESS) navigate(`/`);
    return flag;
  };
  const dialog = (): JSX.Element => {
    let title = '';
    let content = '';
    if (editstate === state.SUCCESS) {
      [title, content] = [
        `${user.nickname}님`,
        `회원정보 수정이 정상적으로 이루어졌습니다`,
      ];
    } else {
      //  일단 이렇게 해둠
      [title, content] = [
        `회원정보 수정 오류`,
        `회원정보가 정상적으로 수정되지 않았습니다.`,
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
    <>
      <S.Form className="editProfile">
        <div className="title">프로필</div>
        <img
          src={Image}
          alt="프로필"
          role="presentation"
          onClick={() => {
            fileInput.current.click();
          }}
        />
        <div>
          <input
            className="image"
            type="file"
            style={{ display: 'none' }}
            accept="image/*"
            name="file"
            onChange={changeHandler}
            ref={fileInput}
          />
        </div>
      </S.Form>
      <S.Form>
        <div className="title">닉네임</div>
        <div>
          <input value={nickname} onChange={changeNickNameHandler} />
          <div>{warningNickname(nicknamestate)}</div>
        </div>
      </S.Form>
      <S.Form>
        <div className="title">이메일</div>
        <div>
          <input value={email} onChange={changeEmailHandler} />
          <div>{warningEmail(emailstate)}</div>
        </div>
      </S.Form>
      <S.Button onClick={clickEditHandler}>프로필 수정</S.Button>
      {dialog()}
    </>
  );
};

export default EditProfileTap;
