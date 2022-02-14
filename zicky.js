const {process} = require("./src/compiler");
const path = require("path");
const fs = require("fs");
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

const getAbiFromContract = (contractName, contractsFolderPath="contracts") => {
    const abi = compileContract(contractName, contractsFolderPath).abi;
    const fileName = `${contractName.split('.')[0]}.abi.js`
    const reqPath = path.join(__dirname,'../../' + fileName);
    fs.writeFile(reqPath, JSON.stringify(abi),  err => {
        if (err) {
            console.error(err)
        }
    });
}


module.exports = {
    compileContract,
    getAbiFromContract
}
