import Web3 from 'web3'
const contractABI = require('../artifacts/contracts/NFTMinter.sol/contract-abi.json')
const contractAddress = '0x2265C9ea6E9C593734e04b839B5f8a72a6427FeE'
const db = require('./queries')

const web3 = new Web3(
  Web3.givenProvider ||
    Web3.providers.HttpProvider('https://testnet.emerald.oasis.dev')
)

const Pool = require('pg').Pool
const pool = new Pool({
  user: 'iuevfshp',
  host: 'dumbo.db.elephantsql.com',
  database: 'iuevfshp',
  password: 'ywDJ5rXh3ot6jqjRqw-X83xwzPDQ222c',
  port: 5432
})

const contract = new web3.eth.Contract(contractABI.abi, contractAddress)

console.log('new ref')

async function pastEvents () {
  const latestBlock = await web3.eth.getBlockNumber()

  console.log(latestBlock)
  for (let i = latestBlock - 500; i <= latestBlock; i++) {
    const pastEvent = await contract.getPastEvents('AllEvents', {
      fromBlock: i,
      toBlock: i
    })

    if (
      pastEvent.length !== 0 &&
            pastEvent[0].event !== 'OwnershipTransferred'
    ) {
      console.log(pastEvent)
      if (pastEvent[0].event === 'Approval') {
        tokens.push({
          TokenId: pastEvent[1].returnValues.tokenId,
          BlockNumber: i,
          From: pastEvent[1].returnValues.from,
          To: pastEvent[1].returnValues.to
        })
        // Console.log(
        //   "TokenId: ",
        //   PastEvent[1].returnValues.tokenId,
        //   "From: ",
        //   PastEvent[1].returnValues.from,
        //   "To:",
        //   PastEvent[1].returnValues.to,
        //   "BlockNumber:",
        //   I
        // );
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
  console.log('New token', tokens)
}
pastEvents()
