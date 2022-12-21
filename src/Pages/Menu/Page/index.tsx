import { Link, useLocation } from 'react-router-dom';
import Maps from '../../Maps';
import * as S from './styled';

// 추가할 타입 없으면 나중에 string으로 변경
interface IMenuTtype {
  menuType: string;
}

const Menu = ({ menuType }: IMenuTtype) => {
  const { pathname: curLocation } = useLocation();
  console.log(menuType);

  return (
    <>
      <S.TestHeader />
      <S.Container>
        <S.Wrapper>
          <S.MenuHeader>
            <S.MenuItems>
              <Link to="/menu/maps">
                <S.MenuItem>
                  <S.MenuName>
                    지도
                    {curLocation === '/menu/maps' ? (
                      <S.MenuUnderLine layoutId="underLine" />
                    ) : (
                      ''
                    )}
                  </S.MenuName>
                </S.MenuItem>
              </Link>
              <Link to="/menu/photolists">
                <S.MenuItem>
                  <S.MenuName>
                    사진
                    {curLocation === '/menu/photolists' ? (
                      <S.MenuUnderLine layoutId="underLine" />
                    ) : (
                      ''
                    )}
                  </S.MenuName>
                </S.MenuItem>
              </Link>
            </S.MenuItems>
          </S.MenuHeader>
          <S.ContentsFrame>
            {menuType === 'photo' ? <h1>PHOTO</h1> : <Maps />}
          </S.ContentsFrame>
        </S.Wrapper>
      </S.Container>
    </>
  );
};

export default Menu;
