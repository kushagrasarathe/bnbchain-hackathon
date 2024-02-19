import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
const RPC = "https://data-seed-prebsc-1-s1.bnbchain.org:8545";
import dotenv from "dotenv";

dotenv.config({ path: ".env" });

const PRIVATE_KEY = process.env.PRIVATE_KEY;

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.10",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
    },
  },
  networks: {
    bnbSCTestnet: {
      url: RPC,
      accounts: [PRIVATE_KEY],
      gasPrice: 10000000000,
    },
  },
};
// 10000000000;
// 5000000000;
export default config;
