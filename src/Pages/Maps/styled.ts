import styled from 'styled-components';

export const CustomOverlayStyle = styled.div`
  border-radius: 50% 50% 50% 0;
  border: 4px solid #fff;
  width: 50px;
  height: 50px;
  transform: rotate(-45deg);
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
  transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);

  &:hover {
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
    width: 54px;
    height: 54px;
  }

  > img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    transform: rotate(45deg);
  }
`;

export const HashTagStyle = styled.div`
  display: inline-block;
  background-color: #7978c6;
  color: #fff;
  border-radius: 35px;
  font-size: 14px;
  padding: 10px 20px;
  cursor: pointer;
  margin-bottom: 10px;
`;
