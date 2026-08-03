# CLIFT — Project Page

Website for **CLIFT: Turning Gemini Robotics On-Device into Humanoid Specialists via
Non-Invasive Closed-Loop Iterative Fine-Tuning**.

Live at <https://thomaschen98.github.io/clift/>

A single-page, dependency-free static site (HTML + CSS + vanilla JS, no build step).
The visual system — dark navy, Inter + JetBrains Mono, blue→violet gradient — is shared
with the 3-minute paper film, which the page embeds with chapter-seek chips.

## Local preview

```bash
python3 -m http.server 8000
# open http://localhost:8000
```

## Structure

```
index.html                       # all page content
static/css/index.css             # the page's design system (tokens mirror the film's theme.ts)
static/js/index.js               # chapter seek, count-up tiles, lazy video play, BibTeX copy
static/images/                   # paper figures + film poster + task-video posters
static/videos/clift_film.mp4     # the 3-minute paper film (35 MB, faststart)
static/videos/task_*.mp4         # autonomous rollout clips for the results tiles
.nojekyll                        # serve files as-is on GitHub Pages
```

Legacy files from the double-blind review page (`bulma.min.css`, `fontawesome.*`,
`clift_teaser.mp4`, `video_poster.png`) are no longer referenced and can be deleted.

## Deploy

Served as a GitHub Pages project page from the default branch root. All asset paths are
relative, so the `/clift/` subpath works without changes.

## Still to fill in

- Code link in the hero (currently a "soon" chip)
- Venue line in the BibTeX once the paper lands (currently an arXiv entry)
