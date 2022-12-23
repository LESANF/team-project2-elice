import * as S from './styled';
import { ReactComponent as Logo } from './footerLogo.svg';

const Footer = () => (
  <S.FooterContainer>
    <S.StyledP fontSize="13px">👥 Team7, elice software track 3th</S.StyledP>
    <S.TeamMembers>
      <S.StyledP
        style={{ margin: '0 6px', minWidth: '16px' }}
        fontSize="14px"
        fontWeight="500"
      >
        FE
      </S.StyledP>
      <S.StyledP fontSize="14px" fontWeight="500">
        김동한
      </S.StyledP>
      <S.MemberInfo>
        <S.StyledP fontSize="11px">Contact : lesacat94@gmail.com</S.StyledP>
        <S.StyledP fontSize="11px">
          Github : https://github.com/LESANF
        </S.StyledP>
      </S.MemberInfo>
      <S.StyledP fontSize="14px" fontWeight="500">
        김상현
      </S.StyledP>
      <S.MemberInfo>
        <S.StyledP fontSize="11px">Contact : sak5010@naver.com</S.StyledP>
        <S.StyledP fontSize="11px">
          Github : https://github.com/sak5010
        </S.StyledP>
      </S.MemberInfo>
      <S.StyledP fontSize="14px" fontWeight="500">
        김채현
      </S.StyledP>
      <S.MemberInfo>
        <S.StyledP fontSize="11px">Contact : kch7892003@naver.com</S.StyledP>
        <S.StyledP fontSize="11px">
          Github : https://github.com/ggongjukim
        </S.StyledP>
      </S.MemberInfo>
      <S.StyledP fontSize="14px" fontWeight="500">
        최충우
      </S.StyledP>
      <S.MemberInfo>
        <S.StyledP fontSize="11px">Contact : lrour153@naver.com</S.StyledP>
        <S.StyledP fontSize="11px">
          Github : https://github.com/chuuchoi
        </S.StyledP>
      </S.MemberInfo>
    </S.TeamMembers>
    <S.TeamMembers>
      <S.StyledP
        style={{ margin: '0 6px', minWidth: '16px' }}
        fontSize="14px"
        fontWeight="500"
      >
        BE
      </S.StyledP>
      <S.StyledP fontSize="14px" fontWeight="500">
        김익수
      </S.StyledP>
      <S.MemberInfo>
        <S.StyledP fontSize="11px">Contact : iksukis8604@gmail.com</S.StyledP>
        <S.StyledP fontSize="11px">
          Github : https://github.com/gimmicks-u
        </S.StyledP>
      </S.MemberInfo>
      <S.StyledP fontSize="14px" fontWeight="500">
        노재훈
      </S.StyledP>
      <S.MemberInfo>
        <S.StyledP fontSize="11px">Contact : skybloom7777@gamil.com</S.StyledP>
        <S.StyledP fontSize="11px">
          Github : https://github.com/nojahoon
        </S.StyledP>
      </S.MemberInfo>
    </S.TeamMembers>
    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
      <Logo />
      <S.StyledP fontSize="13px">
        © 2022 photolog, all rights reserved.
      </S.StyledP>
    </div>
  </S.FooterContainer>
);

export default Footer;
