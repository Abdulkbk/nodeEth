const { ethers, run, network } = require("hardhat")

async function main() {
  const SimpleStorageFactory = await ethers.getContractFactory("SimpleStorage")

  console.log("Deploying contract...")

  const simpleStorage = await SimpleStorageFactory.deploy()
  await simpleStorage.deployed()

  console.log(`Deployin contract to: ${simpleStorage.address}`)

  // Verifying our contract on Etherscan
  if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
    await simpleStorage.deployTransaction.wait(6)
    await verify(simpleStorage.address, [])
  }

  // Getting the current value of favorite number
  const currentValue = await simpleStorage.retrieve()
  console.log(`Current value: ${currentValue}`)

  // Updating the value of favorite number
  const transactionResponse = await simpleStorage.store(9)
  await transactionResponse.wait(1)
  const updateValue = await simpleStorage.retrieve()
  console.log(`Update value: ${updateValue}`)
}

async function verify(contractAddress, args) {
  try {
    console.log("Verifying contract...")
    await run("verify:verify", {
      address: contractAddress,
    })
  } catch (err) {
    if (err.message.toLowercase().includes("already verified")) {
      console.log("Already verified")
    } else {
      console.log(err)
    }
  }
}

main()
  .then(() => process.exit(0))
  .catch((err) => {
    console.log(err)
    process.exit(1)
  })
