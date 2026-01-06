"use client";
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-gray-900/80 backdrop-blur-md border-b border-purple-700 fixed top-0 left-0 right-0 z-50 shadow-lg">
      <h1 className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-500 text-transparent bg-clip-text">
        MultiSig Wallet
      </h1>

      <div className="space-x-6 text-gray-300 font-medium">
        <Link href="/" className="hover:text-purple-400 transition">
          Home
        </Link>
        <Link href="/create" className="hover:text-purple-400 transition">
          Create Tx
        </Link>
        <Link href="/pending" className="hover:text-purple-400 transition">
          Pending Tx
        </Link>
      </div>
    </nav>
  );
}
