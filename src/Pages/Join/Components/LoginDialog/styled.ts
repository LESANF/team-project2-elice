import TextField from '@mui/material/TextField';
import { styled as styledMui } from '@mui/material/styles';
import styled from 'styled-components';

interface IInput {
  state?: string;
}

export const Title = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  font-size: 25px;
  font-weight: 800;
  margin-bottom: 30px;
  img {
    height: 100px;
    margin: 0px auto;
    margin-bottom: 20px;
  }
`;
export const Form = styled.form`
  /* border: 1px solid pink; */
  height: 80px;
  display: flex;
  margin-top: 20px;
  div.title {
    width: 100px;
  }
  div.body {
    width: 100%;
    margin-left: auto;
  }
  input {
    height: 80%;
    width: 90%;
    border-radius: 12px;
    background-color: white;
    border: 1px solid #cccccc;
    font-size: 20px;
    padding: 0px 20px;
  }
  + form {
    margin-top: 20px;
  }
`;

export const Button = styled.button`
  margin-top: auto;
  width: 100%;
  height: 80px;
  border-radius: 40px;
  border: 0px;
  background: #07b8b8;
  font-size: 35px;
  color: white;
  font-weight: 400;
  :hover {
    background-color: #00a8a7;
  }
  + div {
    margin-top: 20px;
    text-align: center;
  }
`;

export const Input = styledMui(TextField)<IInput>`
font-family: 'Noto Sans', 'Noto Sans KR';
font-style: normal;
font-weight: 600;
font-size: 20px;
border: ${(props) => (props.state ? '3px solid #FF9E44' : '0')};
border-radius: 4px;
padding: 2px 3px;
line-height: 27px;
text-align: center;
color: #5f5f5f;
::placeholder {
  color:#7f7676;
  font-family: 'Noto Sans', 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 20px;
  line-height: 27px;
  text-align: center;
}
:focus::placeholder {
  color: transparent;
}
:focus {
  border: 0;
}
:focus-visible {
  outline: none;
}
:hover {
  background: #f9f9f9;
}
& label.Mui-focused {
  color: green;
}
& .MuiInput-underline:after {
  border-bottom-color: green;
}
& .MuiOutlinedInput-root {
  & fieldset: {
    border-color: red;
  }
  &:hover fieldset {
    border: 0;
  }
  &.Mui-focused fieldset{
    border-color: green;
  }
}
`;
