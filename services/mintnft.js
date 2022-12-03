const { ethers } = require('hardhat')

const contractAddress = '0x9764e39a7142E9c5AabA4EFF53C1329B3dE335C0'

const metaDataURL = 'ipfs://bafyreid35hmk5kbr7xfuooixerd5qjy36xzrmnfn562b5cd5acokoweiie/metadata.json'

module.exports = async function mintnft (req, res) {
  const hash = req.body.address
//   const metaDataURL = req.metadata
//   const metadataURI = metaDataURL.url
  //   Const [owner] = await ethers.getSigners()
  //   Console.log('Owner address', hash)
  const NFTMinter = await ethers.getContractFactory('NFTMinter')

const mint = await NFTMinter.attach(contractAddress).mintNFT(hash, metaDataURL)
  console.log('NFT minted to: ', mint)
}
