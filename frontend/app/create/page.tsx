"use client";
import { useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../../contract";

export default function CreateTx() {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState("");
  const [isLoading, setIsLoading] = useState(false);

const handleSubmit = async () => {
  if (!to || !amount) return alert("Enter all fields correctly");

  try {
    setIsLoading(true);

    await window.ethereum.request({
      method: "wallet_switchEthereumChain",
      params: [{ chainId: "0xaa36a7" }],
    });

    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

    const txValue = ethers.parseEther(amount);

    console.log("Calling contract with:", to, txValue);

    const tx = await contract.submitTransaction(to, txValue, {
  gasLimit: 200000,
});



    await tx.wait();

    alert("Transaction submitted!");
    setTo("");
    setAmount("");

  } catch (err) {
    console.error("Submit Error:", err);
    alert("Transaction failed");
  } finally {
    setIsLoading(false);
  }
};








  return (
    <div className="w-full h-screen flex items-center justify-center text-white">
      <div className="bg-gray-900 p-8 rounded-xl shadow-lg w-[420px] border border-purple-600">
        <h2 className="text-2xl font-semibold text-purple-400 mb-4 text-center">
          Create Transaction
        </h2>

        <input
  type="text"
  placeholder="Recipient Address"
  value={to}
  onChange={(e) => setTo(e.target.value)}
  style={{
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #5e2ced",
    marginBottom: "14px",
    backgroundColor: "#141414",
    color: "white"
  }}
/>

<input
  type="number"
  placeholder="Amount (ETH)"
  value={amount}
  onChange={(e) => setAmount(e.target.value)}
  style={{
    width: "100%",
    padding: "12px",
    borderRadius: "8px",
    border: "1px solid #5e2ced",
    marginBottom: "20px",
    backgroundColor: "#141414",
    color: "white"
  }}
/>



        <button
          className="w-full bg-purple-600 hover:bg-purple-700 transition p-3 mt-4 rounded-lg font-bold"
          onClick={handleSubmit}
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit Transaction"}
        </button>
      </div>
    </div>
  );
}
