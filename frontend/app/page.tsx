"use client";
import WalletConnectButton from "../components/WalletConnectButton";

export default function Home() {
  return (
    <main className="h-screen bg-gradient-to-br from-gray-900 via-black to-purple-900 flex items-center justify-center p-6">
      <div className="bg-white/10 backdrop-blur-xl shadow-2xl rounded-2xl p-10 text-center w-full max-w-lg border border-purple-500/30">
        <h1 className="text-4xl font-extrabold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text drop-shadow-lg">
          MultiSig Wallet
        </h1>

        <p className="text-gray-300 mt-3 tracking-wide">
          Secure approvals using blockchain ⚡🔐
        </p>

        <div className="mt-6">
          <WalletConnectButton />
        </div>
      </div>
    </main>
  );
}
