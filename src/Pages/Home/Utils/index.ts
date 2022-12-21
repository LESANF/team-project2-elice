// left: 37, up: 38, right: 39, down: 40,
// spacebar: 32, pageup: 33, pagedown: 34, end: 35, home: 36
const keys = { 37: 1, 38: 1, 39: 1, 40: 1 };

function handleTouchEvent(e: Event) {
  e.preventDefault();
  console.log(e);
}
let isAnimating = false;
function handleWheelEvent(e: any) {
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
}

function preventDefaultForScrollKeys(e: any): void | boolean {
  if (keys[e.keyCode as 37]) {
    e.preventDefault();
    return false;
  }
  return undefined;
}

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

// call this to Disable
export const disableScroll = () => {
  window.addEventListener('DOMMouseScroll', handleWheelEvent, false); // older FF
  window.addEventListener(wheelEvent, handleWheelEvent, wheelOpt); // modern desktop
  // window.addEventListener('touchmove', handleTouchEvent, wheelOpt); // mobile
  window.addEventListener('keydown', preventDefaultForScrollKeys, false);
};

export const debounceResizeEvent = (cb: any, delay: number) => {
  let timeout: any;
  return function (...args: any) {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      cb(args);
    }, delay);
  };
};
