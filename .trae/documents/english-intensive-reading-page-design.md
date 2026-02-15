# Page Design Spec (Desktop-first)

## Global styles (applies to all pages)
- Layout system: CSS Grid for page scaffolding + Flexbox for component alignment.
- Breakpoints: Desktop baseline (≥1200px); collapse side panels below 900px; single column below 600px.
- Design tokens
  - Background: #0B1220 (app shell), surfaces: #111B2E, card: #162443
  - Text: primary #EAF0FF, secondary #A9B6D3
  - Accent: #5B8CFF (primary), success #3DDC97, danger #FF5B6E
  - Radius: 12px; spacing scale: 4/8/12/16/24/32
  - Typography: 14/16 base, 20/24 section titles, 28/32 page titles
- Buttons
  - Primary: filled accent + white text; hover: +6% brightness; disabled: 40% opacity
  - Secondary: outline accent; hover: subtle surface tint
- Links: accent text with underline on hover.
- Motion: 150–200ms ease-out for hover, expand/collapse, and card flips.

## 1) Home (Article Library)
### Meta information
- Title: “English Intensive Reading”
- Description: “Choose an article, read by paragraph, study vocabulary, and quiz yourself.”
- Open Graph: title/description + default cover image.

### Page structure
- 12-column grid container; max-width 1200px; centered with 24px gutters.
- Header row: brand (left) + “Continue” CTA (right).
- Main: filter bar + article card grid.

### Sections & components
1. Top bar
   - Left: App name + short tagline.
   - Right: “Continue reading” button (only if progress exists).
2. Filter bar (sticky within container)
   - Level dropdown (A2–C1), topic dropdown, search input (title/summary).
   - “Clear” action.
3. Article cards grid
   - 3 columns desktop; 2 columns medium; 1 column small.
   - Card content: title, level pill, topic, summary (2 lines), estimated time.
   - Primary action: “Read”; secondary: “Quiz” (optional shortcut).
4. Empty state
   - If no matches: message + “Clear filters”.

## 2) Reader
### Meta information
- Title: “Reader – {Article Title}”
- Description: “Read paragraph-by-paragraph with optional translations and vocabulary.”
- Open Graph: article title + summary.

### Page structure
- Two-panel layout (desktop)
  - Left: reading column (8 cols)
  - Right: study panel (4 cols) with tabs
- Below 900px: right panel becomes a drawer or stacks below.

### Sections & components
1. Reader header
   - Breadcrumb: Home / Article title
   - Controls: font size (A-/A+), “Expand all translations”, “Collapse all translations”, “Start quiz”.
2. Paragraph list
   - Each paragraph rendered as a “Paragraph Card”:
     - Header: paragraph number + “Show translation” toggle (per paragraph)
     - Body: original text
     - Collapsible region: translation text (animated height)
     - Footer: “Add vocab” (optional if vocab is curated; otherwise omit) + “Jump to quiz refs” (only if needed)
   - Current paragraph styling: subtle left accent border.
3. Study panel (tabs)
   - Tab A: “Vocab Cards”
     - Card stack: term front; flip to meaning/example; “Known” toggle.
     - Quick filter: All / Unknown / Known.
   - Tab B: “Progress”
     - Last position, known vocab count, reset progress button (with confirm).
4. Error/Not found
   - If `articleId` missing: show message + back to Home.

## 3) Quiz & Review
### Meta information
- Title: “Quiz – {Article Title}”
- Description: “Answer questions with immediate feedback and optional deeper analysis.”
- Open Graph: quiz title + default cover.

### Page structure
- Centered single column (max-width 840px).
- Persistent top progress bar + question card.

### Sections & components
1. Quiz header
   - Breadcrumb: Home / Reader / Quiz
   - Progress: “Question X of N” + linear progress bar.
2. Question card
   - Prompt text + optional “Reference paragraph” chip (click scrolls to that paragraph in Reader via deep link).
   - Input area:
     - MCQ: option list with selectable rows
     - Short answer: text input
   - Actions:
     - Primary: “Submit” (disabled until answered)
     - Secondary: “Skip” (optional) and “Back to reader”
3. Immediate feedback panel (appears after submit)
   - State: Correct/Incorrect label + short explanation.
   - “Show analysis” disclosure button (collapsed by default).
4. Analysis section (only after reveal)
   - Detailed rationale + pointers to paragraph indices.
5. Results summary (after last question)
   - Score + missed questions list.
   - Actions: “Retry missed”, “Back to reader (review)”, “Back to library”.
