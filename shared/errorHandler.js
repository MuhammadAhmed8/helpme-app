
class MyError extends Error{

    constructor(statusCode, description, params){
        super();
        this.statusCode = statusCode;
        this.description = description;
        this.params = params
    }



}

handleError = (err,res)=>{
    const {statusCode,message,params,name} = err;

    res.status(400).json({
        status: name,
        statusCode,
        message,
        params
    })

}

exports.MyError = MyError;
exports.handleError = handleError;