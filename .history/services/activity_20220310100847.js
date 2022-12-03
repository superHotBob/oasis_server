const Web3 = require('web3')
var fs = require('fs')
const contractABI = require('../artifacts/contracts/NFTMinter.sol/contract-abi.json')
const contractAddress = '0x2265C9ea6E9C593734e04b839B5f8a72a6427FeE'
const db = require('../queries')

const web3 = new Web3(
  new Web3.providers.HttpProvider('https://testnet.emerald.oasis.dev')
)

const contract = new web3.eth.Contract(contractABI.abi, contractAddress)

function readMyBlock () {
  fs.readFile('data.txt', 'utf8', function (err, data) {
    if (err) {
      throw err
    }
    pastEvents(data)
  })
}
function writeMyBlock (a) {
  fs.writeFile('data.txt', (a + 1).toString(), 'utf8', function (err) {
    if (err) throw err
  })
}

async function pastEvents (a) {
  const latestBlock = await web3.eth.getBlockNumber()
  writeMyBlock(latestBlock)
  for (let i = +a; i <= latestBlock; i++) {
    const pastEvent = await contract.getPastEvents('AllEvents', {
      fromBlock: i,
      toBlock: i
    })

    if (
      pastEvent.length !== 0 &&
      pastEvent[0].event !== 'OwnershipTransferred'
    ) {
      if (pastEvent[0].event === 'Approval') {
        db.writeActivity(
          pastEvent[1].returnValues.from,
          pastEvent[1].returnValues.to,
          pastEvent[1].returnValues.tokenId
        )
      } else {
        db.writeActivity(
          pastEvent[0].returnValues.from,
          pastEvent[0].returnValues.to,
          pastEvent[0].returnValues.tokenId
        )
      }
    }
  }
}

readMyBlock()

module.exports = readMyBlock
