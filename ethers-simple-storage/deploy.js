const { ethers } = require('ethers')
const fs = require('fs')
require('dotenv').config()

const main = async () => {
    // http://127.0.0.1:7545

    const provider = new ethers.JsonRpcProvider(process.env.TEST_RPC_SERVER)
    const wallet = new ethers.Wallet(process.env.TEST_PRIVATE_KEY, provider)
    const abi = fs.readFileSync(
        './SimpleStorage_sol_SimpleStorage.abi',
        'utf-8'
    )
    const binary = fs.readFileSync(
        './SimpleStorage_sol_SimpleStorage.bin',
        'utf-8'
    )

    const contractFactory = new ethers.ContractFactory(abi, binary, wallet)
    console.log('Deploying contract....')
    const contract = await contractFactory.deploy()
    await contract.waitForDeployment()
    // const deploymentReceipt = contract.deploymentTransaction()
    // console.log(deploymentReceipt)

    const favoriteNumber = await contract.retrieve()
    console.log(`\n\nFavourite number: ${favoriteNumber.toString()}`)

    const trx = await contract.store('20')
    await trx.wait(1)
    console.log(`\n\nTransaction:`)
    console.log(trx)

    const updatedFavoriteNumber = await contract.retrieve()
    console.log(`\n\nUpdated fav: ${updatedFavoriteNumber}`)
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })
