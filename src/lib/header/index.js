'use strict';

const sha256 = require('../sha256');
const hexUtils = require('../hexUtils');

function getConcatHeader(header) {
  const { version, prevBlockHash, merkleRoot, timestamp, bits, nonce } = header;
  const hexHeader = `${version}${prevBlockHash}${merkleRoot}${timestamp}${bits}${nonce}`;
  return hexHeader;
}

function getHeaderSha256Hex(headerHex) {
  const doubleHash = sha256.getDoubleSha256(headerHex);
  const headerSha256Hex = hexUtils.getHexBigIndian(doubleHash);

  return headerSha256Hex;
}

function getPreviousBlockHash(prevBlockHash){
  const GENESIS_PREV_BLOCK = "0000000000000000000000000000000000000000000000000000000000000000";
  if(prevBlockHash === undefined) {
    return GENESIS_PREV_BLOCK;
  }
  return prevBlockHash;
}

function isHeaderHashLessThanTarget(headerHash, target) {
    return parseInt(headerHash, 16) < parseInt(target, 16);
}

module.exports = {
  getConcatHeader,
  getHeaderSha256Hex,
  getPreviousBlockHash,
  isHeaderHashLessThanTarget
}
