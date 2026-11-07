# Survey Research Help Hub — Final consolidated release

**Created by Raja Rub Nawaz**. Independent and unofficial help for LimeSurvey Community Edition **3.28.73+230906**.

## Included
- 50 searchable plain-English help articles across 8 categories
- 16 curated external videos (8 English/English-translated and 8 German) with explicit audio/playback caveats
- Sophisticated plum (#572E54), warm cream (#E2D2C8), mauve (#CEB2BD) design
- 12+ simplified diagrams for common tasks (NOT screenshots of the actual LimeSurvey admin UI)
- Three downloadable example/checklist CSV files and a readme for downloads
- Search, category filters, level filters, article permalinks, copy-link and printing
- No AI API, server, database, login, or analytics script

## Deploy
Extract this zip. Upload **the contents of this folder** into the ROOT of the current GitHub repository, overwriting the matching files, keeping the `downloads/` folder. Commit to `main` or the branch already connected to Netlify. The existing Netlify site deploys on that commit. No build command; publish directory `.`, if the repository root contains index.html.

Required: index.html, styles.css, articles.json, videos.json, README.md and downloads/. No need to upload older roadmap.json.

## Important verification limits
The source documentation was consulted, and static/content checks were completed. The site has NOT been click-tested against the University's actual 3.28.73 installation. The visual guides are **illustrations, not real screenshots**. External videos have **not all been played/listened to** and some are older or demonstrate newer interfaces. The downloadable CSV is a questionnaire build template, not a LimeSurvey import file. A working .lss is not supplied because no locally import-tested compatible export is available.

Advanced assignment/randomization and privacy guidance should be individually verified in the target installation, with simulated test cases and exported data, before live research.

## Local preview
From this folder run `python -m http.server 8000` and visit http://localhost:8000. Opening index.html directly from file:// may prevent JSON from loading.

## Site identity
Independent, unofficial educational resource; not endorsed by LimeSurvey. No confidential responses are collected. Maintain institutional research ethics/privacy procedures.
