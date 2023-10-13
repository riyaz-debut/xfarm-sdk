class RouteType{
    // validateHandler(req,res,next){
    //     let errors = validationResult(req);
    //     if(errors.isEmpty()){
    //         next();
    //     }else{
    //         console.log("error validation",errors.errors[0].msg);
    //         req.flash('errors',errors.errors[0].msg)
    //         return({message:errors.errors[0].msg})
    //     }
    // }

    user(req, res, next) {
      try {
        req.docType = "user"
        req.idName="userId"
        next();
      } 
      catch (err) {
        return res.status(500)(res.json({ errors: "Something went wrong" }));
      }
    }
}

module.exports = RouteType;