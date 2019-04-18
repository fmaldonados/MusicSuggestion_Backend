
module.exports = {
    SpotifyAuth : (req, res) => {
        let my_client_id = '63078b2c31c54590993239b5f8b6f9ab';
        let redirect_uri = 'https://www.google.hn/';
        let scopes = 'user-read-private user-read-email';
        res.redirect('https://accounts.spotify.com/authorize' +
            '?response_type=code' +
            '&client_id=' + my_client_id +
            (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
            '&redirect_uri=' + encodeURIComponent(redirect_uri));
    }
};