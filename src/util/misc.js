const letters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

export function genMixId (num) {
  if(num < 62) return letters[num];
  let rem = num % 62; return genMixId(parseInt(num / 62)) + letters[rem];
}