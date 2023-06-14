/**
Import it as const _p = require('helpers/asyncWrapper');
this function can simplify async calls with await.
It always return an array [err,data]
if there's error, data will be null. or vice versa
 */

module.exports = async (_promise) =>
  new Promise((resolve) => {
    _promise
      .then((value) => {
        resolve([null, value]);
      })
      .catch((err) => {
        resolve([err, null]);
      });
  });
