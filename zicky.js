const {compileContract} = require("./src/compiler");
/***
 * Should be your contract file name, like zicky.sol
 * @param contractName
 * @returns {*}
 */
const compileIt = (contractName) => {
    const contract = compileContract(contractName);
    return contract[contractName.split('.')[0]];
}

module.exports = {
    compileIt
}
