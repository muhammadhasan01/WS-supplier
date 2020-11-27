const express = require('express')
var bodyParser = require('body-parser');
const { connection } = require('./db.js')
const port = 3000

const app = express()
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send('ok')
})

app.get('/list', (req, res) => {
  console.log('oke')
  try {
    const query = req.query.harga ? "SELECT id, nama FROM bahan" : "SELECT * FROM bahan"
    const query_result = connection.query(query, function(err, rows, fields) {
      res.send(rows)
      console.log(rows)
    })
  } catch (e) {
    console.log(e)
    res.send("error")
  }
})

app.post('/buy', (req, res) => {
  console.log("buy bahan")
  let uang = req.body.uang
  let list_bahan = req.body.list_bahan
  let list_banyak_bahan = req.body.list_banyak_bahan

  try {
    const query = "SELECT nama, harga_satuan FROM bahan"
    const query_result = connection.query(query, function(err, rows, fields) {
      let harga_total = 0;

      rows.forEach(element => {
        for (let i = 0; i < list_bahan.length; i++) {
          if(list_bahan[i] === element["nama"]){
            harga_total += element["harga_satuan"]*list_banyak_bahan[i]
          }
        }
        console.log(element)
      });

      let response 
      if (uang > harga_total ){
        //transaksi berhasil
        response = {
          status:"berhasil",
          kembalian:uang-harga_total
        }
      } else {
        //transaksi gaga;
        response = {
          status:"gagal",
          kurang:harga_total-uang
        }
      }
      console.log(harga_total)
      res.send(response)
    })
  } catch (e) {
    console.log(e)
    res.send("error")
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})