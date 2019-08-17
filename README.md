# SSML compatibility tables
This project allows voice designers and developers to understand how SSML is implemented across various voice services including:
- Amazon Alexa
- Google Home
- Microsoft Cortana
- Amazon Polly
- IBM Watson

It helps answer the questions:
- How well does a service match the SSML standards?
- Which non-standard extensions do they use?
- Which elements are values do I need to be concerned about when doing TTS for various services?

## Making change to the webpage
The webpage is hosted via GitHub.

The `build.js` file:
1) aggregates the data from the `/data` folder
2) uses `index.pug` to generate `index.html`

When a change is made to `index.pug` or a data file, then run:
```bash
$ node build.js
```

The data files:
- **platforms.json** - The columns that will be shown (determines display order). Adding an entry to this file requires adding a file under the `/data/platforms` folder.
- **groups.json** - The groupings of specs (determines display order). Adding an entry to this file requires a section to be added to the `specs.json` file and any file under `/data/platforms` that has values in that group.
- **specs.json** - The rows that will be shown inside a group (determines display order). The keys in this file are separated by the `›` character (not the greater than `>` character) and form the hierarchy shown in the table. The value is a code snippet to display.
- **/data/platforms/*.json** files - These files need to show only those groups that have specs for the specific platform. For example, the `google-home.json` file will not have an **AMZ-EXT** group because it doesn't apply. If a give spec is missing from this file or the value is null, then the corresponding space in the grid will be blank/white. If the value is true, it will show as green. If the value is false, it will show red. If the value is a text value, it will show the text with a gray background.

## Contributors:
- Mark Tucker

There are still a lot of white space in the grid. Come join the project and get added to the contributor's list.

A special thanks to [William Kapke](https://github.com/williamkapke) and his [node-compat-table](https://github.com/williamkapke/node-compat-table) project which gave me the idea for this project.