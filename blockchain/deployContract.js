const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

const web3 = new Web3('http://localhost:8545'); // Connect to local Ethereum node (Ganache)

const contractABI = JSON.parse(fs.readFileSync(path.join(__dirname, '../server/blockchain/ShieldGuardABI.json')));
const contractBytecode = '0x' + fs.readFileSync(path.join(__dirname, '../server/blockchain/ShieldGuardBytecode.bin')).toString();

const deploy = async () => {
  const accounts = await web3.eth.getAccounts();
  const result = await new web3.eth.Contract(contractABI)
    .deploy({ data: contractBytecode })
    .send({ from: accounts[0], gas: '3000000' });

  console.log('Contract deployed to', result.options.address);
};

deploy();
