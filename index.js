require('dotenv').config();

var google = require('googleapis');
var OAuth2 = google.auth.OAuth2;
var prompt = require('prompt');

let CLIENT_ID = process.env['CLIENT_ID'];
let CLIENT_SECRET = process.env['CLIENT_SECRET'];
let REDIRECT_URL = 'urn:ietf:wg:oauth:2.0:oob';

var oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

// generate a url that asks permissions for Google+ and Google Calendar scopes
var scopes = [
    'https://www.googleapis.com/auth/analytics.readonly'
];

var url = oauth2Client.generateAuthUrl({
    access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
    scope: scopes // If you only need one scope you can pass it as string
});

console.log('url:', url);

prompt.start();

prompt.get(['auth code'], function (err, result) {
    //
    // Log the results.
    //
    console.log('Command-line input received:');
    console.log('  auth code: ' + result['auth code']);

    oauth2Client.getToken(result['auth code'], function(err, tokens) {
        // Now tokens contains an access_token and an optional refresh_token. Save them.
        if(!err) {
            console.log('tokens:', tokens);
            oauth2Client.setCredentials(tokens);
            return
        }
        console.log('token error!', err)
    });
});