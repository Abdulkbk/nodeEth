const ethers = require('ethers')
const fs = require('fs')
require('dotenv').config()

const main = async () => {
  const wallet = new ethers.Wallet(process.env.PRIVATE_KEY)
  //
}

main()
  .then(() => process.exit(0))
  .catch(error => {
    console.error(error)
    process.exit(1)
  })
