# Survey Research Help Hub — Complete help catalogue (v4)

**Created by Raja Rub Nawaz**

Static, no-AI help website for LimeSurvey Community Edition 3.28.73+230906. Plum `#572E54`, cream `#E2D2C8`, mauve `#CEB2BD` theme. Includes **50 available help articles across eight categories**, local keyword search, difficulty filters, shareable article URLs, print-friendly pages, and official documentation links.

## Files

- `index.html` — website, routing, searchable catalogue and article pages.
- `styles.css` — complete plum, cream and mauve design system.
- `articles.json` — 50 individual help articles. Add or edit articles here.

## Update an existing GitHub → Netlify site

1. Extract the ZIP.
2. Replace the root `index.html`, `styles.css` and `articles.json` files in your existing repository. Delete old `roadmap.json` if you wish; it is no longer used.
3. Commit to the branch Netlify deploys (usually `main`).
4. Netlify will redeploy automatically. No build command required; publish directory `.`.
5. Test homepage, article navigation, search, filters and a mobile viewport.

## Local testing

From the website directory, run `python -m http.server 8000` and visit `http://localhost:8000`. Directly opening `index.html` using the file system may block the JSON request.

## Editorial quality and cautions

- The 50 guides are written for the classic LimeSurvey 3 workflow based on official manual concepts. **They have not been click-tested against the university's specific installed interface.** Check exact menus, permissions and local settings.
- Advanced randomization/experimental-assignment articles describe the required method and testing controls, **not a prevalidated, copy-and-paste random-assignment implementation**. Validate any expressions and balancing logic locally before real data collection.
- The initial source questionnaire is used as an example, but the original PDF is not redistributed by this release.
- This site is independent and unofficial; it is not endorsed by LimeSurvey.
- No AI API, browser-key storage, account registration, backend, analytics or database. Search runs locally on the 50-article JSON catalogue. Google Fonts may load over the web with local font fallbacks if unavailable.
