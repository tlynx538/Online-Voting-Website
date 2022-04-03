const express = require('express')
const app = express()
const port = 8000
const cookieParser = require('cookie-parser');
const morgan = require('morgan');

app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(cookieParser());
app.use(morgan('combined'));

app.set('view engine','pug');
app.get('/', (req, res) => {
  res.render('index')
})

app.listen(port, () => {
  console.log(`Voting Website listening on port ${port}`)
})