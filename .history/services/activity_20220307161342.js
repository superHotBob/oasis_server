import Web3 from 'web3'
const contractABI = require('../artifacts/contracts/NFTMinter.sol/contract-abi.json')
const contractAddress = '0x2265C9ea6E9C593734e04b839B5f8a72a6427FeE'
const walletAddress = '0xE9252e37E406B368Ad38d201800bF421978af659'
const axios = require('axios')
const web3 = new Web3(
  Web3.givenProvider ||
    Web3.providers.HttpProvider('https://testnet.emerald.oasis.dev')
)

const contract = new web3.eth.Contract(contractABI.abi, contractAddress)

function Safe () {
  // TitleRef.current.textContent = "New updated Text";
  // axios.post("http://localhost:5000/api/tokens", { tokens }).then((res) => {
  //   Console.log(res);
  //   Console.log(res.data);
  // });
}
console.log('new ref')

const tokens = []
async function pastEvents () {
  const latestBlock = await web3.eth.getBlockNumber()
 
  console.log('This is  block', latestBlock, moment_last_block)
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
       
        tokens.push({
          TokenId: pastEvent[0].returnValues.tokenId,
          BlockNumber: i,
          From: pastEvent[0].returnValues.from,
          To: pastEvent[0].returnValues.to
        })
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

