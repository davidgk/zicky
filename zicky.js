const {process} = require("./src/compiler");
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

module.exports = {
    compileContract
}
