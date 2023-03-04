const { task } = require("hardhat/config")

task("block-number", "Prints current block number").setAction(
  async (taskArg, hre) => {
    const blockNumber = await hre.ethers.provider.getBlockNumber()
    console.log(`Current Block number: ${blockNumber}`)
  }
)

module.exports = {}
