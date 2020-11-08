/*
    Connecting Mongo db with the application
*/


const mongodb = require('mongodb');
const mongoClient = mongodb.MongoClient;
let _db;

const mongoConnect = (cb) => {

    const conn = "mongodb+srv://maak:ln(lne)=0@cluster0.ucv4x.mongodb.net/<helpforce>?retryWrites=true&w=majority";

    mongoClient.connect(conn)
        .then( (client) => {

            console.log("db connected.");
            _db = client.db();
            cb();
            
        })
        .catch( err => {

            console.log("Mongodb error" + err);
            
        })


}

const getDb = () => {
    if(_db)
        return _db;
    
    throw "No database found";
}

exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
