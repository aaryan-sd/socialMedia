// here we pass in func , which is a function that we want to wrap in try catch block

const asyncHandler = (func) => async(req, res, next) => {
    try{
        await func(req,res,next);
    }catch(error){
        console.error("Error :", error);
    }
}

export { asyncHandler }