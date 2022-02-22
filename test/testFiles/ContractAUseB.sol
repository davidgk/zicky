// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

import "./ContractB.sol";


contract contractAUseB is ContractB {
    constructor (uint aValue){
        ContractB(aValue) ;
    }
}
