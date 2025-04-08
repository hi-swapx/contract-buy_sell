import hre from "hardhat";

const BSAddr = "0x1E353BfA97200e003F3cebd79069377d27F7477d";
const Token1Addr = "0xEFDDe9279b747C57A3aAA70796EB5679cAEd51a2";

const delay = (time: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, time);
  });
};

async function approveBSToken() {
  const bs = await hre.ethers.getContractAt("BuySell", BSAddr);
  const bsToken = await hre.ethers.getContractAt("IERC20", Token1Addr);
  const { hash } = await bsToken.approve(bs, hre.ethers.parseUnits("100", 6));
  console.log("approve hash:", hash);
}

async function addSupportToken() {
  const bs = await hre.ethers.getContractAt("BuySell", BSAddr);
  await bs.addSupportToken(Token1Addr);
}

async function deposit() {
  const bs = await hre.ethers.getContractAt("BuySell", BSAddr);
  const depositParams = {
    tokenAddress: Token1Addr,
    amount: hre.ethers.parseUnits("100", 6),
  };
  const { hash } = await bs.deposit(depositParams);
  console.log("deposit  hash:", hash);
}

async function withdraw() {
  const bs = await hre.ethers.getContractAt("BuySell", BSAddr);
  const depositParams = {
    toAddress: "0xB4bf6cB4c3370A5ba0132C8A97f9597b0c2e3B01",
    tokenAddress: Token1Addr,
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
  // await withdraw();
}

main();
