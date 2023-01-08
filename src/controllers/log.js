import passport from 'passport';

const optionsPassport = { badRequestMessage: 'Incomplete' };

export const sign = (req, res, next) => {
    passport.authenticate('sign', optionsPassport, (err, user, info) => {
        if (err) {
            return next(err)
        }
        if (!user) return res.status(401).json(info);
        res.json({ msg: 'Signed up' })
    })(req, res, next);
}

export const log = (req, res) => {
    res.json({ msg: `Welcome ${req.user.username}!`, user: req.user });
}

export const home = (req, res) => {
    res.json(req.session)
}

export const logOut = (req, res, next) => {

    req.logout(function (err) {
        if (err) { return next(err) };
        res.send(`Hasta luego!`);
    });

}