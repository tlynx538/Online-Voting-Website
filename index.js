const express = require('express')
const app = express()
const port = 8000

app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.get('/', (req, res) => {
  res.send('Hello World xDDS!')
})

app.listen(port, () => {
  console.log(`Voting Website listening on port ${port}`)
})