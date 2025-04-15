import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.24",
  networks: {
    hardhat: {
      accounts: [
        {
          privateKey: "",
          balance: "9000000000000000000000000",
        },
      ],
    },
    holesky: {
      // url: "https://rpc.ankr.com/eth_holesky",
      url: "https://blockchain.googleapis.com/v1/projects/compact-nirvana-444108-k6/locations/asia-east1/endpoints/ethereum-holesky/rpc?key=AIzaSyCWNQxcEg3xIY_R6PizTkSvHgoDALT6r5Y",
      accounts: [""],
    },
    sepolia: {
      url: "https://blockchain.googleapis.com/v1/projects/compact-nirvana-444108-k6/locations/asia-east1/endpoints/ethereum-sepolia/rpc?key=AIzaSyCWNQxcEg3xIY_R6PizTkSvHgoDALT6r5Y",
      accounts: [""],
    },
    bsctest: {
      url: "https://rpc.ankr.com/bsc_testnet_chapel/de03c023c366ee00c499e88d082dc0849b68ee22735f026a42fddbf1182cf5ff",
      accounts: [""],
    },
    xonetest: {
      url: "https://rpc-testnet.xone.plus",
      accounts: [""],
    },
  },
};

export default config;
