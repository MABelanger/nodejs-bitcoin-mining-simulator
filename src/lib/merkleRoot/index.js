// inspired by : https://bitcoin.stackexchange.com/questions/46843/how-can-i-verify-my-merkle-root-function-is-correct/46844
const _ = require('lodash');
const sha256Mod = require('../sha256');
const hexUtils = require('../hexUtils');

function getMerkleRootLittleIndian (hashes) {
  if (hashes.length == 1){
    return hashes[0];
  }

  return getMerkleRootLittleIndian(
    _.chain(hashes)
      .chunk(2)
      .each(leaves => leaves[1] = leaves[1] || leaves[0])
      .map(leaves => leaves.join('')) // concat the array
      .map(sha256Mod.getDoubleSha256)
      .value()
  )
}

function getMerkleRoot(txs){
  const littleIndianTxs = txs.map(hexUtils.getHexLittleIndian);
  return getMerkleRootLittleIndian(littleIndianTxs);
}

module.exports = {
  getMerkleRoot
}
