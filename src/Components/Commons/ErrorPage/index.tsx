import { useNavigate } from 'react-router-dom';
import * as S from './styled';
import { MuiButton } from '../Header/styled';
import { ReactComponent as StatusCode } from './404.svg';
import magnifyingGlass from './magnifyingGlass.png';

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <S.ErrorPage
      onMouseMove={(e) => {
        if (window.visualViewport) {
          const vh = window.visualViewport.height;
          const vw = window.visualViewport.width;
          const glass = document.querySelector('.glass');
          glass?.setAttribute(
            'style',
            `transform:translate(${(vw / 2 - e.clientX) / 20}px,${
              (vh / 2 - e.clientY) / 20
            }px)`,
          );
        }
      }}
    >
      <S.ImageContainer>
        <S.MagnifyingGlass
          className="glass"
          src={magnifyingGlass}
          alt="돋보기"
        />
        <StatusCode
          style={{
            position: 'absolute',
            zIndex: '0',
            transform: 'translateY(-144px)',
          }}
        />
      </S.ImageContainer>
      <S.StyledP
        style={{ marginTop: '4vh' }}
        fontSize="24px"
        color="#1A201B"
        fontWeight="600"
      >
        찾을 수 없는 페이지입니다.
      </S.StyledP>
      <S.StyledP style={{ marginTop: '2vh' }}>
        페이지가 존재하지 않거나, 사용할 수 없는 페이지 입니다.
        <br />
        입력하신 주소가 정확한지 다시 한번 확인해 주시기 바랍니다.
      </S.StyledP>
      <div style={{ display: 'flex', marginTop: '7vh' }}>
        <MuiButton
          textcolor="#07B8B8"
          hoverbackgroundcolor="#f9f9f9"
          onClick={() => {
            navigate(-1);
          }}
        >
          이전 화면
        </MuiButton>
        <MuiButton
          style={{ marginLeft: '24px' }}
          textcolor="#ffffff"
          backgroundcolor="#07B8B8"
          hoverbackgroundcolor="#00A8A7"
          onClick={() => {
            navigate('/');
          }}
        >
          홈으로 가기
        </MuiButton>
      </div>
    </S.ErrorPage>
  );
};

export default ErrorPage;
