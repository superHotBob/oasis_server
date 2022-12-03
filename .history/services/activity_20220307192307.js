
const Web3 = require('web3')
const contractABI = require('../artifacts/contracts/NFTMinter.sol/contract-abi.json')
const contractAddress = '0x2265C9ea6E9C593734e04b839B5f8a72a6427FeE'
const db = require('../queries')

const web3 = new Web3(new Web3.providers.HttpProvider('https://testnet.emerald.oasis.dev'))

// Const Pool = require('pg').Pool
// Const pool = new Pool({
//   User: 'iuevfshp',
//   Host: 'dumbo.db.elephantsql.com',
//   Database: 'iuevfshp',
//   Password: 'ywDJ5rXh3ot6jqjRqw-X83xwzPDQ222c',
//   Port: 5432
// })

const contract = new web3.eth.Contract(contractABI.abi, contractAddress)

async function pastEvents () {
  const latestBlock = await web3.eth.getBlockNumber()
  let prev_block = 0
  async function read () {
    return db.readBlock().then(res=>res)
  }
  const pr = await read() 
  db.updateBlock(latestBlock)
  console.log(latestBlock, pr)
  for (let i = read(); i <= latestBlock; i++) {
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
        // Console.log(
        //   "TokenId: ",
        //   PastEvent[0].returnValues.tokenId,
        //   "From: ",
        //   PastEvent[0].returnValues.from,
        //   "To:",
        //   PastEvent[0].returnValues.to,
        //   "BlockNumber:",
        //   I
        // );
      }
    }
  }
}
pastEvents()

module.exports = pastEvents
