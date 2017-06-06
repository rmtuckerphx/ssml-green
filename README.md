# SSML compatibility tables
This project allows voice designers and developers to understand how SSML is implemented across various voice platforms including:
- Amazon Alexa
- Google Home
- Microsoft Cortana
- Amazon Polly
- IBM Watson

## Making change to the webpage
The webpage is hosted via GitHub.

The `build.js` file:
1) aggregates the data from the `/plaforms` folder for the platforms listed in `ssml.platforms`
2) uses `index.jade` to generate `index.html`

So, change `index.jade` then run:
```bash
$ node build.js
```

** Note: If a version is listed in `v8.versions` that doesn't have results generated in the `/results` directory, the
column will be empty (all white cells- no text).