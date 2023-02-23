const hre = require("hardhat");

async function main() {
  const Upload = await hre.ethers.getContractFactory("Upload");
  const upload = await Upload.deploy();

  await upload.deployed();

  console.log("Library deployed to:", upload.address);
}
// contract address :  0x5FbDB2315678afecb367f032d93F642f64180aa3

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});