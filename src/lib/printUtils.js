'use strict';

function printNumberOfTry(numberOfTry, nonce){
  process.stdout.write('\r' + 'numberOfTry: ' + numberOfTry + ' -> nonce : (' + nonce  + ')');
}

function printSolutionFound(headerSha256Hex, target){
  console.log('');
  console.log('!!!We found a perfect header combinaison!!!');
  console.log('because the hash of the header is:  ' + headerSha256Hex);
  console.log('and is smaller than the target:     ' + target);
}

function printHeader(header){
  const { version, prevBlockHash, merkleRoot, timestamp, sizeBits, nonce } = header;
  console.log('Base on the header:');
  console.log('  version:     ' + version);
  console.log('  prev_block:  ' + prevBlockHash);
  console.log('  merkle_root: ' + merkleRoot);
  console.log('  timestamp:   ' + timestamp);
  console.log('  size_bits:   ' + sizeBits);
  console.log('  nonce:       ' + nonce);
}

function printBlockNo(blockNo){
  console.log('\n\n');
  console.log('mining block no: ', blockNo);
}

module.exports = {
  printNumberOfTry,
  printSolutionFound,
  printHeader,
  printBlockNo
};
