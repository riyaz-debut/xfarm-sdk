const {check,validationResult} = require('express-validator');

class Validator{
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

    validateHandler(req, res, next) {
        try {
          let errors = validationResult(req);
          if (!errors.isEmpty())
            return res.status(400)(res.json({ errors: errors.array() }));
          next();
        } catch (err) {
          return res.status(400)(res.json({ errors: "Something went wrong" }));
        }
      }
    

    get valid_create_data(){
        return [
            check('id').not().isEmpty().withMessage("Please enter the id"),
            // check('doc_type').not().isEmpty().withMessage("Please enter the doc type"),
  
        ]
        
    }

    get valid_update_data(){
        return [
            // check('doc_type').not().isEmpty().withMessage("Please enter the doc type"),
  
        ]
        
    }
 
 
      
        
    
}

module.exports = Validator;