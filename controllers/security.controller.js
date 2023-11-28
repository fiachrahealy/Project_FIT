const { getAuth } = require("firebase-admin/auth");

// Check Valid User

exports.checkValidUser = (req, res, next) => {

  getAuth()
    .verifyIdToken(req.headers.token)
    .then((decodedToken) => {
      req.body.user = decodedToken;
      next();
    })
    .catch((error) => {
      throw error;
    });

}