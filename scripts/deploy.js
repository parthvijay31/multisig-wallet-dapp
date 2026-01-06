const hre = require("hardhat");

async function main() {
  const owners = [
    "0x491f30410a8641EbB754A15AE937dDD4BD8d8a12", // Account 1
    "0xD1276051f950226da6790cE6D9Dc50b35919327F"  // Account 2
  ];

  const required = 1; // minimum approvals to execute

  const MultiSigWallet = await hre.ethers.getContractFactory("MultiSigWallet");
  const multisig = await MultiSigWallet.deploy(owners, required);

  await multisig.waitForDeployment();

  console.log("🚀 MultiSig deployed at:", await multisig.getAddress());
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
