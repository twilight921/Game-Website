# Styling review: ideas for improvement and closer adherence to the "Twilight Ember Games" name

Written in response to issue #1. It is formatted so it can be pasted straight into a follow-up issue. No site styling was changed as part of this review.

## What the site looks like today

- **Palette:** an animated 4-stop gradient body background of lime green (`#32CD32`) and deep blue (`#004e92`), a flat `#222` header/footer, a light-grey (`#f4f4f4`) main panel, and blue buttons and tags. Discord blurple (`#5865F2`) is used for the link buttons.
- **Typography:** the generic `sans-serif` stack, with no custom fonts.
- **Layout:** a plain header (title, nav, buttons), a centred 800px `main` panel, and a footer. Game cards sit in a flex grid on `games.html`.
- **Theme:** a light/dark toggle exists on `index.html` only.

## Why it doesn't match the studio name

"Twilight Ember" suggests dusk, a warm glow, and embers rising against a darkening sky: deep indigo/violet fading into orange and amber, with dark backgrounds where the warm colours glow. The current site does the opposite:

- **Lime green plus royal blue** reads as generic or "tropical". Nothing evokes twilight or fire.
- **A light-grey content panel** on a bright animated gradient is the opposite of a twilight mood. The Fracturepoint art (deep teal-black with glowing cyan crystal) is dark and moody and clashes with the surrounding light UI.
- **There is no studio identity.** The header says "My Game Dev Hub" on every page. The studio name appears only in `<title>`, and it is misspelled on the home page ("TwilighEmberGames").
- **Orange is used only for the "In Development" badge.** The brand's most obvious colour is barely present.

## Proposed direction

### 1. A "twilight + ember" palette (CSS variables)
Replace the hard-coded colours with variables in `:root`, with a dark theme as the default.

| Role | Suggested value | Notes |
|---|---|---|
| Background (twilight) | `#0f0b1e` to `#2a1a4a` vertical gradient | deep indigo to violet, like the sky at dusk |
| Surface / cards | `#1a1330` at ~85% opacity | dark panels instead of `#f4f4f4` |
| Primary accent (ember) | `#ff7a1a` / `#ff9d3a` | buttons, links, active nav, focus rings |
| Highlight (glow) | `#ffc46b` | headings, hover glows |
| Secondary (dusk rose) | `#c2416b` | tags, secondary buttons |
| Text | `#f1e9ff` on dark, `#1b1030` on light | keep contrast at or above WCAG AA (4.5:1) |

Keep the light theme as an option (the toggle already exists), but make it a warm "dawn" cream (`#fff6ea`) rather than plain grey.

### 2. Replace the animated lime/blue gradient with a twilight sky
- A static or very slow gradient (indigo at the top to a warm orange/amber glow at the bottom horizon).
- Optional: a lightweight CSS-only ember effect (small orange dots drifting upward using `@keyframes`, or a few radial-gradients). Respect `prefers-reduced-motion` and turn it off there.
- The current `gradientShift` animation runs continuously on the whole page and adds motion with no meaning behind it.

### 3. Give the studio a visible identity
- Use "Twilight Ember Games" in the header on every page instead of "My Game Dev Hub". Consider making the game title an `<h2>` and the studio name the site-wide header/logo link.
- Design a simple logo mark (an ember or flame over a horizon or crescent) as SVG. Use it as the header logo, the favicon, and the social preview image.
- Add a tagline, e.g. "Forged at dusk. Played at night." (placeholder copy, to be chosen by the owner).
- Fix the `<title>` typo and make titles consistent (`Home | Twilight Ember Games`, `Games | Twilight Ember Games`, and so on).
- Make the footer and copyright say "Twilight Ember Games" (see the bugs below).

### 4. Typography
- Add a display font for headings with some character (e.g. Cinzel, Cormorant, or Rajdhani via Google Fonts, or a self-hosted equivalent). Body text can stay a clean sans (Inter or system-ui).
- The Fracturepoint logo uses a condensed stencil-style face. Picking a heading font that sits well next to it would make the studio site and the game feel like one family.
- Set a real type scale (`clamp()` for headings) and a comfortable line-height for body text.

### 5. Components
- **Header and nav:** a flex layout with the logo on the left, the nav on the right, and the Discord/itch.io buttons and theme toggle grouped together. Highlight the current page in the ember accent, and add a hover underline glow. The nav currently has no active state.
- **Buttons:** one shared `.btn` base style with `.btn-primary` (ember orange), `.btn-secondary` (outline), and `.btn-discord` (brand blurple, kept for recognisability). Right now there are two overlapping systems (`.play-btn` and `.discord-btn`), and the itch.io link reuses the Discord class.
- **Game cards:** dark surface, a subtle ember-coloured border or glow on hover instead of the plain scale, and text colours taken from the theme variables (`.game-info` is hard-coded `color: black`, which is unreadable on a dark card).
- **Tags and badges:** use the dusk-rose or ember palette. Keep "In Development" as an amber badge, since it matches the brand.
- **Game detail page:** full-bleed banner with a gradient fade into the page, feature cards with an ember-tinted border, and SVG icons instead of emoji so the look is consistent across platforms.

### 6. Page content that supports the brand (optional, small)
- Home: a proper hero (logo, tagline, a "Play / Follow Fracturepoint" call to action) instead of "Welcome!".
- About: a short studio story explaining the name.
- Footer: social links (Discord, itch.io), a copyright line, and a link to the privacy/analytics note (the site uses Google Analytics).

## Bugs and inconsistencies found while reviewing

These are not styling opinions and could be fixed independently:

1. **`games/fracturepoint.html` loads `style.css` with a relative path** (`href="style.css"`) from inside `games/`. It resolves to `games/style.css`, which doesn't exist, so the game page is **unstyled**. It should be `../style.css`. Its nav links (`index.html`, `games.html`, `about.html`) have the same problem, since they need `../`.
2. **Unclosed `@media (max-width: 600px)` rule** in `style.css`. The `.game-grid` block inside it is never closed, so `.banner img`, `.game-card`, `.game-img` and `.play-btn` are nested inside `.game-grid`. The `}` after `.play-btn` closes `.game-grid`, and the media query itself stays open to the end of the file. As a result `#theme-toggle`, `.discord-btn`, `.game-detail`, `.banner`, `.feature-grid` and `body.dark` only apply at 600px or narrower, and desktop visitors don't get those styles at all (this includes the dark theme).
3. **Typo in the transition:** `box-shadow 0.3s eaase` in `.game-card` (should be `ease`), which invalidates the whole `transition` declaration, so the hover transition doesn't animate.
4. **`<script>` and comment placed between `</head>` and `<body>`** on every page (the Google Analytics snippet). It should go inside `<head>`.
5. **Copyright is inconsistent:** `about.html` and `index.html` say "Josiah Diestler", `games.html` says "Your Name", and the year is hard-coded to 2025.
6. **Placeholder links:** `games.html` "Play / Learn More" points to `https://yourgame-link.com`, and `games/fracturepoint.html` uses `https://discord.gg/YOURINVITE` twice. The real invite is `https://discord.gg/QC223aD9S4` and the itch.io page is `https://twilight-ember-games.itch.io/fracturepoint`.
7. **The theme toggle exists only on `index.html`** (`about.html`, `games.html` and the game page have neither the button nor the script), and the stored theme isn't applied on those pages. Move the toggle into a shared script (`theme.js`) and load it everywhere.
8. **The dark theme only changes variables that are barely used.** `header`, `nav`, `footer` and the gradient are hard-coded, and `.game-info` is `color: black`. Most of the page looks the same in both modes.
9. **The `#theme-toggle` is `position: absolute`** with `color: var(--text-color)`, which sits on a `#222` header, so it is dark-on-dark in light mode.
10. **Accessibility:** the game card image alt text is "Screenshot of Game" (it is actually the logo), the banner alt is "Fracturepoint Banner test", `target="_blank"` links lack `rel="noopener"`, and there is no visible focus style.
11. **Duplicated markup:** the header, nav, footer and analytics snippet are copy-pasted into every page. Consider a small build step or an include mechanism if the site grows. This is out of scope for a styling pass.
12. **`images/test.txt`** is a leftover placeholder file.

## Suggested order of work

1. Fix the bugs in items 1 to 4 above (a quick win that makes the site render properly).
2. Introduce the CSS variable palette and dark-by-default twilight background (sections 1 and 2).
3. Header/branding: studio name, logo/favicon, title fixes (section 3).
4. Typography and component polish (sections 4 and 5).
5. Content pass (section 6).

## Open questions for the owner

- Is the studio brand meant to be dark and warm (twilight/ember), or should the site keep a lighter, friendlier feel?
- Is there a studio logo, or should one be designed? Should the Fracturepoint palette (teal/cyan) be a per-game accent on top of the studio's ember palette?
- Is there a preferred font or tagline?
