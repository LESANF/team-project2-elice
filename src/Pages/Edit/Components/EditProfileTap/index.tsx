import { useState, useRef } from 'react';
import * as S from './styled';

const EditProfileTap = () => {
  const [Image, setImage] = useState(
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png',
  );
  const [state, setState] = useState('NORMAL');
  const fileInput = useRef(null);
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
  return (
    <>
      <S.Form className="editProfile">
        <div className="title">프로필</div>
        <img src={Image} alt="프로필" />
        <div>
          <input
            className="image"
            type="file"
            // style={{ display: 'none' }}
            accept="image/jpg,impge/png,image/jpeg"
            name="profile_img"
            onChange={changeHandler}
            ref={fileInput}
          />
          {state === 'ERROR' ? (
            <div>2자이상 8자 이하로 작성해주세요</div>
          ) : null}
        </div>
      </S.Form>
      <S.Form>
        <div className="title">닉네임</div>
        <div>
          <input />
          {state === 'ERROR' ? (
            <div>2자이상 8자 이하로 작성해주세요</div>
          ) : null}
        </div>
      </S.Form>
      <S.Form>
        <div className="title">이메일</div>
        <div>
          <input type="password" />
          {state === 'ERROR' ? (
            <div>2자이상 8자 이하로 작성해주세요</div>
          ) : null}
        </div>
      </S.Form>
      <S.Button>프로필 수정</S.Button>
    </>
  );
};

export default EditProfileTap;
