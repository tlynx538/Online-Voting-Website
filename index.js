const express = require('express');
const app = express();
const port = 8000;
const cookieParser = require('cookie-parser');
const morgan = require('morgan');
const path = require('path');
const db = require('./knex/knex');
const sessions = require('express-session');
const voterRoutes = require('./routes/voters');
const candidateRouter = require('./routes/candidates');
const adminRouter = require('./routes/admin');
const {v4:uuid} = require('uuid');

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
  secret: uuid(),
  resave: false,
  saveUninitialized: true,
  cookie: {maxAge: oneDay}
}))

app.use(express.json());
app.use(express.urlencoded({ extended:false }));
app.use(cookieParser());
app.use(morgan('combined'));
app.use("/public", express.static(path.join(__dirname, 'public')));
app.set('view engine','pug');


//sesion storage 


// index route
app.get('/', (req, res) => {
  res.render('index')
})

// other routes
app.use('/voters/',voterRoutes);
app.use('/candidates/',candidateRouter);
app.use('/admin/',adminRouter);


// test database connection
const testdb = async () => {
  try 
  {
    const testKnexConnection = await db.raw("SELECT 1+1");
  }
  catch(err) 
  {
    console.log("Database Connection Error");
    console.log(err);
  }
}

app.listen(port, () => {
  testdb();
  console.log(`Voting Website listening on port ${port}`);
})