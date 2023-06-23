/**
Import it as const _p = require('helpers/asyncWrapper');
this function can simplify async calls with await.
It always return an array [err,data]
if there's error, data will be null. or vice versa
 */

// prettier-ignore
export default async function <T>(promise: Promise<T>): Promise<[Error | null, T | null]> {
  return new Promise<[Error | null, T | null]>((resolve) => {
    promise
      .then((value) => {
        resolve([null, value]);
      })
      .catch((err) => {
        resolve([err, null]);
      });
  });
}
