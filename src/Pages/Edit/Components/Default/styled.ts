import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 53vh;
  flex-direction: column;
  justify-content: end;
  align-items: center;
  gap: 8px;
`;
export const Profile = styled.img`
  width: 120px;
  height: 120px;
  border-radius: 60px;
  cursor: pointer;
`;
export const PasswordChange = styled.p`
  padding: 10px 20px;
  font-family: 'Noto Sans', 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  color: #5f5f5f;
  cursor: pointer;
  :hover {
    font-weight: 500;
    color: #07b8b8;
  }
`;

export const NickName = styled.p`
  font-family: 'Noto Sans', 'Noto Sans KR';
  font-style: normal;
  font-weight: 600;
  font-size: 20px;
  line-height: 27px;
  text-align: center;
  color: #5f5f5f;
  cursor: pointer;
  margin-top: 30px;
`;

export const Email = styled.p`
  padding: 10px 20px;
  font-family: 'Noto Sans', 'Noto Sans KR';
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 25px;
  text-align: center;
  color: #5f5f5f;
  cursor: default;
  margin-bottom: 24px;
`;
