module.exports={

    isLoggendIn( req,res,next ){
        if(req.isAuthenticated()){
            return next();

        }
        return res.redirect('/signin');
    },
    isNotLoggendIn(req,res, next){
        if(!req.isAuthenticated()){
            return next();
        }
        return res.redirect('/profile');
    }
}