const checkLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) next()
    else res.redirect('/login');
}

const checkAdmin = (req, res, next) => {
    if (req.user.isAdmin) next();
    else res.send('not permitted');
}

const verified = (req,res,next)=>{
    if(req.user.isAdmin || req.user._id.equals(req.params.id))next();
    else res.send('Not permitted');
}  

module.exports = {checkLoggedIn,checkAdmin,verified};