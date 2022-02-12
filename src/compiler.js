const solCompiler = require("solc");
const path = require("path");
const fs = require("fs");

const createSource = (key, contractsFolderPath = 'contracts') => {
    const reqPath = path.join(__dirname,'../');
    const lotteryPath = path.resolve(reqPath, contractsFolderPath, key);
    return fs.readFileSync(lotteryPath, 'utf8');
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
        let errors;
        for (const error of compiled.errors) {
            errors = errors + `${error.formattedMessage}\n`
        }
        throw new Error(errors)
    }
    return compiled.contracts[key];
}

function compileContract(contractFileName) {
    const source = createSource(contractFileName)
    const input = createInput(contractFileName, source)
    return getContract(input, contractFileName);
}


module.exports = { compileContract }