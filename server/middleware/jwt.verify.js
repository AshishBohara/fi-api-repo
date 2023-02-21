const jwt = require("jsonwebtoken");

module.exports = {
    verifyToken: function (req, res, next) {
        // Get auth header value
        const bearerHeader = req.headers['authorization'];
        // check if bearer is undefined
        if (typeof bearerHeader !== 'undefined') {
            // spli at the space
            const bearer = bearerHeader.split(' ');

            if (typeof bearer[0] !== 'undefined' && typeof bearer[1] !== 'undefined' && bearer[0] == 'bearer') {
                // Get token from array
                const bearerToken = bearer[1];

                jwt.verify(bearerToken, 'secretkey', (err, AuthData) => {
                    if (err) {
                        console.log("err", err);
                        // Forbidden
                        res.sendStatus(403);
                    } else {
                        // Set the token
                        req.token = bearerToken;
                        req.AuthData = AuthData;
                        next();
                    }
                });
            } else {
                // Forbidden
                res.sendStatus(403);
            }
        } else {
            // Forbidden
            res.sendStatus(403);
        }
    }
};

