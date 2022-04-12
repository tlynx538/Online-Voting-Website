const express = require('express')
const app = express()
const port = 8000
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
//routes
const voterRoutes = require('./routes/voters');
const candidateRouter = require('./routes/candidates')
app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(cookieParser());
app.use(morgan('combined'));
app.use("/public", express.static(path.join(__dirname, 'public')));
app.set('view engine','pug');
app.get('/', (req, res) => {
  res.render('index')
})

app.use('/voters/',voterRoutes);
app.use('/candidates/',candidateRouter);

app.listen(port, () => {
  console.log(`Voting Website listening on port ${port}`)
})