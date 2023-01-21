
const hre = require("hardhat");

async function main() {

  const HongBao = await hre.ethers.getContractFactory("HongBao");
  const hongBao = await HongBao.deploy();

  await hongBao.deployed();

  console.log("HongBao deployed to:", hongBao.address);
  
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });

