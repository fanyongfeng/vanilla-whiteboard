const letters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const dateTS = 1000 * 3600 * 3; // 3 hours

/**
 * Generate ID as format [0-9a-zA-Z]+
 * @param num
 */
function genMixId(num: number) {
  if (num < 62) return letters[num];
  let rem = num % 62;
  return genMixId(parseInt((num / 62).toString())) + letters[rem];
}

/**
 * Generate unique id via timestamp per 3 hours, and format as [0-9a-zA-Z]+
 */
export const tsid = () => genMixId((+new Date() % dateTS) * 1000 + parseInt(((Math.random() * 100) % 100).toString(), 10));

/**
 * Generate unique id of client side
 */
export const uid = (() => {
  let uid = 0;
  return () => {
    uid++;
    return uid;
  };
})();
