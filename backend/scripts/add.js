async function main() {
    const marketAddress = "0xCf7Ed3AccA5a467e9e704C703E8D87F634fB0Fc9";
    const Marketplace = await ethers.getContractFactory("Marketplace");
    const market = await Marketplace.attach(marketAddress);

    await market.addProduct('book', ethers.parseEther('0.1'));
    console.log("add product success");
}

main().catch((error) => {
    console.error(error);
    process.exit(1);
});