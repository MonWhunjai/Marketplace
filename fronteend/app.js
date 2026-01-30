const CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
 
const CONTRACT_ABI = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      }
    ],
    "name": "addProduct",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "products",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "id",
        "type": "uint256"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "uint256",
        "name": "price",
        "type": "uint256"
      },
      {
        "internalType": "address payable",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "isSold",
        "type": "bool"
      }
    ],
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
 
 
 