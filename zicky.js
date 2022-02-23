const {process, printCompiledContract, printAbi} = require("./src/compiler");
const {createDeployer} = require("./src/deployManager");

/***
 * Compile your contract.
 * Should be your contract file name, like zicky.sol
 * @param contractName
 * @param contractsFolderPath
 * @param anotherContractWeWont
 * @returns {*}
 */
const compileContract = (contractName, contractsFolderPath="contracts", anotherContractWeWont) => {
    const contract = process(contractName, contractsFolderPath);
    return anotherContractWeWont ? contract[anotherContractWeWont] : contract[contractName.split('.')[0]];
}

/***
 * Print the contract/s compiled into the build folder;CAUTION: Will delete if exist the build folder
 *
 * @param contractName
 * @param contractsFolderPath
 * @returns {*}
 */
const compileAndPrintContract = async (contractName, contractsFolderPath="contracts") => {
    const contract = process(contractName, contractsFolderPath);
    await printCompiledContract(contract);
}

/**
 * Create the abi interface to be use in your web app to communicate with Ethereum network
 * @param contractName
 * @param contractsFolderPath
 */
const getAbiFromContract = (contractName, contractsFolderPath="contracts") => {
    const abi = compileContract(contractName, contractsFolderPath).abi;
    printAbi(contractName,abi);
}

/**
 * create deployManager the contract into test network, the method to call should be deployContract
 * @param contractCompiled
 * @param defaultGas
 * @returns {Promise<DeployerUnderTest>}
 */
const getDeployManager = async (contractCompiled, defaultGas = 1000000) =>  {
    return createDeployer(contractCompiled, defaultGas)
}

module.exports = {
    compileContract,
    getAbiFromContract,
    getDeployManager,
    compileAndPrintContract
}
