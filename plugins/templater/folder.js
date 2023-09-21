let folder
try {
    folder = await tp.system.suggester(["People/DC", "People/External", "People/FWS", "People/Library", "People/Other TCSES", "People/Other TCSPP", "Campuses"], ["People/DC", "People/External", "People/FWS", "People/Library", "People/Other TCSES", "People/Other TCSPP", "Campuses"])
} catch (e) {
    console.log(e)
    folder = "Error"
}
switch (folder) {
    case "People/DC":
        var contacttag = "DC";
        break;
    case "People/External":
        var contacttag = "external";
        break;
    case "People/FWS":
        var contacttag = "FWS";
        break;
    case "People/Library":
        var contacttag = "library";
        break;
    case "People/Other ES":
        var contacttag = "ES";
        break;
    case "People/Other PP":
        var contacttag = "PP";
        break;
    case "Campuses":
        var contacttag = "library";
}
