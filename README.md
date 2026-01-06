#  MultiSig Wallet DApp

A fully functional **Multi-Signature Ethereum Wallet DApp** built using  
**Solidity, Next.js, and Ethers.js**, deployed on the **Sepolia Testnet**.

##  Live Demo
 https://multisig-wallet-dapp-live.vercel.app/

##  Features
- Create ETH transactions from a multisig wallet
- Requires approval from multiple owners
- Prevents duplicate approvals
- Executes transactions only after threshold approvals
- Shows real-time transaction status (Pending / Executed)

##  Tech Stack
- **Solidity** – Smart contract
- **Hardhat** – Compilation & deployment
- **Next.js (App Router)** – Frontend
- **Ethers.js v6** – Blockchain interaction
- **MetaMask** – Wallet connection
- **Vercel** – Frontend hosting

##  Smart Contract Overview
- Network: **Sepolia Testnet**
- Owners: **2**
- Required approvals: **2**
- Secure execution logic
- Owner-only actions enforced

##  Workflow
1. Owner submits a transaction
2. Other owner approves it
3. Transaction executes once approvals are met

##  Project Structure
- contracts/ → Solidity smart contracts
- frontend/ → Next.js frontend
- scripts/ → Deployment scripts
