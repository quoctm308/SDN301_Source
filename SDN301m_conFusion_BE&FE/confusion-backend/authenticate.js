var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('./models/user');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var jwt = require('jsonwebtoken'); // used to create, sign, and verify tokens
var FacebookTokenStrategy = require('passport-facebook-token');

var config = require('./config.js');

exports.local = passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

exports.getToken = function (user) {
    return jwt.sign(user, config.secretKey,
        { expiresIn: 3600 });
};

var opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = config.secretKey;

exports.jwtPassport = passport.use(new JwtStrategy(opts,
    (jwt_payload, done) => {
        console.log("JWT payload: ", jwt_payload);
        User.findOne({ _id: jwt_payload._id })
            .then(user => {
                if (user) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            })
            .catch(err => {
                return done(err, false);
            });
    }));

exports.verifyUser = passport.authenticate('jwt', { session: false });

exports.verifyAdmin = function (req, res, next) {
    User.findOne({ _id: req.user._id })
        .then((user) => {
            console.log("User: ", req.user);
            if (user.admin) {
                next();
            }
            else {
                err = new Error('You are not authorized to perform this operation!');
                err.status = 403;
                return next(err);
            }
        }, (err) => next(err))
        .catch((err) => next(err))
}

exports.facebookPassport = passport.use(
    new FacebookTokenStrategy(
        {
            clientID: config.facebook.clienId,
            clientSecret: config.facebook.clientSecret,
        },
        async (accessToken, refreshToken, profile, done) => {
            try {
                const user = await User.findOne({ facebookId: profile.id });
                if (user) {
                    return done(null, user);
                } else {
                    const newUser = new User({
                        username: profile.displayName,
                        facebookId: profile.id,
                        firstname: profile.name.givenName,
                        lastname: profile.name.familyName,
                    });
                    await newUser.save();
                    return done(null, newUser);
                }
            } catch (err) {
                return done(err, false);
            }
        }
    )
);  