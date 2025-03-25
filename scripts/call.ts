import hre from "hardhat";

console.log("");

const BSAddr = "0xed7c9Aca989650c7Aae93E5A15bD62B0Fc6e2c93";
const BSTokenAddr = "0xEFDDe9279b747C57A3aAA70796EB5679cAEd51a2";
const USDHAddr = "0xc69751291E117420065c10bc4ba155448a5e7338";

const delay = (time: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
};

async function approveBSToken() {
  const bs = await hre.ethers.getContractAt("BuySell", BSAddr);
  const bsToken = await hre.ethers.getContractAt("SwapXToken", BSTokenAddr);
  const { hash } = await bsToken.approve(bs, hre.ethers.parseUnits("100", 6));
  console.log("approveBSToken===>", hash);
}

async function addSupportToken() {
  const bs = await hre.ethers.getContractAt("BuySell", BSAddr);
  await bs.addSupportToken(BSTokenAddr);
}

async function getSupportToken() {
  const bs = await hre.ethers.getContractAt("BuySell", BSAddr);
  const supportTokens = await bs.getSupportToken();
  console.log("supportTokens===>", supportTokens);
}

async function deposit() {
  const bs = await hre.ethers.getContractAt("BuySell", BSAddr);
  const depositParams = {
    tokenAddress: BSTokenAddr,
    amount: hre.ethers.parseUnits("100", 6),
  };
  const { hash } = await bs.deposit(depositParams);
  console.log("deposit====>", hash);
}

async function withdraw() {
  const bs = await hre.ethers.getContractAt("BuySell", BSAddr);
  const depositParams = {
    toAddress: "0xB4bf6cB4c3370A5ba0132C8A97f9597b0c2e3B01",
    tokenAddress: BSTokenAddr,
    amount: 10000,
  };
  const { hash } = await bs.withdraw(depositParams);
  console.log("withdraw hash:", hash);
}

async function main() {
  // await addSupportToken();
  // await delay(3000);
  // await getSupportToken();
  // await approveBSToken();
  // await delay(3000);
  // await deposit();
  await withdraw();
}

main();
