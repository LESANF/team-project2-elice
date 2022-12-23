import styled from 'styled-components';

interface IStyledP {
  fontSize: string;
  fontWeight?: string;
}

export const FooterContainer = styled.div`
  width: 100%;
  background: #1a201b;
  display: flex;
  flex-direction: column;
  padding: 40px 33px;
  gap: 18px;
`;
export const StyledP = styled.p<IStyledP>`
  color: #e1e1e1;
  font-size: ${(props) => props.fontSize};
  font-family: 'Noto Sans', 'Noto Sans KR';
  font-weight: ${(props) => (props.fontWeight ? props.fontWeight : '400')};
`;
export const TeamMembers = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
export const MemberInfo = styled.div`
  display: flex;
  flex-direction: column;
  min-width: 260px;
  gap: 2px;
`;
