/**
 * promise-retry.js
 * 
 * It offer Promise with ability to delay and retry.
 */

Promise.wait = function(time) {
  return new Promise(function(resolve) {
    return setTimeout(resolve, time || 0);
  });
};

Promise.retry = function(cont, fn, delay, ...args) {
  return fn(...args).catch(function(err) {
    return cont > 0 ? Promise.wait(delay).then(function() {
      return Promise.retry(cont - 1, fn, delay, ...args);
    }) : Promise.reject(err);
  });
};