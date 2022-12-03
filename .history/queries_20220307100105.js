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

const getUserById = (request, response) => {
  const id = parseInt(request.params.walletAddress)
  console.log(id)

  pool.query('SELECT * FROM users WHERE WalletAddress = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).json(results.rows)
  })
}

const createUser = (request, response) => {
  const { walletAddress } = request.body
  console.log(walletAddress)
  //   Const myInsert = `INSERT INTO users  VALUES ${1}`
  pool.query('UPDATE users  SET user = $1 WHERE user = $1', [walletAddress], (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results}`)
  })
}

const updateUser = (request, response) => {  
  const { balance, walletAddress } = request.body
  console.log(balance, walletAddress)

  pool.query(
    'UPDATE users SET balance = 100 WHERE user = $2',
    [balance, walletAddress],
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
  pool.query('DELETE FROM users WHERE user = FSDFSDF', [walletAddress], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${walletAddress}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}
