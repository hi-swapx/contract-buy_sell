import {
  time,
  loadFixture,
} from "@nomicfoundation/hardhat-toolbox/network-helpers";
import { anyValue } from "@nomicfoundation/hardhat-chai-matchers/withArgs";
import { expect } from "chai";
import hre from "hardhat";

describe("BS", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function deployBueSellFixture() {
    // Contracts are deployed using the first signer/account by default
    const [owner, otherAccount] = await hre.ethers.getSigners();

    const BuySell = await hre.ethers.getContractFactory("BuySell");
    const bs = await BuySell.deploy();

    return { bs, owner, otherAccount };
  }

  async function token20Fixture() {
    const SwapXToken = await hre.ethers.getContractFactory("SwapXToken");
    const swapXToken = await SwapXToken.deploy();

    return { swapXToken };
  }

  before(async () => {
    const { owner } = await loadFixture(deployBueSellFixture);
    const { swapXToken } = await loadFixture(token20Fixture);
    const balance = await swapXToken.balanceOf(owner);

    expect(balance).to.gt(0);
  });

  it("Should deposit correctly", async function () {
    const { bs } = await loadFixture(deployBueSellFixture);
    const { swapXToken } = await loadFixture(token20Fixture);

    await bs.addSupportToken(swapXToken);

    const result = await bs.getSupportToken();
    const tokenAddress = await swapXToken.getAddress();
    expect(result).to.include(tokenAddress);

    const depositParams = {
      tokenAddress: swapXToken,
      amount: 1000000,
    };

    await swapXToken.approve(bs, 100000000);

    const depositRes = await bs.deposit(depositParams);

    expect(depositRes)
      .to.emit(bs, "Deposit")
      .withArgs(depositParams.amount, anyValue);

    const bsBalance = await swapXToken.balanceOf(bs);
    expect(bsBalance).to.equal(depositParams.amount);
  });
});
