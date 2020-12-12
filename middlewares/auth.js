const jwt = require('jsonwebtoken');

exports.authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        const accessTokenSecret = "someSuperSecretKey";         // will separate key later

        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);
            }

            req.user = user;
            next();
        });
    }
    else {
        res.sendStatus(401);
    }
};
