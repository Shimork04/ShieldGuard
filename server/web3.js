const Web3 = require('web3');
const fs = require('fs');
const path = require('path');

// Connect to local Ethereum node (Ganache)
const web3 = new Web3('http://localhost:8545');
const contractAddress = '0xYourContractAddress'; // Replace with the deployed contract address
const contractABI = JSON.parse(fs.readFileSync(path.join(__dirname, './blockchain/ShieldGuardABI.json')));

const shieldGuardContract = new web3.eth.Contract(contractABI, contractAddress);

module.exports = { shieldGuardContract };
