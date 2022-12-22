import { styled as styledMui } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Button } from '@mui/material';
import styled from 'styled-components';

interface IMenuItem {
  fontWeight: string;
}

interface IButton {
  textColor?: string;
  hoverTextColor?: string;
  backgroundColor?: string;
  hoverBackgroundColor?: string;
}

export const HeaderContainer = styled.div`
  min-width: 100%;
  height: 77px;
  display: flex;
  align-items: center;
  position: fixed;
  z-index: 10;
  background-color: #ffffff;
`;

export const MuiButton = styledMui(Button)<IButton>`
  width:max-content;
  padding: 8px 10px;
  font-family:'Noto Sans','Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size:18px;
  line-height: 23px;
  color: ${(props) => props.textColor};
  background-color:${(props) => props.backgroundColor};
  :hover{
    font-weight: 600;
    color:${(props) => props.hoverTextColor};
    background-color:${(props) => props.hoverBackgroundColor};
`;

export const MenuItems = styled.ul`
  display: flex;
  align-items: flex-start;
  align-self: flex-end;
  margin-left: 70px;
`;

export const MenuItem = styled(motion.li)<IMenuItem>`
  width: max-content;
  padding: 12px;
  border-radius: 4px;
  color: #5f5f5f;
  font-family: 'Noto Sans', 'Noto Sans KR';
  font-style: normal;
  font-weight: ${(props) => props.fontWeight};
  font-size: 18px;
  line-height: 25px;
  :hover {
    background-color: #f9f9f9;
    font-weight: 600;
  }
`;

export const MenuUnderLine = styled(motion.div)`
  width: 100%;
  height: 4px;
  background-color: #1a201b;
`;

export const SearchInput = styled.input`
  background-color: transparent;
  border: none;
  color: rgb(51, 51, 51);
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto,
    Oxygen-Sans, Ubuntu, Cantarell, 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    Helvetica, 'ヒラギノ角ゴ Pro W3', 'Hiragino Kaku Gothic Pro', メイリオ,
    Meiryo, 'ＭＳ Ｐゴシック', Arial, sans-serif, 'Apple Color Emoji',
    'Segoe UI Emoji', 'Segoe UI Symbol';
  font-size: 16px;
  font-weight: normal;
  height: 100%;
  outline: none;
  padding: 0px;
  width: 100%;
`;

export const SearchBar = styled.div`
  display: flex;
  align-items: center;
  width: 610px;
  height: 40px;
  border-radius: 8px;
  border: 0;
  padding: 12px;
  margin-left: 73px;
  background-color: #f9f9f9;
  :hover {
    background-color: #efefef;
  }
  svg {
    margin-right: 10px;
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 32px;
  gap: 10px;
`;

export const ProfileImage = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 100px;
`;
