const { application } = require('express')
const express = require('express')
const config = require('config')
const app = express()
const port = config.get('server.port')

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
