const hardHat = require("hardhat");

async function main() {
  console.log("\n🚀 Deploying DonateToACharity contract...");
  
  // We get the contract to deploy.
  const DonateToACharity = await hardHat.ethers.getContractFactory(
    "DonateToACharity"
  );
  const donateToACharity = await DonateToACharity.deploy();

  // Deploy the contract.
  await donateToACharity.deployed();
  
  console.log("\n✅ Contract deployed successfully!");
  console.log("\n📝 Contract Address:", donateToACharity.address);
  console.log("\n⚠️  IMPORTANT: Copy this address and update it in:");
  console.log("   gofundme/src/utils/utilFunctions.js");
  console.log("   (replace the contractAddress variable)\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
