// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract contractWithParams {
    address public manager;
    uint public someValue;
    constructor (uint aValue){
        manager = msg.sender;
        someValue = aValue;
    }
}
