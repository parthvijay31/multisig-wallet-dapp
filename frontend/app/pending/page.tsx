"use client";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "../../contract";

export default function PendingTx() {
  const [txs, setTxs] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<string>("");

  const loadTransactions = async () => {
    try {
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const userAddr = await signer.getAddress();
      setUser(userAddr);

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        CONTRACT_ABI,
        provider
      );

      const txCount = await contract.getTransactionCount();
      const temp = [];

      for (let i = 0; i < txCount; i++) {
        const tx = await contract.transactions(i);
        const hasApproved = await contract.approved(i, userAddr);

        temp.push({
          id: i,
          to: tx.to,
          value: ethers.formatEther(tx.value),
          executed: tx.executed,
          approvalCount: Number(tx.approvalCount),
          approvedByYou: hasApproved,
        });
      }

      setTxs(temp);
    } catch (err) {
      console.error("Error loading transactions:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTransactions();
  }, []);

  // 👉 Approve
  const approveTx = async (id: number) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );

    const tx = await contract.approveTransaction(id);
    await tx.wait();

    loadTransactions();
  };

  // 👉 Execute
  const executeTx = async (id: number) => {
    const provider = new ethers.BrowserProvider(window.ethereum);
    const signer = await provider.getSigner();

    const contract = new ethers.Contract(
      CONTRACT_ADDRESS,
      CONTRACT_ABI,
      signer
    );

    const tx = await contract.executeTransaction(id);
    await tx.wait();

    loadTransactions();
  };

  if (loading) return <p className="text-white p-6">Loading transactions...</p>;

  return (
    <div className="text-white p-6">
      <h1 className="text-3xl font-bold text-purple-400 mb-6">
        Pending Transactions
      </h1>

      {txs.length === 0 && <p>No transactions found</p>}

      {txs.map((tx) => (
        <div
          key={tx.id}
          className="bg-gray-900 p-4 mb-4 rounded-lg border border-purple-600"
        >
          <p><b>ID:</b> {tx.id}</p>
          <p><b>To:</b> {tx.to}</p>
          <p><b>Value:</b> {tx.value} ETH</p>
          <p><b>Executed:</b> {tx.executed ? "Yes" : "No"}</p>
          <p><b>Approvals:</b> {tx.approvalCount}</p>
          <p>
            <b>You approved:</b>{" "}
            {tx.approvedByYou ? "✅ Yes" : "❌ No"}
          </p>

          {/* ACTION BUTTONS */}
          {!tx.executed && (
            <div className="flex gap-4 mt-4">
              {!tx.approvedByYou && (
                <button
                  onClick={() => approveTx(tx.id)}
                  className="px-4 py-2 bg-purple-600 hover:bg-purple-700 rounded"
                >
                  Approve
                </button>
              )}

              {tx.approvalCount >= 2 && (
                <button
                  onClick={() => executeTx(tx.id)}
                  className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded"
                >
                  Execute
                </button>
              )}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

