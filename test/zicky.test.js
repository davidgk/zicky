const sinon = require("sinon");
const path = require("path");
const {compileContract} = require("../zicky");
const {expect} = require('chai');

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
                const compiledContract = compileContract("contractWithoutParams.sol", "test");
                expect(compiledContract.abi).not.to.be.null;
                expect(compiledContract.evm.bytecode.object).not.to.be.null;
            })
        })
        describe('When we have a another contract into a file', () =>{
            beforeEach(() => {
                pathStub = sinon.stub(path, 'join').returns('.')
            })
            it('get the contract compiled', () => {
                const compiledContract = compileContract("severalContracts.sol", "test", "contractOne");
                expect(compiledContract.abi).not.to.be.null;
                expect(compiledContract.evm.bytecode.object).not.to.be.null;
            })
        })
    })
})
