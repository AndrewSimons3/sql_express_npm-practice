const express = require('express')
const app = express()
const mysql = require('mysql')
const port = process.env.PORT || 5000

let pool = mysql.createPool({
    connectionLimit: 100,
    host: '35.188.120.238',
    user: 'root',
    database: 'Admin',
    debug: false
});

function get_users(req, res) {
  pool.query('SELECT * FROM users', function(err, rows) {
    if(err) {
      return res.json({'error': true, 'message': 'Error occured:' + err
      })
    } else {
      res.json(rows)
    }
  })
}



function get_first_names(req, res) {
  let sql = 'SELECT ??, ?? FROM ?? WHERE ?? < 10'
  const replacements = ['id', 'first_name', 'users', 'id', 10]
  sql = mysql.format(sql, replacements)
  pool.query(sql, function(err, rows) {
    if(err) {
      return res.json({ 
        'error': true,
        'message': 'Error occured:' + err
      })
    } else {
      res.json(rows)
    }
  })
}

app.get('/', function(req, res){
  get_users(req, res)
});

app.get('/first-names', function(req, res) {
  get_first_names(req, res)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
});