var express    = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
var app        = express();
var authRouter  = require('./routes/authroutes'); 

app.use(cors());
app.use(express.json());

 mongoose.connect('mongodb://127.0.0.1:27017/gameotivity')
 .then(()=>console.log('Connected to MongoDB'))
 .catch((error)=> console.error("failed to connect to MongoDB",error));


 app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';
  
    res.status(err.statusCode).json({
      status: err.status,
      message: err.message
    });
  });
  app.use('/auth', authRouter);
    
const PORT = 3030;
app.listen(PORT,()=>{

    console.log(`app is running on port ${PORT}`)
})