import styled from 'styled-components';

interface IStyledP {
  fontWeight?: string;
  fontSize?: string;
  color?: string;
}

export const ErrorPage = styled.div`
  height: 100vh;
  padding-bottom: 30vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const ImageContainer = styled.div`
  height: 50vh;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  align-items: center;
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

export const MagnifyingGlass = styled.img`
  margin-left: 2vw;
  z-index: 1;
  transition: 300ms all;
`;
