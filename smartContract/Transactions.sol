// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

contract Transactions {
    //Defining global transaction counter
    uint256 transactionCount;

    // Defining the transfer event
    event Transfer(
        address from,
        address receiver,
        uint256 amount,
        string message,
        uint256 timestamp,
        string keyword
    );

    // This is the structure of our transfers
    struct TransferStruct {
        address sender;
        address receiver;
        uint256 amount;
        string message;
        uint256 timestamp;
        string keyword;
    }

    // Our transactions variable is going to be an array of transfer structures (objects)
    TransferStruct[] transactions;

    // Since this is a class, we must define the visibility of the function (public)
    function addToBlockchain(
        address payable receiver,
        uint256 amount,
        string memory message,
        string memory keyword
    ) public {
        transactionCount += 1;

        //Store the transaction in the transfer history array
        transactions.push(
            TransferStruct(
                msg.sender,
                receiver,
                amount,
                message,
                block.timestamp,
                keyword
            )
        );

        //Execute the transfer
        emit Transfer(
            msg.sender,
            receiver,
            amount,
            message,
            block.timestamp,
            keyword
        );
    }

    // This function returns a transfer struct from memory
    function getAllTransactions()
        public
        view
        returns (TransferStruct[] memory)
    {
        return transactions;
    }

    function addToBlockchain() public view returns (uint256) {
        return transactionCount;
    }
}
