const { run } = require('hardhat')

async function verify(contractAddress, args) {
  try {
    console.log('Verifying contract...')
    await run('verify:verify', {
      address: contractAddress,
      constructorArguments: args,
    })
  } catch (err) {
    // if (err.message.toLowercase().includes('already verified')) {
    //   console.log('Already verified')
    // } else {
    console.log(err)
    // }
  }
}

module.exports = { verify }
