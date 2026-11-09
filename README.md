# Survey Research Help Hub — Approved Lime Theme + Questionnaire Builder

This is a complete GitHub / Netlify-ready static site. Extract the **contents** of this ZIP into the root of your existing repository.

## Approved palette
- Soft lime / card backgrounds: `#D7E7A6`
- Forest green / buttons: `#355E2B`
- Soft ivory / base background: `#F5F2E8`
- Olive accent: `#6B8E23`
- Strong red remove control on the builder (light ivory background, red border/text).

## Contents
- 50 help articles (`articles.json`)
- 16 video resources (`videos.json`)
- Downloads (`downloads/`)
- Main static website (`index.html`, `styles.css`)
- Standalone builder (`builder/index.html`, `builder/styles.css`, `builder/app.js`, `builder/schema.js`)

## Deployment
All files go to the GitHub repository root; retain the `builder/` and `downloads/` directories. Netlify needs no build command, and the publish directory is `.`.

## Safeguards
No AI API, login, database or backend. The builder is experimental; test generated `.lss` files in LimeSurvey Community Edition 3.28 before using them with participants. The site content and builder logic are preserved; this update primarily unifies the design and connects the builder.


## Randomization Help Center expansion
This release adds 15 standalone, plain-English randomization help guides in `randomization.json`, navigable at `#randomization` with deep links `#rand-guide/<id>`. It explains native settings, equations, testing, and advanced experimental design concepts with explicit verification warnings. No new AI APIs or backend are used.

The Questionnaire Builder code-generation engine is unchanged; its page adds a link to the help section. The 50 original articles, videos, downloads, and visual theme are retained.
