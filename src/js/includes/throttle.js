/**
 * @file
 * A lightweight throttle Function.
 *
 * Docs: https://remysharp.com/2010/07/21/throttling-function-calls
 *
 * $(window).on('resize', throttle(function () {
 *   console.log('resized');
 * }));
 *
 */

const throttle = (fn, threshhold, scope) => {
  threshhold || (threshhold = 100);
  let last;
  let deferTimer;
  return function () {
    const context = scope || this;

    const now = +new Date;
    const args = arguments;
    if (last && now < last + threshhold) {
      // hold on to it
      clearTimeout(deferTimer);
      deferTimer = setTimeout(() => {
        last = now;
        fn.apply(context, args);
      }, threshhold);
    }
    else {
      last = now;
      fn.apply(context, args);
    }
  };
}

export default throttle;