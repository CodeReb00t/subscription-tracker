const errorMiddleware = (err,req,res,next) => {
    try{
        let error = {...err}
        error.message = err.message
        console.log(err)

        //Mongoose Bad ObjectID
        if(err.name ==='CastError'){
            const message='Resource not Found'
            error=new Error(message)
            error.statusCode=404
        }
        //Mongoose Duplicate Key
        if(err.code==='11000'){
            const messsage='Duplicate field value entered'
            error=new Error(messsage)
            error.statusCode=400
        }
        //Mongoose validation Error
        if(err.name === 'ValidationError'){
            const message=Object.values(err.errors).map(val=>val.message)
            error=new Error(message.join(', '))
            error.statusCode=400
        }
        res.status(error.statusCode || 500).json({success:false,error:error.message || 'Server Error'})
    }catch(error){
        next(error)
    }
}

export default errorMiddleware;