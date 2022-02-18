// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract contractWithoutParams {
    address public manager;
    constructor (){
        manager = msg.sender;
    }
}
