const letters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
const dateTS = 1000 * 3600 * 3; // 3 hours

function genMixId (num) {
  if(num < 62) return letters[num];
  let rem = num % 62; return genMixId(parseInt(num / 62)) + letters[rem];
}

/**
 * Generate unique id via timestamp per 3 hours, and format as [0-9a-zA-Z]+
 */
export const tsid = () => genMixId((+new Date % dateTS) * 1000 +  parseInt((Math.random() * 100) % 100, 10));
// export const tsid = () => genMixId(+new Date);

/**
 * Generate unique id of client side
 */
export const uid = (() => {
  let uid =0;
  return ()=> uid++;
}) ();