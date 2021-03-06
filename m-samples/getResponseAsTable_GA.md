# m

```
let
    fetcher = (url as text) as table => let
        jsonResponse = fetchJson_GA(url),
        columnHeadersGA = jsonResponse[columnHeaders],
        listRows = Record.FieldOrDefault(
            jsonResponse,
            "row",
            {List.Transform(columnHeadersGA, each null)}
            // a list of (lists of length exactly matching the # of columns) of null
        ),
        columnNames = List.Transform(columnHeadersGA, each Record.Field(_, "name")),

        matchTypes = (column as record) as list => let
            values = {
                { "STRING", type text },
                { "FLOAT", type number },
                { "INTEGER", Int64.Type },
                { column[dataType], type text } // default type
            },

            columnType = List.First(
                List.Select(
                    values,
                    each _{0} = column[dataType]
                )
            ){1},

            namedColumnType = { column[name], columnType }

        in namedColumnType,

        recordRows = List.Transform(
            listRows,
            each Record.FromList(_, columnNames)
        ),

        columnTypes = List.Transform(columnHeadersGA, each matchTypes(_)),
        rowsTable = Table.FromRecords(recordRows),
        typedRowsTable = Table.TransformColumnTypes(rowsTable, columnTypes)

    in typedRowsTable

in fetcher
```
