interface IState {
  NORMAL: string; // 입력 전
  SUCCESS: string; //  성공
  STRERROR: string; // 길이 문법 오류
  EXISTERROR: string; // 중복오류
  NONEXISTERROR: string; // 일치하는 정보 없음 오류
  NONCONFIRMERROR: string;
  ERROR: string;
}
export const state: IState = {
  NORMAL: 'NORMAL', // 입력 전
  SUCCESS: 'SUCCESS',
  STRERROR: 'STRERROR',
  EXISTERROR: 'EXISTERROR', // 회원가입
  NONEXISTERROR: 'NONEXISTERROR', // 로그인
  NONCONFIRMERROR: 'NONCONFIRMERROR', // 비밀번호 확인 불일치
  ERROR: 'ERROR',
};
export const validateEmail = (i: string) =>
  String(i)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    );
export const validatePw = (i: string) =>
  String(i).match(/^(?=.*?[A-Z])(?=.*?[0-9]).{8,16}$/);

//  경고문구
export const warningNickname = (s: string) => {
  let warning = '';
  switch (s) {
    case state.STRERROR:
      warning = `2자이상 8자 이하로 작성해주세요`;
      break;
    case state.EXISTERROR:
      warning = `이미 존재하는 닉네임이 있습니다`;
      break;
    default:
      break;
  }
  return warning;
};

export const warningEmail = (s: string) => {
  let warning = '';
  switch (s) {
    case state.STRERROR:
      warning = `올바른 이메일 형식을 작성해주세요`;
      break;
    case state.EXISTERROR:
      warning = `이미 존재하는 이메일이 있습니다`;
      break;
    case state.NONEXISTERROR:
      warning = `일치하는 회원정보가 없습니다`;
      break;
    default:
      break;
  }
  return warning;
};

export const warningPw = (s: string) => {
  let warning = '';
  switch (s) {
    case state.STRERROR:
      warning = `대문자 포함 8자 이상 16자 이하로 작성해주세요`;
      break;
    case state.NONCONFIRMERROR:
      warning = `새 비밀번호와 일치하지 않습니다`;
      break;
    default:
      break;
  }
  return warning;
};
