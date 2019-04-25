let fetch = require('node-fetch')
let client_id = require('../config').client_id;
let redirect_uri = require('../config').ApiUrl;
let client_secret = require('../config').client_secret;


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
        const body = {
            grant_type: 'authorization_code',
            code: req.query.code,
            redirect_uri: encodeURIComponent(redirect_uri + '/api/getToken')
        }
        
        var payload = client_id + ":" + client_secret;
        var encodedPayload = new Buffer(payload).toString("base64");

        console.log(body);

        fetch('https://accounts.spotify.com/api/token', {
            method: 'post',
            body: JSON.stringify(body),
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
                'Authorization': 'Basic' + encodedPayload
            }
        }).then((res) => {
            return res.json()
        }).then((obj) => {
            console.log(obj);
            res.send('Logged');
        });
    }
};



//curl -H "Authorization: Basic NjMwNzhiMmMzMWM1NDU5MDk5MzIzOWI1ZjhiNmY5YWI6NDAzOTA3ZjdjMWEyNDUyZTgzMWEyNzdkNTZlYTA4Yjk=" -d grant_type=authorization_code -d code=AQBSG4VkOHEYaZUhZpWhkvhA0_QBztx6A1Mr38fafsTTj3pQz0x3YZYmtm-Vukh0rGEefPGOhv8D32nnoeS6Bh9x_5q3rIltGzdfLEPwnXkGqkxrGfp3Da-2_iPPaxByF-RDat3vaxztMu7sLAYnWS9OCrpE5QWHNlpoI9PmatDdv81z4KUE-idIxx8tTIqLV7Bdr0Z1mV41tMspVY6QSAOkzERO8WZxZm99Z3pHT6uz-t09E9ZhvJONmS_StQ -d redirect_uri=http%3A%2F%2Flocalhost%3A8080%2Fapi%2FgetToken https://accounts.spotify.com/api/token