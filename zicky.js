const {process} = require("./src/compiler");
const path = require("path");
const fs = require("fs");
const {createDeployer} = require("./src/deployManager");
/***
 * Should be your contract file name, like zicky.sol
 * @param contractName
 * @param contractsFolderPath
 * @returns {*}
 */
const compileContract = (contractName, contractsFolderPath="contracts") => {
    const contract = process(contractName, contractsFolderPath);
    return contract[contractName.split('.')[0]];
}
/**
 * Create the abi interface to be use in your web app to communicate with Ethereum network
 * @param contractName
 * @param contractsFolderPath
 */
const getAbiFromContract = (contractName, contractsFolderPath="contracts") => {
    const abi = compileContract(contractName, contractsFolderPath).abi;
    const fileName = `${contractName.split('.')[0]}.abi.js`
    const reqPath = path.join(__dirname,'../../' + fileName);
    fs.writeFile(reqPath, JSON.stringify(abi),  err => {
        if (err) {
            console.error(err)
        }
    })
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
    getDeployManager
}
