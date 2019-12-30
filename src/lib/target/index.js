'use strict';

const hexUtils = require('../hexUtils');

// inspired by : https://bigishdata.com/2017/11/13/how-to-build-a-blockchain-part-4-1-bitcoin-proof-of-work-difficulty-explained/
function getTargetHex(bitsHex) {
  // example of bitsInt = 453062093;
  // const bitsInt = parseInt(bits, 16);
  // const bitsHex = hexUtils.decimalToHex(bitsInt, 8); // '1b012dcd'
  const shift = bitsHex.substr(0, 2); // '1b'
  const shiftInt = parseInt(shift, 16); // 27
  const value = bitsHex.substr(2, bitsHex.length); // '012dcd'
  const valueInt = parseInt(value, 16); // 77261
  const target = valueInt * 2 ** (8 * (shiftInt - 3)); // 4.849751571777103e+62
  const targetHex = hexUtils.decimalToHex(target, 64); // '0000000000012dcd000000000000000000000000000000000000000000000000'
  return targetHex;
}

module.exports = {
  getTargetHex
}
