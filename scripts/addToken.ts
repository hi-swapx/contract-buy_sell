import hre from "hardhat";

// console.log("process.env", process.env);

const TA = process.env.TA;
const CA = process.env.CA;

// const CA = "0xed7c9Aca989650c7Aae93E5A15bD62B0Fc6e2c93";

async function addSupportToken() {
  if (!TA || !CA) throw new Error("ENV params is lost");
  const bs = await hre.ethers.getContractAt("BuySell", CA);
  await bs.addSupportToken(TA);
}

async function main() {
  await addSupportToken();
}

main();
