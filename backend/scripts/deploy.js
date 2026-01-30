async function main() {
  const Marketplace = await ethers.getContractFactory("Marketplace");
  const market = await Marketplace.deploy();
  console.log("Marketplace deployed to:", market.target);
}


main().catch((error) => {
  console.error(error);
  process.exit(1);
});
