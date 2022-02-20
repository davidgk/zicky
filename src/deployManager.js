const ganache = require('ganache');
// how to communicate our code with that.
const Web3 = require('web3')
const localNetworkProvider = ganache.provider();
const web3 = new Web3(localNetworkProvider)


async function configureDeployerAndAccounts(contractCompiled) {
    const accounts = await localNetworkProvider.request({method: "eth_accounts", params: []});
    const contractDeployed = new web3.eth.Contract(contractCompiled.abi);
    return {accounts, contractDeployed};
}


class DeployManager {

    constructor(contractCompiled, contractDeployer, accounts, defaultGas) {
        this.accounts = accounts
        this.contractCompiled = contractCompiled;
        this.contractDeployer = contractDeployer;
        this.defaultGas = defaultGas;
    }

    /**
     * should deploy your contract into ganache test network
     * @param account
     * @param args
     * @param value
     * @returns {PromiEvent<Contract>}
     */
    async deployContract( account, args, value = 0) {
        if (!account) throw new Error("Send account to deploy is mandatory")
        return this.contractDeployer
            // create the transaction Object to be sent
            .deploy({data: this.contractCompiled.evm.bytecode.object, arguments: args})
            .send({from: account, gas: this.defaultGas, value});
    }

    getNetwork(){
        return web3.eth;
    }

    getWeb3Object(){
        return web3;
    }

}

function validContract(param, paramName) {
    if (!param){
        throw new Error(paramName + " is necessary to build the deployer, please send a valid one!")
    }
}

/**
 *
 * @param contractCompiled
 * @param defaultGas
 * @returns {Promise<DeployerUnderTest>}
 */
const createDeployer = async (contractCompiled, defaultGas = 1000000) =>  {
    validContract(contractCompiled, "Compiled Contract")
    const {accounts, contractDeployed} = await configureDeployerAndAccounts(contractCompiled);
    return new DeployManager(contractCompiled, contractDeployed, accounts, defaultGas)
}

module.exports = {
    createDeployer
};

