// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract contractOne {
    address public manager;
    constructor (){
        manager = msg.sender;
    }
}

contract contractTwo {
    address public manager;
    constructor (){
        manager = msg.sender;
    }
}

contract contractThree {
    address public manager;
    constructor (){
        manager = msg.sender;
    }
}
