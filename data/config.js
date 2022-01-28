const sql = require('mssql');

// Configuration object for database credentials
var config = {
  user: 'HQSoftware',
  password: 'zebra',
  server: '83.70.203.107',
  database: 'HQWMS-NHL',
  port: 2022,
  options: {
      encrypt: true,
      trustServerCertificate: true
  }
};


// Creating connection pool to be used by routes connecting SQL Server
const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('Connected to MSSQL successfully')
    return pool
  })
  .catch(err => console.log('Database Connection Failed! Bad Config: ', err))

module.exports = {
  sql, poolPromise
}