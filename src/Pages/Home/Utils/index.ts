// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

const handleTouchEvent = (e: Event) => {
  e.preventDefault();
  console.log(e);
};
let isAnimating = false;
const handleWheelEvent = (e: any) => {
  e.preventDefault();
  if (e.deltaY > 0 && !isAnimating) {
    isAnimating = true;
    if (window.visualViewport)
      window.scrollBy({
        top: window.visualViewport.height,
        behavior: 'smooth',
      });
    setTimeout(() => {
      isAnimating = false;
    }, 800);
  }
  if (e.deltaY < 0 && !isAnimating) {
    isAnimating = true;
    if (window.visualViewport)
      window.scrollBy({
        top: -window.visualViewport.height,
        behavior: 'smooth',
      });
    setTimeout(() => {
      isAnimating = false;
    }, 800);
  }
};

const preventDefaultForScrollKeys = (e: any): void | boolean => {
  if (keys[e.keyCode as 37]) {
    e.preventDefault();
    return false;
  }
  return undefined;
};

// modern Chrome requires { passive: false } when adding event
let supportsPassive = false;
try {
  window.addEventListener(
    'test',
    null as any,
    Object.defineProperty({}, 'passive', {
      get: () => {
        supportsPassive = true;
      },
    }),
  );
} catch (e) {
  console.log(e);
}

const wheelOpt = supportsPassive ? { passive: false } : false;
const wheelEvent =
  'onwheel' in document.createElement('div') ? 'wheel' : 'mousewheel';

const preventResizeScroll = (e: any, start: any) => {
  if (window.visualViewport) {
    const vh = window.visualViewport.height;
    const delta = vh - start;
    if (window.scrollY % vh === 0) return;
    if (window.scrollY < vh) window.scrollTo(0, vh);
    else if (window.scrollY < vh * 2) {
      if (delta < 0) window.scrollTo(0, vh);
      else window.scrollTo(0, vh * 2);
    } else if (window.scrollY < vh * 3) {
      if (delta < 0) window.scrollTo(0, vh * 2);
      else window.scrollTo(0, vh * 3);
    } else if (window.scrollY < vh * 4) window.scrollTo(0, vh * 3);
  }
};

const debounceEvent = (cb: any, delay: number) => {
  let timeout: any;
  let startVh: number | undefined = 0;
  let flag = false;
  return function (...args: any) {
    if (!flag) startVh = window.visualViewport?.height;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(args, startVh);
      flag = false;
    }, delay);
    flag = true;
  };
};

const debounceResizeEvent = debounceEvent(preventResizeScroll, 500);

export const disableScroll = () => {
  window.addEventListener('DOMMouseScroll', handleWheelEvent, false); // older FF
  window.addEventListener(wheelEvent, handleWheelEvent, wheelOpt); // modern desktop
  // window.addEventListener('touchmove', handleTouchEvent, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
  window.addEventListener('resize', debounceResizeEvent);
};

export const removeDisableScroll = () => {
  window.removeEventListener('DOMMouseScroll', handleWheelEvent);
  window.removeEventListener(wheelEvent, handleWheelEvent);
  window.removeEventListener('keydown', preventDefaultForScrollKeys);
  window.removeEventListener('resize', debounceResizeEvent);
};
