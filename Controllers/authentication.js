let fetch = require('node-fetch')
let client_id = require('../config').client_id;
let redirect_uri = require('../config').ApiUrl;
let client_secret = require('../config').client_secret;
let {URLSearchParams} = require('url');
let jwt = require('../Helpers/jwt');
module.exports = {
    SpotifyAuth: (req, res) => {
        let scopes = 'user-read-private user-read-email';

        res.redirect('https://accounts.spotify.com/authorize' +
            '?response_type=code' +
            '&client_id=' + client_id +
            (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
            '&redirect_uri=' + encodeURIComponent(redirect_uri + '/api/getToken'));
    },
    getToken: (req, res) => {
        const params = new URLSearchParams();

        params.append('grant_type','authorization_code');
        params.append('code',req.query.code);
        params.append('redirect_uri', redirect_uri + '/api/getToken');
            
        var payload = client_id + ":" + client_secret;
        var encodedPayload = new Buffer(payload).toString("base64");

        fetch('https://accounts.spotify.com/api/token', {
            method: 'post',
            body: params,
            headers: {
                'Authorization': 'Basic ' + encodedPayload,
                'Content-Type':'application/x-www-form-urlencoded'
            }
        }).then((res) => {
            return res.json()
        }).then((obj) => {
            let token = jwt.createJWT(obj);
            res.send({success:true, jwt:token});
        });
    }
};