async function main() {
    const marketAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
    const Marketplace = await ethers.getContractFactory("Marketplace");
    const market = await Marketplace.attach(marketAddress);

    await market.addProduct('book', ethers.parseEther('0.1'));
    console.log("add product success");
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});