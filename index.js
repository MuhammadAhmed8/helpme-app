const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const expressValidator = require('express-validator');
const handleError = require('./shared/errorHandler').handleError;
const authRoutes = require('./auth/authRoutes');

// https://docs.google.com/document/d/1vof93vN56kBMxxc3iFvHwYbH_soDA4zPAqBC-M76Xog/edit?usp=sharing

const port = 4001;


function startServer(){

    const app = express();                      // createApplication()

    app.use(bodyParser.json());
    

    mongooseConnect(app);

    app.use('/auth',authRoutes);
    
    // test api
    app.get('/',(req,res)=>{

        res.send("WELCOME TO APP");

    })


    app.use((err,req,res,next)=>{
       handleError(err,res);
    })

}

function mongooseConnect(app){
    const conn = `mongodb+srv://maak:ln(lne)=0@cluster0.ucv4x.mongodb.net/<helpforce>?retryWrites=true&w=majority`;

     mongoose.connect(conn,{ useNewUrlParser: true })
    .then((result) => {
        app.listen(port,'0.0.0.0',()=>console.log(`App listening on port ${port}`));
    })
    .catch(err => {
        console.log("mongoose conn error! ",err);
    })
    
}

startServer();


