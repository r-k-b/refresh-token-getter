# Referenced parameters

* `Google API - Auth Code`
* `Google API - Refresh Token`
* `Google API - Client ID`
* `Google API - Client Secret`


# m

```
let
    Source = (optional nonce as text) as text => let
        // use `nonce` to force a fresh fetch?

        url = "https://www.googleapis.com/oauth2/v4/token",

        GetJson = Web.Contents(url,
            [
                Headers = [
                    #"Content-Type"="application/x-www-form-urlencoded"
                ],
                Content = Text.ToBinary(
                    // "code=" & #"Google API - Auth Code"
                    // "&redirect_uri=urn:ietf:wg:oauth:2.0:oob"

                    "refresh_token=" & #"Google API - Refresh Token"
                    & "&client_id=" & #"Google API - Client ID"
                    & "&client_secret=" & #"Google API - Client Secret"
                    & "&grant_type=refresh_token"
                    & "&nonce=" & nonce
                )
            ]
        ),
        FormatAsJson = Json.Document(GetJson),

        // Gets token from the Json response
        AccessToken = FormatAsJson[access_token],
        AccessTokenHeader = "Bearer " & AccessToken
    in
        AccessTokenHeader
in
    Source
```
