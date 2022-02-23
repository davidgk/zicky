const solCompiler = require("solc");
const path = require("path");
const fs = require("fs");
const fse = require("fs-extra");

function validations(key, contractsFolderPath) {
    if (!key) {
        throw Error('Contract file name is a required param, should be like yourcontract.sol')
    }
    if (!contractsFolderPath) {
        throw Error('contractsFolderPath is a required param, under your project folder, should be like \"contracts\"')
    }
}

const createSource = (key, contractsFolderPath ) => {
    validations(key, contractsFolderPath);
    const reqPath = path.join(__dirname,'../../../');
    const contractPath = path.resolve(reqPath, contractsFolderPath, key);
    return fs.readFileSync(contractPath, 'utf8');
}

const createInput = (fileKey, content) => {
    return {
        language: 'Solidity',
        sources: {
            [fileKey]: {content},
        },
        settings: {
            outputSelection: {
                '*': {
                    '*': ['*'],
                },
            },
        },
    }
};

const getContract = (input, key) => {
    let compiled = JSON.parse(solCompiler.compile(JSON.stringify(input)))
    if (compiled.errors && compiled.errors.length > 0) {
        let errors = "-- Your contract has errors! Please read this carefully --\n";
        for (const error of compiled.errors) {
            errors = errors + `${error.formattedMessage}\n`
        }
        throw new Error(errors)
    }
    return compiled.contracts[key];
}

function process(contractFileName, contractsFolderPath) {
    const source = createSource(contractFileName, contractsFolderPath)
    const input = createInput(contractFileName, source)
    return getContract(input, contractFileName);
}

function removeBuildFolder(buildFolderPath) {
    if (fse.exists(buildFolderPath)) {
        fse.removeSync(buildFolderPath)
    }
}


const printCompiledContract = async (compiledContract) => {
    const keys = Object.keys(compiledContract || {})
    if (!compiledContract || !keys.length) throw new Error("compiledContract to print is mandatory")
    const basePath = path.join(__dirname,'../../../');
    const buildPath = basePath + "buildContract";
    removeBuildFolder(buildPath);
    fse.ensureDirSync(buildPath);
    keys.forEach((key) => {
        const value = compiledContract[key];
        fse.outputFileSync(
            path.resolve(buildPath, key+ ".json"),
            JSON.stringify(value)
        )
    })
}

function printAbi(contractName, abi) {
    const fileName = `${contractName.split('.')[0]}.abi.js`
    const reqPath = path.join(__dirname, '../../../');
    fse.outputFileSync(
        path.resolve(reqPath +  fileName),
        JSON.stringify(abi)
    )
}


module.exports = { printCompiledContract, process, printAbi }