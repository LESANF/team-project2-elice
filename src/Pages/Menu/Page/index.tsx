import Maps from '../../Maps';
import { Header, HeaderForPost } from '../../../Components/Commons/Header';
import Footer from '../../../Components/Commons/Footer';
import * as S from './styled';

// 추가할 타입 없으면 나중에 string으로 변경
interface IMenuTtype {
  menuType: string;
}

const Menu = ({ menuType }: IMenuTtype) => {
  console.log(menuType);

  return (
    <>
      <Header />
      <S.Container>
        <S.Wrapper>
          <S.ContentsFrame>
            {menuType === 'photo' ? <h1>PHOTO</h1> : <Maps />}
          </S.ContentsFrame>
        </S.Wrapper>
      </S.Container>
      {menuType === 'photo' ? '' : <Footer />}
    </>
  );
};

export default Menu;
