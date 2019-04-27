var jwt = require('jwt-simple');
var moment = require('moment');
var secret = 'WithLoveForAklen<3'

module.exports = {
    createJWT: (token) =>{
        let payload = {
            access_token: token.access_token,
            refresh_token: token.refresh_token,
            iat: moment().unix(),
            exp: moment().add(token.expires_in,'minutes')
        };
        return jwt.encode(payload, secret);
    },
    returnPayload: (token)=>{
        return jwt.decode(token,secret,false);
    }
}