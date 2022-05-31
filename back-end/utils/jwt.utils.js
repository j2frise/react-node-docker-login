//Imports
var jwt = require('jsonwebtoken');

const JWT_SIGN_SECRET = '5mpmnFqeHPHUGhhGq1KXeejUEnSYybObUoRw1FoL2CjFZnrmGJruHTlbUxag';

//Exported functionns
module.exports = {
    generateToken: function(userData){
        return jwt.sign({
          userId: userData.id
        },
        JWT_SIGN_SECRET,
        {
            expiresIn: '24h'
        })
    },
    parseAuthorization: function(authorization) {
      return (authorization != null) ? authorization.replace('Bearer ', '') : null;
    },
    getUserId: function(authorization) {
        var userId = -1;
        var token = module.exports.parseAuthorization(authorization);
        if(token != null) {
          try {
            var jwtToken = jwt.verify(token, JWT_SIGN_SECRET);
            if(jwtToken != null)
              userId = jwtToken.userId;
          } catch(err) { }
        }
        return userId;
    },
    destroyToken: function(authorization) {
        var userId = -1;
        var token = module.exports.parseAuthorization(authorization);
        if(token != null) {
          try {
            userId = jwt.destroy(token);
          } catch(err) { }
        }
        return userId;
    }
}
