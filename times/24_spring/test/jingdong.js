const theN = 7;
// 求 1 / theN 的循环节长度
function getLoopLength(theN) {
  let remainder = 1;
  let remainders = [];
  while (true) {
    remainder = (remainder * 10) % theN;
    if (remainders.includes(remainder)) {
      return remainders.length - remainders.indexOf(remainder);
    }
    remainders.push(remainder);
  }
}
