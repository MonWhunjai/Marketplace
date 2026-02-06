const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
 
const CONTRACT_ABI = [
  {
    "inputs": [{"internalType": "string", "name": "name", "type": "string"}, {"internalType": "uint256", "name": "price", "type": "uint256"}],
    "name": "addProduct",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "id", "type": "uint256"}],
    "name": "buyProduct",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "id", "type": "uint256"}],
    "name": "removeProduct",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getAllproducts",
    "outputs": [{"components": [{"internalType": "uint256", "name": "id", "type": "uint256"}, {"internalType": "string", "name": "name", "type": "string"}, {"internalType": "uint256", "name": "price", "type": "uint256"}, {"internalType": "address payable", "name": "owner", "type": "address"}, {"internalType": "bool", "name": "isSold", "type": "bool"}], "internalType": "struct Marketplace.Product[]", "name": "", "type": "tuple[]"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "name": "products",
    "outputs": [{"internalType": "uint256", "name": "id", "type": "uint256"}, {"internalType": "string", "name": "name", "type": "string"}, {"internalType": "uint256", "name": "price", "type": "uint256"}, {"internalType": "address payable", "name": "owner", "type": "address"}, {"internalType": "bool", "name": "isSold", "type": "bool"}],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "nextId",
    "outputs": [{"internalType": "uint256", "name": "", "type": "uint256"}],
    "stateMutability": "view",
    "type": "function"
  }
];
 
async function connectWallet() {
  if (!window.ethereum) {
    alert("Please install MetaMask");
    return;
  }
 
  const accounts = await window.ethereum.request({
    method: "eth_requestAccounts",
  });
 
  account = accounts[0];
  document.getElementById("account").innerText = account;
 
  // Added the missing 's'
  const provider = new ethers.BrowserProvider(window.ethereum);
  const signer = await provider.getSigner();
 
  market =new ethers.Contract(
    CONTRACT_ADDRESS, CONTRACT_ABI, signer
  );
 
  console.log("Connected account:", account);
  console.log("Contract loaded:", market);
}
 
 
async function addProduct() {
  const name = document.getElementById("name").value.trim();
  const priceETH = document.getElementById("price").value.trim();
 
  if (isNaN(priceETH)) {
    alert("Price must be a number");
    return;
  }
 
  if (!name || !priceETH) {
    alert("Please fill all fields");
    return;
  }
 
  const priceWei = ethers.parseEther(priceETH);
 
  try {
    const tx = await market.addProduct(name, priceWei);
    await tx.wait();
    alert("Product added successfully!");
  } catch (err) {
    console.error(err);
    alert(err.reason || "Transaction failed");
    //alert("Transaction failed");
  }
}
 
async function loadProducts() {
  if (!market) {
    alert("Please connect wallet first");
    return;
  }
 
  try {
    const products = await market.getAllproducts();
    const productsDiv = document.getElementById("products");
    productsDiv.innerHTML = "";
 
    if (products.length === 0) {
      productsDiv.innerHTML = "<p>No products yet</p>";
      return;
    }
 
    for (const p of products) {
      if (p.id === 0n) continue; // Skip deleted products
     
      productsDiv.innerHTML += `
        <div style="border: 1px solid #ccc; padding: 10px; margin: 10px 0;">
          <p><strong>${p.name}</strong></p>
          <p>Price: ${ethers.formatEther(p.price)} ETH</p>
          <p>Owner: ${p.owner}</p>
          ${p.isSold ? "<p><em>(Sold)</em></p>" : `<button onclick="buyProduct(${p.id}, '${p.price}')">Buy</button>`}
        </div>
      `;
    }
  } catch (err) {
    console.error(err);
    alert("Failed to load products: " + (err.reason || err.message));
  }
}
 
async function buyProduct(id, priceWei) {
  if (!market) {
    alert("Please connect wallet first");
    return;
  }
 
  try {
    const tx = await market.buyProduct(id, { value: priceWei });
    await tx.wait();
    alert("Product purchased successfully!");
    loadProducts();
  } catch (err) {
    console.error(err);
    alert("Purchase failed: " + (err.reason || err.message));
  }
}
 
 