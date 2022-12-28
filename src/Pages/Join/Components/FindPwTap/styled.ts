import TextField from '@mui/material/TextField';
import { styled as styledMui } from '@mui/material/styles';
import styled from 'styled-components';

interface IInput {
  state?: string;
}

export const Form = styled.form`
  /* border: 1px solid pink; */
  height: 120px;

  display: flex;
  margin-top: 20px;
  div.title {
    width: 150px;
  }
  input {
    height: 0.8em;
    border-radius: 12px;
    background-color: white;
    border: 1px solid #cccccc;
    font-size: 30px;
    padding: 30px;
  }
  + form {
    margin-top: 20px;
  }
`;

export const Button = styled.button`
  font-family: 'Noto Sans', 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 27px;
  cursor: pointer;
  width: 380px;
  height: 77px;
  border-radius: 6px;
  border: 0px;
  background: #07b8b8;
  color: white;

  :hover {
    background-color: #00a8a7;
  }
`;
export const InfoTop = styled.div`
  margin-bottom: -10px;
  font-family: 'Noto Sans', 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  cursor: pointer;
`;
export const InfoBottom = styled.div`
  /*요거만 다름*/
  margin-top: 10px;
  text-align: center;
  font-family: 'Noto Sans', 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 16px;
  color: #5f5f5f;
  letter-spacing: 0.8px;
  li + li {
    margin-top: 10px;
  }
`;

export const Input = styledMui(TextField)<IInput>`
font-family: 'Noto Sans', 'Noto Sans KR';
font-style: normal;
font-weight: 600;
font-size: 25px;
border-radius: 8px;
padding: 2px 2px;
line-height: 27px;
text-align: center;
color: #5f5f5f;
& .MuiInputBase-input{
  font-family: 'Noto Sans', 'Noto Sans KR';
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  color: #2a2a2a;
  padding-left:20px;
}
& label {
  color:${(props) => (props.state ? '#FF9E44' : '#7f7676')};
  font-family: 'Noto Sans', 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 34px;
  text-align: center;
}
&:hover label{
  color:${(props) => (props.state ? '#FF9E44' : '#07b8b8')};
}
& label.Mui-focused {
  color: ${(props) => (props.state ? '#FF9E44' : '#07b8b8')};
}
& .MuiOutlinedInput-root {
  border-radius:10px;
  & fieldset{
    border: ${(props) =>
      props.state ? '3px solid #FF9E44' : '2px solid #ccc'};
  }
  &:hover fieldset {
    border: ${(props) =>
      props.state ? '3px solid #FF9E44' : '3px solid #07b8b8'};
  }
  &.Mui-focused fieldset{
    border: ${(props) =>
      props.state ? '3px solid #FF9E44' : '3px solid #07b8b8'};
  }
}
`;
