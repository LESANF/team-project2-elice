import Spin from './spin.gif';

const Spinner = () => (
  <div
    style={{
      width: '100%',
      height: '100vh',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#fff',
    }}
  >
    <img src={Spin} alt="로딩중" />
  </div>
);

export default Spinner;
