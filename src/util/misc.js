const letters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

function genMixId (num) {
  if(num < 62) return letters[num];
  let rem = num % 62; return genMixId(parseInt(num / 62)) + letters[rem];
}

/**
 * Generate unique id of client side
 */
export const generateId = (() => {
  let uid =0;
  return ()=> uid++;
}) ();

/**
 * Generate unique id via timestamp, and format as [0-9a-zA-Z]
 */
export const generateMixId = () => genMixId(+new Date);