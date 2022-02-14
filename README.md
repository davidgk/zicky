# Zicky
Zicky helps you to track errors on your TDD session over smart contracts developed with Solidity, 
enhancing the way to find errors and avoiding back and forth with remix tool.

## Requirements for compile
* We use this to compile Smart contracts developed under Solc 0.8.9

## Some Examples

### compileContract - Useful for tests and Deploy
Suppose you have your contract, like Lottery.sol under "contracts" folder
then to use it you can do something like this, and reuse it for several contracts:

````
const {compileContract} = require("zicky");

const compileLottery = () => {
    return compileContract('Lottery.sol', "contracts")
}

module.exports = {
    compileLottery
}
````

Then in your tests or your compiler, you can use it there too:
Under tests:

````
describe ('Lottery Contract tests', () => {
    let accounts, lottery, contractDeployer, contractCompiled,account;
    beforeEach(async () => {
        contractCompiled = compileContract('Lottery.sol', "contracts")
        // Get a list of all accounts
        accounts = await web3.eth.getAccounts();
        //deploy your contract with contractCompiled.abi
        contractDeployer = new web3.eth.Contract(contractCompiled.abi);
        account = accounts[0];
        lottery = await deployContract(contractDeployer, contractCompiled, [], account);
    })
    ... Your tests! 

````
If something fail arise before running your tests, you'll see something like this:
`````
Error: undefinedTypeError: "msg.value" and "callvalue()" can only be used in payable public functions. Make the function "payable" or use an internal function to avoid this error.
  --> Lottery.sol:15:17:
   |
15 |         require(msg.value > .01 ether);
   |                 ^^^^^^^^^



    at getContract (node_modules/zicky/src/compiler.js:44:15)
    at process (node_modules/zicky/src/compiler.js:52:12)
    at compileContract (node_modules/zicky/zicky.js:9:22)
    at Context.<anonymous> (test/Lottery.test.js:41:28)
`````


For more examples you can test this example project with a smart contract [lottery-solidity](https://github.com/davidgk/lottery-solidity):









Thanks , If you like it,  you can help me with a [Cafecito](https://cafecito.app/zicky) , Have a Nice Day
