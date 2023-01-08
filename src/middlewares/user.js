export const loggedIn = (req, res, next) => {
    console.log(req.authUser());
    if(!req.authUser()) return res.status(401).json({msg: 'Not authorized'});
    next();
}