"use client";
import { useState } from "react";
import { ethers } from "ethers";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export default function WalletConnectButton() {
  const [account, setAccount] = useState<string | null>(null);

  const connectWallet = async () => {
    if (!window.ethereum) {
      alert("Please install MetaMask!");
      return;
    }

    const provider = new ethers.BrowserProvider(window.ethereum);
    const accounts = await provider.send("eth_requestAccounts", []);
    setAccount(accounts[0]);
  };

  return (
    <button
  onClick={connectWallet}
  className="px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-600 text-white font-semibold rounded-xl shadow-[0_0_10px_rgba(138,43,226,0.8)] hover:shadow-[0_0_20px_rgba(138,43,226,0.95)] transition transform hover:scale-105"
>
  {account ? `Connected: ${account.substring(0, 6)}...` : "Connect Wallet"}
</button>

  );
}
