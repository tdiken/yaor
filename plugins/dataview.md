
- [Dataview documentation: Home](https://blacksmithgu.github.io/obsidian-dataview/)

## Notes
### Implicit Metadata
- [Dataview documentation: Implicit metadata](https://blacksmithgu.github.io/obsidian-dataview/annotation/metadata-pages/)

| Field | Description |
| ----- | ----------- |
| `file.name` | Title |
| `file.folder` | Folder |
| `file.path` | Entire filepath |
| `file.link` | Title as link |
| `file.day` | Date from title or date key if present and in YYYY-MM-DD or YYYYMMDD format |
| `file.cday` & `file.ctime` | Created |
| `file.mday` & `file.mtime` | Last modified |
| `file.tags` | Note tags and their hierarchies. #contact/DC renders as #contact, #contact/DC |
| `file.etags` | Explicit note tags. #contact/DC renders as #contact/DC |
| `file.inlinks` | `file.link` for pages that link to this note |
| `file.outlinks` | `file.link` for pages that this note links to |
| `file.aliases` | Aliases from YAML |

## Examples
### DQL
- [Dataview documentation: DQL reference](https://blacksmithgu.github.io/obsidian-dataview/queries/structure/)

Notes containing tag and the folder they live in
```
table rows.file.link as "Note" from #tag
group by file.folder as "Folder"
sort file.folder asc
```

Notes created today - [*also uses Templater*]
```
where file.cday = date("<% tp.date.now("YYYY-MM-DD") %>")
sort file.ctime asc
```

Notes touched today - [*also uses Templater*]
```
list from "" 
where file.mday = date("<% moment(tp.file.title,'YYYY-MM-DD').format("YYYY-MM-DD") %>") 
AND file.cday != date("<% moment(tp.file.title,'YYYY-MM-DD').format("YYYY-MM-DD") %>")
sort file.mtime asc
limit 20
```

Notes that are outgoing links from a given note and where lender key matches note title - [*also uses Templater*]
```
list from outgoing([[Note]])
where lender = "<% tp.file.title %>"
```

Where condition to exclude templates and periodic notes
```
where !contains(file.path, "Templates") AND !contains(file.path, "Periodic")
```

### DataviewJS
- [Dataview documentation: DataviewJS reference](https://blacksmithgu.github.io/obsidian-dataview/api/code-reference/)
Find "ghost notes" that are linked but uncreated - from [Obsidian Forum reply by JLDiaz](https://forum.obsidian.md/t/is-there-a-way-to-see-backlinks-without-creating-a-markdown-document/26977/3)
```javascript
let d = {}
function process(k, v) {
    Object.keys(v).forEach(function (x) {
        x = dv.fileLink(x);
        if (d[x] == undefined) { d[x] = []; }
        d[x].push(dv.fileLink(k));
    });
}
Object.entries(dv.app.metadataCache.unresolvedLinks)
    .filter(([k, v]) => Object.keys(v).length)
    .forEach(([k, v]) => process(k, v));
dv.table(["Non existing notes", "Linked from"],
    Object.entries(d).map(([k, v]) => [k, v.join(" • ")]))
```

### Functions
- [Dataview documentation: Functions](https://blacksmithgu.github.io/obsidian-dataview/reference/functions/)

`date` - Parses date from linked daily note
```
date(date, "[[YYYY-MM-DD]]")
```
