import { styled as styledMui } from '@mui/material/styles';
import { Button } from '@mui/material';
import styled from 'styled-components';

interface IStyledP {
  lineClamp: string;
}

interface INavigateButton {
  backgroundcolor: string;
  hoverbackgroundcolor: string;
}

export const StyledP = styled.p<IStyledP>`
  font-size: calc(2.3px + 1.2vmin);
  width: 8vw;
  display: -webkit-box;
  -webkit-line-clamp: ${(props) => props.lineClamp};
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const NavigateButton = styledMui(Button)<INavigateButton>`
  width:fit-content;
  height:fit-content;
  padding: 1vh 1vw;
  font-family: 'Noto Sans','Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size:calc(3px + 1.5vmin);
  line-height: 140%;
  color: #FFFFFF;
  background-color: ${(props) => props.backgroundcolor};
  :hover{
    font-weight: 600;
    background-color: ${(props) => props.hoverbackgroundcolor};
  }
`;
