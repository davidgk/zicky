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
        // 
        contractCompiled = compileLottery();
       //
       // IMPORTANT: In this point if something is wrong with your contract, 
       // an error raise and you can fix it, without going to Remix to do that! 
       //
       // deployContract and other tests setup.
    })
    ... Your tests! 

````
If something fail with your contract, the errors  will be detected earlier before running any test. 
You'll see something like this:
`````
-- Your contract has errors! Please read this carefully --
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

### getAbiForContract 

For your This function helps you to get the ABI part of your contract. Web Apps will need the interface which will work together with your Contract  and the deployed part into ethereum network

For more examples you can test this example project with a smart contract [lottery-solidity](https://github.com/davidgk/lottery-solidity):

## Requirements for deploy

With zicky you get easily the contract deployed ready to work with your test

````
const {getDeployManager} = require("zicky");

describe ('Lottery Contract tests', () => {
    let accounts, lottery, contractDeployer, contractDeployed,  account;
    beforeEach(async () => {
        // 
        contractCompiled = compileLottery();
        contractDeployer = getDeployManager(contractCompiled)
        // choose one account, you have 10!
        
        account = contractDeployer.accounts[0]
        
        // mandatory is account
        // if contract has parameters in constructor you should add an array
        // if you want to add money , please add the third param
        
        contractDeployed = contractDeployer.deployContract(account)
        
        // now you can go against your contract in your tests!
    })
    ... Your tests! 

````
Please take a look this [tests](https://github.com/davidgk/zicky/blob/main/test/deployManager.test.js) to learn about it 

Thanks; I'll tell you a secret; My dream's life is driving a Harley!. If you like this code , help me with something, so I can save money for that!
You can help me here! [Cafecito](https://cafecito.app/zicky).
Have a Nice Day!!
