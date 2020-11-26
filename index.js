const express = require('express')
const { connection } = require('./db.js')
const port = 3000

const app = express()
app.get('/', (req, res) => {
  res.send('ok')
})

app.get('/list', (req, res) => {
  console.log('oke')
  try {
    const query = req.query.harga ? "SELECT id, nama, kadaluarsa FROM bahan" : "SELECT * FROM bahan"
    const query_result = connection.query(query, function(err, rows, fields) {
      res.send(rows)
      console.log(rows)
    })
  } catch (e) {
    console.log(e)
    res.send("error")
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})