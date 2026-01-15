const hardhat = require("hardhat");

async function main() {
  console.log("\n🔍 Testing DonateToACharity Contract\n");

  // Get test accounts
  const [owner, donor1, donor2] = await hardhat.ethers.getSigners();

  // Deploy contract
  console.log("📝 Deploying contract...");
  const DonateToACharity = await hardhat.ethers.getContractFactory("DonateToACharity");
  const contract = await DonateToACharity.deploy();
  await contract.deployed();

  console.log("✅ Contract deployed to:", contract.address);
  console.log("👤 Owner:", owner.address);
  console.log("👤 Donor 1:", donor1.address);
  console.log("👤 Donor 2:", donor2.address);

  // Test 1: Make a donation
  console.log("\n💰 Test 1: Making donations...");
  const donationAmount = hardhat.ethers.utils.parseEther("0.5"); // 0.5 ETH

  const tx1 = await contract.connect(donor1).sendEthToCharity(
    "Alice",
    "Donating to flood victims",
    { value: donationAmount }
  );
  await tx1.wait();
  console.log("✅ Donor 1 donated 0.5 ETH");

  const tx2 = await contract.connect(donor2).sendEthToCharity(
    "Bob",
    "Donating to flood victims",
    { value: hardhat.ethers.utils.parseEther("1.0") }
  );
  await tx2.wait();
  console.log("✅ Donor 2 donated 1.0 ETH");

  // Test 2: Get all donations
  console.log("\n📋 Test 2: Getting all donations...");
  const donations = await contract.getDonors();
  console.log(`Total donations: ${donations.length}`);
  
  donations.forEach((donation, index) => {
    console.log(`\nDonation ${index + 1}:`);
    console.log(`  Donor: ${donation.donorAddress}`);
    console.log(`  Name: ${donation.donorName}`);
    console.log(`  Amount: ${hardhat.ethers.utils.formatEther(donation.amount)} ETH`);
    console.log(`  Charity: ${donation.charity}`);
  });

  // Test 3: Check contract balance
  console.log("\n💎 Test 3: Contract balance...");
  const balance = await contract.getBalance();
  console.log(`Contract balance: ${hardhat.ethers.utils.formatEther(balance)} ETH`);

  // Test 4: Withdraw (only owner)
  console.log("\n🏦 Test 4: Testing withdrawal...");
  const ownerBalanceBefore = await owner.getBalance();
  const tx3 = await contract.connect(owner).withdraw();
  await tx3.wait();
  const ownerBalanceAfter = await owner.getBalance();
  console.log(`✅ Owner withdrew funds`);
  console.log(`Owner balance increased by ~${hardhat.ethers.utils.formatEther(ownerBalanceAfter.sub(ownerBalanceBefore))} ETH`);

  const finalBalance = await contract.getBalance();
  console.log(`Contract balance after withdrawal: ${hardhat.ethers.utils.formatEther(finalBalance)} ETH`);

  console.log("\n✨ All tests completed successfully!\n");
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
