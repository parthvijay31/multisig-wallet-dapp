// SPDX-License-Identifier: MIT
pragma solidity ^0.8.21;

contract MultiSigWallet {
    address[] public owners;
    uint public required;

    struct Transaction {
        address to;
        uint value;
        bool executed;
        uint approvalCount;
    }

    Transaction[] public transactions;
    mapping(uint => mapping(address => bool)) public approved;

    modifier onlyOwner() {
        bool isOwner = false;
        for(uint i = 0; i < owners.length; i++) {
            if(msg.sender == owners[i]) {
                isOwner = true;
                break;
            }
        }
        require(isOwner, "Not owner");
        _;
    }

    constructor(address[] memory _owners, uint _required) {
        owners = _owners;
        required = _required;
    }

    function submitTransaction(address _to, uint _value) public onlyOwner {
        transactions.push(
            Transaction({
                to: _to,
                value: _value,
                executed: false,
                approvalCount: 0
            })
        );
    }

    function approveTransaction(uint txId) public onlyOwner {
        require(!approved[txId][msg.sender], "Already approved");
        approved[txId][msg.sender] = true;
        transactions[txId].approvalCount++;
    }

    function executeTransaction(uint txId) public onlyOwner {
        require(!transactions[txId].executed, "Already executed");
        require(transactions[txId].approvalCount >= required, "Not enough approvals");

        transactions[txId].executed = true;
        (bool success, ) = transactions[txId].to.call{value: transactions[txId].value}("");
require(success, "Transfer failed");

    }

    receive() external payable {}
}
