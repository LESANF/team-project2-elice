import React from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import * as S from './styled';
import { ReactComponent as Logo } from '../../../Pages/Home/assets/logo.svg';
import { ReactComponent as SearchIcon } from './searchicon.svg';
import { ReactComponent as ArrowIcon } from './arrowdown.svg';
import profile from './profilesample.png';

export const Header = () => {
  const navigate = useNavigate();
  const { pathname: curLocation } = useLocation();
  return (
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
        >
          로그인
        </S.MuiButton>
      </div>
    </S.HeaderContainer>
  );
};

export const HeaderWithProfile = () => {
  const navigate = useNavigate();
  const { pathname: curLocation } = useLocation();
  return (
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
        <S.MuiButton textColor="#07B8B8" hoverBackgroundColor="#f9f9f9">
          사진 올리기
        </S.MuiButton>
        <S.ProfileContainer>
          <S.ProfileImage src={profile} alt="프사" />
          <ArrowIcon />
        </S.ProfileContainer>
      </div>
    </S.HeaderContainer>
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
