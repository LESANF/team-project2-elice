import * as S from './styled';
import { ReactComponent as NothingSVG } from './nothing.svg';

const Nothing = () => (
  <div
    style={{
      height: 'calc(100vh - 77px)',
      width: '75vw',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
    }}
  >
    <NothingSVG />
    <p>사진이 없습니다</p>
    <p style={{ whiteSpace: 'nowrap' }}>
      사진을 올려 다른 사람들과 공유해보세요
    </p>
  </div>
);

export default Nothing;
