
const path = require('path');
const sleep = require('util').promisify(setTimeout)

const headerMod = require('./header');
const sha256Mod = require('./sha256');
const hexUtils = require('./hexUtils');
const targetMod = require('./target');
const merkleRootMod = require('./merkleRoot');
const printUtilsMod = require('./printUtils');
const jsonBlockUtilsMod = require('./jsonBlockUtils');

function getRandom0To100(){
  return Math.floor(Math.random() * 100);
}

function getRandomNonce(correctNonce){
  // The randomNonce is correct 1/100 times
  // The correct nonce will be return when getRandom0To100() = 0
  const randomNonce = parseInt(parseInt(correctNonce) - getRandom0To100());
  return randomNonce;
}

function getNetworkConstantBlockInfo(block){
  // These two variable (version, prevBlockHash and target) is set by the network...
  // if not it's a hard fork
  // They are the same for all miners in the current block
  const version = hexUtils.getHexLittleIndian(block.versionHex);
  const prevBlockHash = hexUtils.getHexLittleIndian(headerMod.getPreviousBlockHash(block.previousblockhash));
  const bits =  hexUtils.getHexLittleIndian(block.bits);

  return {
    version,
    prevBlockHash,
    bits
  };
}

function getHeader(block){

  const NETWORK_CONSTANT_BLOCK_INFO = getNetworkConstantBlockInfo(block);

  // Fixed value here but supposed to change when.... :
  const merkleRoot = merkleRootMod.getMerkleRoot(block.tx);                       // transaction is added to the pool
  const timestamp = hexUtils.getLittleIndianFromDecimal(block.time);              // each second
  const nonce = hexUtils.getLittleIndianFromDecimal(getRandomNonce(block.nonce)); // each iteration (try)

  return {
    version: NETWORK_CONSTANT_BLOCK_INFO.version,
    prevBlockHash: NETWORK_CONSTANT_BLOCK_INFO.prevBlockHash,
    merkleRoot,
    timestamp,
    nonce,
    bits: NETWORK_CONSTANT_BLOCK_INFO.bits
  };
}

function mineBlock(block){

  // constant but calculated by the miner from bits field.
  const TARGET = targetMod.getTargetHex(block.bits);

  let numberOfTry = 0;
  let isSolutionFound = false;

  printUtilsMod.printBlockNo(block.height);

  while (!isSolutionFound) {

    const header = getHeader(block);

    printUtilsMod.printNumberOfTry(numberOfTry, header.nonce);

    const concatHeaderHex = headerMod.getConcatHeader(header);
    const headerSha256Hex = headerMod.getHeaderSha256Hex(concatHeaderHex);

    isSolutionFound = headerMod.isHeaderHashLessThanTarget(headerSha256Hex, TARGET);

    if(!isSolutionFound){
      numberOfTry+=1;

    } else {
      printUtilsMod.printSolutionFound(headerSha256Hex, TARGET);
      printUtilsMod.printHeader(header);
    }
  }
}

function mineAllBlocks(){
  const directoryPath = path.join(__dirname, '../../', 'json-blocks');

  jsonBlockUtilsMod.getBlocks(directoryPath, function(blocks){
    blocks.forEach((block)=>{
      mineBlock(block);
    });
  });

}

mineAllBlocks();
