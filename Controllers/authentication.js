let client_id = require('../config').clientId;
let redirect_uri = require('../config').ApiUrl;

module.exports = {
    SpotifyAuth : (req, res) => {
        let scopes = 'user-read-private user-read-email';

        res.redirect('https://accounts.spotify.com/authorize' +
            '?response_type=code' +
            '&client_id=' + client_id +
            (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
            '&redirect_uri=' + encodeURIComponent(redirect_uri+'/api/getToken'));
    },
    getToken: (req,res) => {
        res.send('Logged');
    }
};