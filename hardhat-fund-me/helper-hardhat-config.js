const networkConfig = {
  5: {
    name: 'goerli',
    ethUsdPriceFeed: '0x8204c193ade6a1bb59bef25b6a310e417953013f',
  },
}

const developmentChains = ['hardhat', 'localhost']

const DECIMALS = 8
const INITIAL_PRICE = 200000000000

module.exports = {
  networkConfig,
  developmentChains,
  DECIMALS,
  INITIAL_PRICE,
}
