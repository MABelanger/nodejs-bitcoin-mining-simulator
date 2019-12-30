'use strict';

const JsSHA = require('jssha');

function getSha256Hex(inputHex) {
  const shaObj = new JsSHA('SHA-256', 'HEX');
  shaObj.update(inputHex);

  return shaObj.getHash('HEX');
}

function getDoubleSha256(inputHex) {
  const firstHash = getSha256Hex(inputHex);
  return getSha256Hex(firstHash);
}

module.exports = {
  getDoubleSha256
};
