require("@nomiclabs/hardhat-waffle");
require("dotenv").config({ path: ".env" });

const APOTHEM_RPC = "https://erpc.apothem.network";

module.exports = {
  solidity: "0.8.10",
  networks: {
    xdcApothem: {
      url: APOTHEM_RPC,
      accounts: [process.env.PRIVATE_KEY],
    },
  },
};
