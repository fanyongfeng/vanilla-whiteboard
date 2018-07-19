const letters = 'abcdefghijklmnopqrstuvwxyz1234567890'.split('');
const random = function(min, max) {
  if (max == null) {
    max = min;
    min = 0;
  }
  return min + Math.floor(Math.random() * (max - min + 1));
};

export function rdomLetters(min, max) {
  let len = random(min, max);
  let ret = '';

  for (let i = 0; i < len; i++) ret += letters[random(0, 35)];
  return ret;
}