const Pool = require('pg').Pool
const pool = new Pool({
  user: 'iuevfshp',
  host: 'dumbo.db.elephantsql.com',
  database: 'iuevfshp',
  password: 'ywDJ5rXh3ot6jqjRqw-X83xwzPDQ222c',
  port: 5432
})

// Pool.connect(function (err) {
//   If (err) throw err
//   Console.log('Connected!')
// })

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
  const myInsert = `INSERT INTO users  VALUES ce6968bC30C1Dee5741C2b2790440C18bD0DE03f`
  pool.query(myInsert,  (error, results) => {
    if (error) {
      throw error
    }
    response.status(201).send(`User added with ID: ${results}`)
  })
}

const updateUser = (request, response) => {
  const id = parseInt(request.params.id)
  const { name, email } = request.body

  pool.query(
    'UPDATE users SET name = $1, email = $2 WHERE id = $3',
    [name, email, id],
    (error, results) => {
      if (error) {
        throw error
      }
      response.status(200).send(`User modified with ID: ${id}`)
    }
  )
}

const deleteUser = (request, response) => {
  const id = parseInt(request.params.id)

  pool.query('DELETE FROM users WHERE id = $1', [id], (error, results) => {
    if (error) {
      throw error
    }
    response.status(200).send(`User deleted with ID: ${id}`)
  })
}

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser
}
