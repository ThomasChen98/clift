# CLIFT — Project Page

Website for **CLIFT: Turning Gemini Robotics On-Device into Humanoid Specialists via
Non-Invasive Closed-Loop Iterative Fine-Tuning**.

Live at <https://thomaschen98.github.io/clift/>

A single-page, dependency-free static site (HTML + CSS + vanilla JS). No build step.

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Structure

```
index.html            # all page content
static/css/           # bulma + fontawesome + page styles
static/js/            # fontawesome + mobile nav toggle
static/images/        # figures (teaser, method, tasks, results, qualitative)
static/videos/        # teaser video
.nojekyll             # serve files as-is on GitHub Pages
```

## Deploy

Served as a GitHub Pages project page from the default branch root. All asset paths are
relative, so the `/clift/` subpath works without changes.

## Still to fill in

- Author list and affiliations (currently placeholders from the double-blind version)
- Venue line and footer text
- arXiv / PDF / code / BibTeX links in the header button row
