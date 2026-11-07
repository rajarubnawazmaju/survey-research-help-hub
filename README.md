# Survey Research Help Hub — Prototype 1

An independent, zero-AI, static help website for **LimeSurvey Community Edition 3.28.73+230906**.

**Attribution:** Created by Raja Rub Nawaz.

## Contents
- `index.html` — responsive public website, local keyword search, categories and article layout
- `articles.json` — five detailed, step-by-step help articles
- `roadmap.json` — 45 further proposed topics (clearly marked as not yet published)

## Deploy on Netlify (drag and drop)
1. Extract the ZIP.
2. Open Netlify and create a new site using manual/drag-and-drop deployment.
3. Drag the **survey-help-hub folder** (containing all three files), not the ZIP and not just `index.html`, into the deployment area.
4. Open the generated URL and test search, categories, article links, and mobile layout.

## Deploy using GitHub
1. Create a new GitHub repository.
2. Upload the three files to the **root** of the repository (not nested inside another directory).
3. In Netlify choose **Add new project > Import an existing project > GitHub**.
4. Select the repository. No build command is needed; the publish directory is the repository root (`.`).
5. Deploy and test.

## Test locally
Because the site loads JSON files via `fetch`, double-clicking `index.html` may not work in some browsers. If Python is installed, from the folder run `python -m http.server 8000`, then open `http://localhost:8000`.

## Editing articles
Edit `articles.json`, preserving the existing JSON structure. Article `id` values should remain unique. The search index is built in the browser and requires no service.

## Content status
The five published starter guides are documentation-checked against the classic LimeSurvey 3 guide. They have **not** been tested against the user's specific university installation; screenshots are not included in this prototype. Do not treat version-specific details as independently verified until tested there.

## Restrictions and privacy
No AI API, API key, login, tracking, analytics, backend or personal data collection. External official documentation links open in a new tab. Hosting is subject to provider free-tier limits. The site is not affiliated with LimeSurvey.


## V2 visual refresh
The new `styles.css` contains the colorful design system. The root `index.html`, `articles.json`, and `roadmap.json` should remain together. No build command is required. Deploy the **contents** of this folder to the GitHub repository root; commit and Netlify will deploy automatically. Do not publish keys or private student information. Fonts are loaded from Google Fonts; local system fonts serve as a fallback if unavailable.


## V3 visual theme (user-supplied)
- Deep plum: `#572E54` — header identity, buttons, emphasis and footer.
- Warm cream: `#E2D2C8` — warm gradients and supporting backgrounds.
- Muted mauve: `#CEB2BD` — accent gradients and category details.
- Secondary shades are derived from these three reference swatches for readable contrast.
- No content, search logic, hosting architecture or API requirements changed.
