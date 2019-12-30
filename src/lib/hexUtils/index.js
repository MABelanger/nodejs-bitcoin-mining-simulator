'use strict';

function _reverseHex(inputHex){
  return inputHex.match(/../g).reverse().join('');
}

function getHexBigIndian(inputHex){
  return _reverseHex(inputHex);
}

function getHexLittleIndian(inputHex){
  return _reverseHex(inputHex);
}

function decimalToHex(d, padding) {
    let hex = Number(d).toString(16);

    // add padding if needed.
    while (hex.length < padding) {
        hex = "0" + hex;
    }

    return hex;
}

function getLittleIndianFromDecimal(inputDecimal) {
  const hex = decimalToHex(inputDecimal, 8);
  return getHexLittleIndian(hex);
}


module.exports = {
  getHexBigIndian,
  getHexLittleIndian,
  decimalToHex,
  getLittleIndianFromDecimal
};
