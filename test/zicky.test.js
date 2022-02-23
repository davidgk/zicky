const sinon = require("sinon");
const path = require("path");
const {compileContract, compileAndPrintContract, getAbiFromContract} = require("../zicky");
const {expect} = require('chai');
const fse = require("fs-extra");


describe('zicky general tests', () => {
    let  pathStub;
    afterEach(() => {
        pathStub.restore()
    })
    describe('#compileContract', () =>{
        describe('When we have a single contract into a file', () =>{
            beforeEach(() => {
                pathStub = sinon.stub(path, 'join').returns('.')
            })
            it('get the contract compiled', () => {
                const compiledContract = compileContract("contractWithoutParams.sol", "test/testFiles");
                expect(compiledContract.abi).not.to.be.null;
                expect(compiledContract.evm.bytecode.object).not.to.be.null;
            })
        })
        describe('When we have a another contract into a file', () =>{
            beforeEach(() => {
                pathStub = sinon.stub(path, 'join').returns('.')
            })
            it('get the contract compiled', () => {
                const compiledContract = compileContract("severalContracts.sol", "test/testFiles", "contractOne");
                expect(compiledContract.abi).not.to.be.null;
                expect(compiledContract.evm.bytecode.object).not.to.be.null;
            })
            it.skip('2', () => {
                const compiledContract = compileContract("ContractAUseB.sol", "test/testFiles");
                expect(compiledContract.abi).not.to.be.null;
                expect(compiledContract.evm.bytecode.object).not.to.be.null;
            })
        })
    })

    describe('#getAbiFromContract', () =>{
        const ABI_FILE_CREATED_PATH = "./contractWithoutParams.abi.js";
        beforeEach(async () => {
            pathStub = sinon.stub(path, 'join').returns('./')
            if (await fse.exists(ABI_FILE_CREATED_PATH)) fse.remove(ABI_FILE_CREATED_PATH)
        })
        afterEach(async () => {
            if (await fse.exists(ABI_FILE_CREATED_PATH)) fse.remove(ABI_FILE_CREATED_PATH)
        })
        it('get the abi printed into the path', async () =>{
            getAbiFromContract("contractWithoutParams.sol", "test/testFiles");
            const existFile = await fse.exists(ABI_FILE_CREATED_PATH);
            expect(existFile).to.be.true;
        })
    });

    describe('#compileAndPrintContract', () =>{
        beforeEach(() => {
            pathStub = sinon.stub(path, 'join').returns('./')
        })
        describe('When we have some contracts into a file', () =>{
            const BUILD_PATH = "./build";
            beforeEach(() => {
                removeBuildFolder(BUILD_PATH);
            })
            afterEach(() => {
                removeBuildFolder(BUILD_PATH);
            })
            it('we can print them into a file into the build folder', async () => {
                let buildExists = await fse.exists(BUILD_PATH);
                expect(buildExists).to.be.false;
                compileAndPrintContract("severalContracts.sol", "test/testFiles", "contractOne");
                buildExists = await fse.exists(BUILD_PATH);
                expect(buildExists).to.be.true;
                expect(await fse.exists(BUILD_PATH + "/ContractOne.json")).to.be.true;
                expect(await fse.exists(BUILD_PATH + "/ContractTwo.json")).to.be.true;
                expect(await fse.exists(BUILD_PATH + "/ContractThree.json")).to.be.true;
            })
        })
    })
})

function removeBuildFolder(buildFolderPath) {
    if (fse.exists(buildFolderPath)) {
        fse.remove(buildFolderPath)
    }
}