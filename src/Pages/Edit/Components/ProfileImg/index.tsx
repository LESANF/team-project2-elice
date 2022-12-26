import { useState, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { TOKEN } from '../../../Join/Atoms';
import * as S from './styled';

const ProfileImg = () => {
  const [token, setToken] = useRecoilState(TOKEN);
  const fileInput = useRef<any>(null);

  const [Image, setImage] = useState(
    token === null
      ? 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png'
      : 'http://image.dongascience.com/Photo/2020/03/5bddba7b6574b95d37b6079c199d7101.jpg',
  );

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
      <S.Profile
        src={Image}
        alt="프로필 사진"
        onClick={() => {
          fileInput.current.click();
        }}
      />
      <input
        type="file"
        accept="image/*"
        style={{ display: 'none' }}
        onChange={changeHandler}
        ref={fileInput}
      />
    </>
  );
};

export default ProfileImg;
