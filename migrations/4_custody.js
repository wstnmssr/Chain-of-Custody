var ChainOfCustody = artifacts.require("./case.sol");
module.exports = function(deployer) {
  deployer.deploy(ChainOfCustody, "demo", 0);
};