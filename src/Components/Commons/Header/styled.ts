import { styled as styledMui } from '@mui/material/styles';
import { motion } from 'framer-motion';
import { Button } from '@mui/material';
import styled from 'styled-components';

interface IMenuItem {
  fontWeight: string;
}

interface IButton {
  textcolor?: string;
  hovertextcolor?: string;
  backgroundcolor?: string;
  hoverbackgroundcolor?: string;
}

interface IStyledP {
  fontWeight?: string;
  fontSize?: string;
  color?: string;
}

interface IHeaderContainer {
  scrollX?: number;
  animationOff?: boolean;
}
export const HeaderContainer = styled.div<IHeaderContainer>`
  width: 100%;
  min-width: 1240px;
  height: 77px;
  display: flex;
  align-items: center;
  position: fixed;
  top: 0px;
  left: -${(props) => props.scrollX}px;
  z-index: 12;
  background-color: #ffffff;
  transition: ${(props) => (props.animationOff ? 'null' : '500ms all')};
  &.up {
    transform: translateY(-77px);
  }
`;

export const MuiButton = styledMui(Button)<IButton>`
  width:max-content;
  padding: 8px 10px;
  font-family:'Noto Sans','Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size:18px;
  line-height: 23px;
  color: ${(props) => props.textcolor};
  background-color:${(props) => props.backgroundcolor};
  :hover{
    font-weight: 600;
    color:${(props) => props.hovertextcolor};
    background-color:${(props) => props.hoverbackgroundcolor};
`;

export const Logo = styled.div`
  cursor: 'pointer';
  margin-left: 7.7vw;
  @media screen and (max-width: 1300px) {
    margin-left: 100.1px;
  }
`;

export const MenuItems = styled.ul`
  display: flex;
  align-items: flex-start;
  align-self: flex-end;
  margin-left: 3.57vw;
  @media screen and (max-width: 1300px) {
    margin-left: 46.41px;
  }
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
  width: 32vw;
  min-width: 440px;
  height: 40px;
  border-radius: 8px;
  border: 0;
  padding: 12px;
  margin-left: 3.57vw;
  background-color: #f9f9f9;
  :hover {
    background-color: #efefef;
  }
  svg {
    margin-right: 10px;
  }
  @media screen and (max-width: 1300px) {
    margin-left: 46.41px;
  }
`;

export const ProfileContainer = styled.div`
  display: flex;
  align-items: center;
  margin-left: 32px;
  cursor: pointer;
  gap: 10px;
`;

export const ProfileImage = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 100px;
`;

export const StyledP = styled.p<IStyledP>`
  font-size: ${(props) => (props.fontSize ? props.fontSize : '18px')};
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '500')};
  color: ${(props) => (props.color ? props.color : '#5F5F5F')};
  font-family: 'Noto Sans', 'Noto Sans KR';
  text-align: center;
  z-index: 2;
  line-height: 146%;
`;

export const DropdownContainer = styled.div`
  position: absolute;
  width: 274.85px;
  height: 460.31px;
  transform: translate(-20px, 55px);
  background: #ffffff;
  box-shadow: -2px 3px 12px rgba(0, 0, 0, 0.2);
  border-radius: 16px;
  display: flex;
  justify-content: center;
  z-index: 12;
`;
export const Dropdown = styled.div`
  borderradius: 16px;
  background: #ffffff;
  boxshadow: -2px 3px 12px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding-top: 40px;
  width: 70%;
  white-space: nowrap;
  overflow-x: hidden;
`;

export const TextButton = styledMui(Button)`
  padding: 8px 2000px;
  font-family: 'Noto Sans','Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size:16px;
  line-height: 27px;
  color: #5F5F5F;
  :hover{
    font-weight: 500;
    color:#07b8b8;
  }
`;

export const DropdownRemover = styled.div`
  position: fixed;
  width: 100vw;
  height: 100vh;
  z-index: 11;
`;
