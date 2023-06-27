const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
// const profile_router = require('./routes/profiles.js');
// const logins_router = require('./routes/login.js');
// const new_tickets_router = require('./routes/new_tickets.js');
const routerroute = require('./routes/routerroute')


const app = express();
dotenv.config();

app.listen(process.env.PORT||3000, ()=>{
	console.log(`Server run on port ${process.env.PORT||3000}`);
});

app.use('/', express.static(__dirname+'/public'))
app.use(cors());
app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.use('/',routerroute.router);
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({
      error: 'server error'
    });
  });

