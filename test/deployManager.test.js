const {expect} = require('chai');
const {createDeployer} = require("../src/deployManager");
const {compileContract} = require("../zicky");
const path = require("path");
const sinon = require("sinon");




describe('deploy Manager test', () => {
    let  pathStub, deployer;

    describe('createDeployer', () => {
        afterEach(() => {
            pathStub.restore()
        })
        describe('when we have a compiled Contract', () => {
            beforeEach(async () => {
                pathStub = sinon.stub(path, 'join').returns('.')
                const compiledContract = compileContract("contractWithoutParams.sol", "test")
                deployer = await createDeployer(compiledContract)
            })

            it('we Can create the deployer', () => {
                expect(deployer).not.be.null;
            })

            it('contains the deployer contract', () => {
                expect(deployer.contractDeployer).not.be.null;
            })

            it('contains with default gas', () => {
                expect(deployer.defaultGas).to.eq(1000000);
            })

            it('and deployer once created can provide accounts',  () => {
                expect(deployer.accounts.length).to.eq(10)
            });

            describe('when we need to deploy', ()=> {
                it('if no send the account throw error', async() => {
                    try {
                        const deployed = await deployer.deployContract(null)
                        expect.fail('fail')
                    } catch (e) {
                        expect(e.message).to.eq("Send account to deploy is mandatory")
                    }
                })
            });
            describe('when we choose an account', ()=> {
                let preferredAccount;
                beforeEach(() => {
                    preferredAccount = deployer.accounts[0]
                })

                it('with contract without params in constructor we can deploy it and use it', async() => {
                    const deployed = await  deployer.deployContract(preferredAccount)
                    // TAKE A LOOK ON CONTRACT, has manager into constructor
                    let expected = await deployed.methods.manager().call();
                    expect(expected.toLowerCase()).to.eq(preferredAccount.toLowerCase())
                })
            })

        })
        describe('when we have a contract which has arguments in its constructor', () => {
            beforeEach(async () => {
                pathStub = sinon.stub(path, 'join').returns('.')
                const compiledContract = compileContract("contractWithParams.sol", "test")
                deployer = await createDeployer(compiledContract)
            })
            describe('when we choose an account', ()=> {
                let preferredAccount;
                beforeEach(() => {
                    preferredAccount = deployer.accounts[0]
                })

                it('we can deploy it and use it', async() => {
                    const deployed = await  deployer.deployContract(preferredAccount, [100])
                    // TAKE A LOOK ON CONTRACT, has manager into constructor
                    let expectedManager = await deployed.methods.manager().call();
                    expect(expectedManager.toLowerCase()).to.eq(preferredAccount.toLowerCase())
                    let expectedSomeValue = await deployed.methods.someValue().call();
                    expect(expectedSomeValue).to.eq("100")
                })
            })
        })
    });
})