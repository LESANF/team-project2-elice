import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const authenticatedState = atom({
  key: 'authenticatedState',
  default: false,
  effects_UNSTABLE: [persistAtom],
});

export const userState = atom({
  key: 'userState',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const TOKEN = atom({
  key: 'token',
  default: null,
  effects_UNSTABLE: [persistAtom],
});

export const MODE = atom({
  key: 'mode',
  default: 'join',
});
