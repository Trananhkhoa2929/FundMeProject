require("@nomiclabs/hardhat-ethers");
require("@nomiclabs/hardhat-waffle");
require("dotenv").config();

const SEPOLIA_URL = process.env. SEPOLIA_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
  solidity: {
    version:  "0.8.9",
    settings: {
      optimizer:  {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 1337,
    },
    sepolia: {
      url: SEPOLIA_URL,
      accounts:  PRIVATE_KEY ?  [PRIVATE_KEY] : [],
      chainId: 11155111,
    },
  },
};