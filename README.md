# Templar
A simple ajax/json jquery templating plugin

Early stages of the plugin.
To use simply define two parameters:

templateString: a single or multiline string to represent your template
```
var templateString = `
	<h2>userId: {{userId}}</h2>
	<h2>id: {{id}}</h2>
	<h2>title: {{title}}
	<h2>body: {{body}}</h2>
`
```

remoteUrl: URL that jquery will ajax GET call to

Then call templar:
```
$("#myDiv").templar({ templateString: templateString, remoteUrl: remoteUrl })
```

To trigger the ajax call, simply trigger the remote on templar:
```
$("#myDiv").trigger("templar:remote");
```
