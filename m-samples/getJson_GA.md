# m

```
let
    fetchJson = (url as text, optional options as record) as record => let
        
        // todo: use coarser granularity than single minutes (10 minutes? 30? 1 hour?)
        nonce = DateTime.ToText(DateTime.LocalNow(), "yyyyMMddhhmm"),

        AccessTokenHeader = GetAccessToken_GA(nonce),

        GetJsonQuery = Web.Contents(
            "https://www.googleapis.com/analytics" & url,
            [
                Headers = [
                    #"Authorization" = AccessTokenHeader
                ]
            ]
        ),
        FormatAsJsonQuery = Json.Document(GetJsonQuery)
    
    in FormatAsJsonQuery
    
in fetchJson
```
