import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import * as S from './styled';
import { ReactComponent as Logo } from '../../../Pages/Home/assets/logo.svg';
import { ReactComponent as SearchIcon } from './searchicon.svg';
import { ReactComponent as ArrowIcon } from './arrowdown.svg';
import avatar from './sampleAvatar.png';
import { DialogTest } from '../../../Pages/Join/Components/LoginDialog/index';
import { TOKEN } from '../../../Pages/Join/Atoms';
import { getUser } from '../../../Pages/Edit/Utils';
import defaultProfile from '../../../Pages/Edit/assets/defaultProfile.svg';
import { client } from '../../../axiosInstance';

const HeaderNonLogin = () => {
  const [s, setS] = useState({});
  const navigate = useNavigate();
  const { pathname: curLocation } = useLocation();
  const [flag, setFlag] = useState(false);
  const disAgreeFn = () => {
    console.log('취소');
    setFlag(false);
    return flag;
  };
  const handleScroll = (e: any) => {
    setS({});
  };
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <S.HeaderContainer scrollX={window.scrollX} animationOff>
        <S.Logo>
          <Logo
            onClick={() => {
              navigate('/menu/photolists');
            }}
          />
        </S.Logo>
        <S.MenuItems>
          <Link to="/menu/maps">
            {curLocation === '/menu/maps' ? (
              <>
                <S.MenuItem fontWeight="600">지도</S.MenuItem>
                <S.MenuUnderLine layoutId="underLine" />
              </>
            ) : (
              <S.MenuItem fontWeight="400">지도</S.MenuItem>
            )}
          </Link>
          <div style={{ width: '12px' }} />
          <Link to="/menu/photolists">
            {curLocation === '/menu/photolists' ? (
              <>
                <S.MenuItem fontWeight="600">사진</S.MenuItem>
                <S.MenuUnderLine layoutId="underLine" />
              </>
            ) : (
              <S.MenuItem fontWeight="400">사진</S.MenuItem>
            )}
          </Link>
        </S.MenuItems>
        <S.SearchBar
          onClick={() => {
            document.querySelector<HTMLInputElement>('.search_input')?.focus();
          }}
        >
          <SearchIcon />
          <S.SearchInput className="search_input" />
        </S.SearchBar>
        <div
          style={{
            marginLeft: 'auto',
            marginRight: '7.7vw',
            width: 'max-content',
          }}
        >
          <S.MuiButton
            textcolor="#5F5F5F"
            hovertextcolor="#07B8B8"
            hoverbackgroundcolor="#f9f9f9"
            onClick={() => {
              navigate('/join');
            }}
          >
            가입하기
          </S.MuiButton>
          <S.MuiButton
            style={{ marginLeft: '24px' }}
            textcolor="#ffffff"
            backgroundcolor="#07B8B8"
            hoverbackgroundcolor="#00A8A7"
            onClick={() => {
              setFlag(true);
            }}
          >
            로그인
          </S.MuiButton>
        </div>
      </S.HeaderContainer>
      <div style={{ background: 'red', width: '1240px', height: '0.1px' }} />
      <DialogTest
        openFlag={flag}
        title="test"
        content="test"
        agreeFn={() => {}}
        disAgreeFn={disAgreeFn}
        sizeW="600px"
        sizeH="800px"
      />
    </>
  );
};

const HeaderWithProfile = () => {
  const [token, setToken] = useRecoilState(TOKEN);
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [Image, setImage] = useState('');
  const [isDropdownOn, setIsDropdownOn] = useState(false);
  const navigate = useNavigate();
  const { pathname: curLocation } = useLocation();

  useEffect(() => {
    getUser(token).then((res) => {
      setImage(res.image_url || defaultProfile);
      setNickname(res.profile_nickname);
      setEmail(res.user_email);
    });
  }, []);

  const logoutHandler = () => {
    client.get(`auth/logout`).then((res) => console.log('logout', res));
    setToken(null);
  };
  return (
    <>
      <S.HeaderContainer>
        <Logo
          style={{ cursor: 'pointer', marginLeft: '7.7vw' }}
          onClick={() => {
            navigate('/menu/photolists');
          }}
        />
        <S.MenuItems>
          <Link to="/menu/maps">
            {curLocation === '/menu/maps' ? (
              <>
                <S.MenuItem fontWeight="600">지도</S.MenuItem>
                <S.MenuUnderLine layoutId="underLine" />
              </>
            ) : (
              <S.MenuItem fontWeight="400">지도</S.MenuItem>
            )}
          </Link>
          <div style={{ width: '12px' }} />
          <Link to="/menu/photolists">
            {curLocation === '/menu/photolists' ? (
              <>
                <S.MenuItem fontWeight="600">사진</S.MenuItem>
                <S.MenuUnderLine layoutId="underLine" />
              </>
            ) : (
              <S.MenuItem fontWeight="400">사진</S.MenuItem>
            )}
          </Link>
        </S.MenuItems>
        <S.SearchBar
          onClick={() => {
            document.querySelector<HTMLInputElement>('.search_input')?.focus();
          }}
        >
          <SearchIcon />
          <S.SearchInput className="search_input" />
        </S.SearchBar>
        <div
          style={{
            display: 'flex',
            marginLeft: 'auto',
            marginRight: '7.7vw',
            width: 'max-content',
          }}
        >
          <S.MuiButton
            textcolor="#07B8B8"
            hoverbackgroundcolor="#f9f9f9"
            onClick={() => {
              navigate('/postwrite');
            }}
          >
            사진 올리기
          </S.MuiButton>
          <S.ProfileContainer
            onClick={(e) => {
              e.stopPropagation();
              setIsDropdownOn((c) => !c);
            }}
          >
            <S.ProfileImage src={Image} alt="프사" />
            <ArrowIcon />
          </S.ProfileContainer>
          {isDropdownOn && (
            <S.DropdownContainer>
              <S.Dropdown>
                <S.ProfileImage
                  style={{ scale: '3', marginBottom: '50px' }}
                  src={Image}
                  alt="프사"
                />
                <S.StyledP
                  style={{ marginBottom: '10px' }}
                  fontSize="20px"
                  fontWeight="600"
                >
                  {nickname}
                </S.StyledP>
                <S.StyledP style={{ marginBottom: '40px' }} fontSize="18px">
                  {email}
                </S.StyledP>
                <Link to="/mypage">
                  <S.TextButton>내 페이지</S.TextButton>
                </Link>
                <Link to="/edit">
                  <S.TextButton>계정 관리</S.TextButton>
                </Link>
                <S.TextButton onClick={logoutHandler}>로그아웃</S.TextButton>
              </S.Dropdown>
            </S.DropdownContainer>
          )}
        </div>
        {isDropdownOn && (
          <S.DropdownRemover
            onClick={(e) => {
              setIsDropdownOn(false);
            }}
          />
        )}
      </S.HeaderContainer>
      <div style={{ background: 'red', width: '1240px', height: '0.1px' }} />
      {isDropdownOn && (
        <S.DropdownRemover
          onClick={(e) => {
            setIsDropdownOn(false);
          }}
        />
      )}
    </>
  );
};

export const HeaderForPost = () => {
  const navigate = useNavigate();
  const handleScroll = (e: any) => {
    const header = document.querySelector('.header');
    if (e.deltaY < 0) {
      header?.classList.remove('up');
    } else if (window.scrollY > 77) {
      header?.classList.add('up');
    }
  };
  const handleResize = (e: any) => {
    const header = document.querySelector('.header');
    if (window.scrollY < 77) header?.classList.remove('up');
  };
  useEffect(() => {
    window.addEventListener('wheel', handleScroll);
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('wheel', handleScroll);
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  return (
    <S.HeaderContainer className="header">
      <Logo
        style={{ cursor: 'pointer', margin: 'auto' }}
        onClick={() => {
          navigate('/menu/photolists');
        }}
      />
    </S.HeaderContainer>
  );
};

export const Header = () => {
  const [token, setToken] = useRecoilState(TOKEN);
  return token ? <HeaderWithProfile /> : <HeaderNonLogin />;
};
