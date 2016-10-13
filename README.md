A quick and dirty helper, for using the [OAuth-protected Google APIs](https://developers.google.com/identity/protocols/OAuth2ForDevices) 
in [Power BI's](https://powerbi.microsoft.com) [M (Power Query) language.](https://msdn.microsoft.com/en-us/library/mt211003.aspx)

# usage

1. Run `npm install`
2. Create the `.env` file _(refer to [`.env.md`](.env.md) for what goes in it)_
3. Run `npm start`
4. Open that url, approve the request, paste that code back into this app
5. Receive your `refresh_token` for use in Power BI
