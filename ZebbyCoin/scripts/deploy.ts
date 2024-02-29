import { ethers } from "hardhat";

async function main() {
  const lock = await ethers.deployContract("ZebbyCoin", ["0xb3025055adcD0EEEB96b659eF34c46DEE52Cb0c5"]);

  await lock.waitForDeployment();

  console.log(
    `Token deployed to ${lock.target}`
  );
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});