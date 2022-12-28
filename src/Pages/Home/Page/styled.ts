import { styled as styledMui } from '@mui/material/styles';
import { Button } from '@mui/material';
import styled from 'styled-components';

interface IPrimaryButton {
  fontSize: string;
}
interface IContainer {
  fontFamily: string;
}
interface ISection {
  backgroundcolor: string;
}
interface INavigateButton {
  backgroundcolor: string;
  hoverbackgroundcolor: string;
}

export const PrimaryButton = styled.button<IPrimaryButton>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 8px 10px;
  background: #07b8b8;
  border-radius: 6px;
  border: 0px;
  font-family: 'Noto Sans', 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: ${(props) => props.fontSize};
  line-height: 140%;
  color: #ffffff;
  cursor: pointer;
  :hover {
    background-color: #00a8a7;
  }
`;

export const Container = styled.div<IContainer>`
  font-size: calc(10px + 3vmin);
  background-color: red;
  font-family: ${(props) => props.fontFamily};
`;
export const Section = styled.div<ISection>`
  position: relative;
  background-color: ${(props) => props.backgroundcolor};
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
`;
export const Section2 = styled.div<ISection>`
  position: relative;
  background-color: ${(props) => props.backgroundcolor};
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-evenly;
  padding: 0px 1vw;
`;
export const Header = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 66px;
  width: 100%;
  padding: 66px 4.98vw;
`;
export const ImageList = styled.div`
  position: relative;
  top: 11vh;
  display: flex;
  width: 100%;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 16px;
  height: 30vh;
`;
export const Body = styled.div`
  position: relative;
  top: 2vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 30vh;
  width: 100%;
  align-items: center;
`;
export const Body2 = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 30vh;
  align-items: center;
  gap: 50px;
`;
export const StyledH1 = styled.h1`
  position: relative;
  font-size: 1.2em;
  font-family: 'Segoe UI';
  font-style: normal;
  font-weight: 600;
  line-height: 140%;
  text-align: center;
  color: #2a2a2a;
  cursor: default;
`;
export const TextButton = styledMui(Button)`
  padding: 8px 10px;
  font-family: 'Noto Sans','Noto Sans KR';
  font-style: normal;
  font-weight: 600;
  font-size:20px;
  line-height: 27px;
  color: #2A2A2A;
  :hover{
    color:#07b8b8;
  }
`;
export const NavigateButton = styledMui(Button)<INavigateButton>`
  width:fit-content;
  height:fit-content;
  padding: 12px 47px;
  font-family: 'Segoe UI';
  font-style: normal;
  font-weight: 600;
  font-size:24px;
  font-family: 'Segoe UI';
  line-height: 32px;
  color: #FFFFFF;
  background-color: ${(props) => props.backgroundcolor};
  :hover{
    background-color: ${(props) => props.hoverbackgroundcolor};
  }
`;
