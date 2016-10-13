require('dotenv').config();

let google = require('googleapis');
let OAuth2 = google.auth.OAuth2;
let prompt = require('prompt');

let CLIENT_ID = process.env['CLIENT_ID'];
let CLIENT_SECRET = process.env['CLIENT_SECRET'];
let REDIRECT_URL = 'urn:ietf:wg:oauth:2.0:oob';

let log = console.log.bind(console);

if (CLIENT_ID.length < 10 || CLIENT_SECRET.length < 10) {
    log('Seems like the client_id and/or client_secret are missing; ' +
        'did you create the `.env` file?');
    throw new Error('Missing CLIENT_ID and/or CLIENT_SECRET');
}

let oauth2Client = new OAuth2(CLIENT_ID, CLIENT_SECRET, REDIRECT_URL);

let scopes = [
    'https://www.googleapis.com/auth/analytics.readonly'
];

let url = oauth2Client.generateAuthUrl({
    access_type: 'offline', // 'online' (default) or 'offline' (gets refresh_token)
    scope: scopes
});

function saveTokens (err, tokens) {
    if(!err) {
        log('tokens:', tokens);
        // oauth2Client.setCredentials(tokens);

        // todo: write to file in current folder?
        return
    }

    log('token error!', err);
}

function goGetRefreshToken (err, result) {
    //
    // Log the results.
    //
    log('Command-line input received:');
    log('  auth code: ' + result['auth code']);

    oauth2Client.getToken(result['auth code'], saveTokens);
}

log('open this url, then paste the result back here:', url);

prompt.start();

prompt.get(['auth code'], goGetRefreshToken);