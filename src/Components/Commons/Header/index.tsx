import { useState, useEffect } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import * as S from './styled';
import { ReactComponent as Logo } from '../../../Pages/Home/assets/logo.svg';
import { ReactComponent as SearchIcon } from './searchicon.svg';
import { ReactComponent as ArrowIcon } from './arrowdown.svg';
import avatar from './sampleAvatar.png';
import { DialogTest } from '../../../Pages/Join/Components/LoginDialog/index';

export const Header = () => {
  const navigate = useNavigate();
  const { pathname: curLocation } = useLocation();
  const [flag, setFlag] = useState(false);
  const disAgreeFn = () => {
    console.log('취소');
    setFlag(false);
    return flag;
  };

  return (
    <>
      <S.HeaderContainer>
        <Logo
          style={{ cursor: 'pointer', marginLeft: '7.7vw' }}
          onClick={() => {
            navigate('/');
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
        <div style={{ width: '3.16vw' }} />
        <div
          style={{
            marginLeft: 'auto',
            marginRight: '7.7vw',
            width: 'max-content',
          }}
        >
          <S.MuiButton
            textColor="#5F5F5F"
            hoverTextColor="#07B8B8"
            hoverBackgroundColor="#f9f9f9"
          >
            가입하기
          </S.MuiButton>
          <S.MuiButton
            style={{ marginLeft: '24px' }}
            textColor="#ffffff"
            backgroundColor="#07B8B8"
            hoverBackgroundColor="#00A8A7"
            onClick={() => {
              setFlag(true);
            }}
          >
            로그인
          </S.MuiButton>
        </div>
      </S.HeaderContainer>
      <DialogTest
        openFlag={flag}
        title="test"
        content="test"
        agreeFn={() => {}}
        disAgreeFn={disAgreeFn}
        sizeW="600px"
        sizeH="800px"
      />
      ;
    </>
  );
};

export const HeaderWithProfile = () => {
  const [isDropdownOn, setIsDropdownOn] = useState(false);
  // const removeDropdown = () => {
  //   setIsDropdownOn(false);
  // };
  // useEffect(() => {
  //   window.addEventListener('click', () => {
  //     console.log(isDropdownOn);
  //     if (isDropdownOn) {
  //       alert();

  //       setIsDropdownOn(false);
  //     }
  //   });
  //   return window.removeEventListener('click', alert);
  // }, []);
  const navigate = useNavigate();
  const { pathname: curLocation } = useLocation();
  return (
    <>
      <S.HeaderContainer>
        <Logo
          style={{ cursor: 'pointer', marginLeft: '7.7vw' }}
          onClick={() => {
            navigate('/');
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
        <div style={{ width: '3.16vw' }} />
        <div
          style={{
            display: 'flex',
            marginLeft: 'auto',
            marginRight: '7.7vw',
            width: 'max-content',
          }}
        >
          <S.MuiButton
            textColor="#07B8B8"
            hoverBackgroundColor="#f9f9f9"
            onClick={alert}
          >
            사진 올리기
          </S.MuiButton>
          <S.ProfileContainer
            onClick={(e) => {
              e.stopPropagation();
              setIsDropdownOn((c) => !c);
            }}
          >
            <S.ProfileImage src={avatar} alt="프사" />
            <ArrowIcon />
          </S.ProfileContainer>
          {isDropdownOn && (
            <S.DropdownContainer>
              <S.Dropdown>
                <S.ProfileImage
                  style={{ scale: '3', marginBottom: '50px' }}
                  src={avatar}
                  alt="프사"
                />
                <S.StyledP
                  style={{ marginBottom: '10px' }}
                  fontSize="20px"
                  fontWeight="600"
                >
                  유저닉네임
                </S.StyledP>
                <S.StyledP style={{ marginBottom: '40px' }} fontSize="18px">
                  photolog@naver.com
                </S.StyledP>
                <S.TextButton>내 페이지</S.TextButton>
                <S.TextButton>계정 관리</S.TextButton>
                <S.TextButton>로그아웃</S.TextButton>
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
  return (
    <S.HeaderContainer>
      <Logo
        style={{ cursor: 'pointer', margin: 'auto' }}
        onClick={() => {
          navigate('/');
        }}
      />
    </S.HeaderContainer>
  );
};
