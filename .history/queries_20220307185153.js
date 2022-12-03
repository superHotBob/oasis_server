const Pool = require('pg').Pool
const pool = new Pool({
  user: 'iuevfshp',
  host: 'dumbo.db.elephantsql.com',
  database: 'iuevfshp',
  password: 'ywDJ5rXh3ot6jqjRqw-X83xwzPDQ222c',
  port: 5432
})
const getUsers = (request, response) => {
  pool.query('SELECT * FROM users ORDER BY user ASC', (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}
const updateBlock = (a) => {
  pool.query('UPDATE lastblock SET block = $1', [a], (error,results) => {
    if (error) {
      throw error
    }
  })
}
const readBlock = () => {
  pool.query('SELECT * FROM  lastblock ', (error, results) => {
    if (error) {
      throw error
    }
    console.log(results)
    return results
  })
}

const getUserById = (request, response) => {
  const id = parseInt(request.params.walletAddress)
  console.log(id)

  pool.query(
    'SELECT * FROM users WHERE WalletAddress = $1',
    [id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).json(results.rows)
    }
  )
}

const writeActivity = (a, b, c) => {
  console.log(a, b, c)  
  pool.query('INSERT INTO activity VALUE from = $1, to = $2, tokenId = $3', [a, b, c], (error, results) => {
    if (error) {
      throw error
    }
  })
}
const createUser = (request, response) => {
  const { walletAddress } = request.body
  console.log(walletAddress)
  //   Const myInsert = `INSERT INTO users  VALUES ${1}`
  pool.query(
    'UPDATE users  SET user = $1 WHERE user = $1',
    [walletAddress],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results}`)
    }
  )
}
const addTransfer = (request, response) => {
  const { from, to, tokenId, date } = request.body
  pool.query(
    'INSERT INTO transfer (to,from,date,tokenId) VALUE  from = $1, to = $2, tokenId = $3 , date = $4 ',
    [from, to, tokenId, date],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(201).send(`User added with ID: ${results}`)
    }
  )
}

const updateUser = (request, response) => {
  const { walletAddress, date } = request.body
  const balance = 100
  console.log(balance, walletAddress, date)

  pool.query(
    'UPDATE users SET balance = $1, date = $3 WHERE user = $2',
    [balance, walletAddress, date],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with balance: ${balance}`)
    }
  )
}

const deleteUser = (request, response) => {
  const { walletAddress } = request.body
  pool.query(
    'DELETE FROM users WHERE user = FSDFSDF',
    [walletAddress],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User deleted with ID: ${walletAddress}`)
    }
  )
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  addTransfer,
  deleteUser,
  writeActivity,
  updateBlock,
  readBlock
}
