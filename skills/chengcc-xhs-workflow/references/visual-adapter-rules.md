# Visual Adapter Rules for 澄Cc

These rules adapt a generic Xiaohongshu visual director to the 澄Cc brand.
Use them together with `visual-system-v2.md`. The V2 file defines the
executable engine; this file defines the 澄Cc-specific look, IP, palette, and
avoid list.

## Visual System V2 Operating Rule

Before writing Image 2 prompts, convert the post into:

1. Content input: raw content, source type, context, time, related people, sensitivity.
2. Meaning layer: core event, user problem, hidden emotion, key conflict, insight.
3. Emotion layer: one primary type from `clarity`, `confusion`, `anxiety`, `reflection`, `calm`, `tension`, plus intensity 1-5.
4. Layout engine: each page gets `[HEADER]`, `[MAIN]`, `[SIDE]`, `[FOOTER]` zones and a layout type from `HERO`, `GRID`, `SPLIT`, `EDITORIAL`.
5. Editorial prompt: magazine-like hierarchy, one primary visual subject, high whitespace ratio, controlled density, and no generic social-template look.
6. Validation: reject flat hierarchy, equal-weight elements, random decoration, unreadable Chinese, fake screenshots, or inner pages that look like another cover.

Default page roles:

- P1 `Editorial Cover`: strong title, main visual, high-contrast whitespace.
- P2 `Emotion Page`: raw state and visible behavior.
- P3 `System Page`: AI / reflection / method, modular and readable.
- P4 `Insight Page`: AI evidence, screenshot frame, small action, or light conclusion.

The goal is a computable magazine editing system, not decorative image prompts.

## Use This Direction

- Default to Style B: young lifestyle-aesthetic magazine cover, abstract, trendy, healing, premium, dopamine but controlled.
- Current Style B cover default: trend magazine poster cover, white-space heavy, Chinese oversized typography as the primary visual, editorial annotations and numbering as secondary atmosphere.
- Rhythm rule: Page 1 is the high-impact cover. Pages 2-4 are explanatory reading pages; reduce headline scale and prioritize content visualization.
- Current Style B inner-page default: MUJI-like warm-white whitespace + Japanese lifestyle magazine order + healing small scenario illustration. Inner pages should be cleaner, whiter, and more scene-driven than the earlier retro-brown tests.
- V2 hierarchy rule: every page must first define what the reader sees first, second, and third. If two elements compete for first attention, downscale or remove one.
- Separate the roles: page 1 is a poster cover with an exaggerated Chinese hook and a small orange-IP scene; pages 2-4 are illustration-led reading pages with smaller titles, quote cards / pop-up text, and life-like mini scenes.
- Use Style A only for strong-emotion topics: Gen-Z emotional sticker poster, higher impact, street sticker collage.
- Warm cream / light beige background.
- Yellow, orange, light orange, and warm white as the core palette.
- Electric blue and mint green as controlled accents.
- Original anthropomorphic orange IP only: round orange, leaf, blush, thick black outline.
- Moon, stars, plants, and graffiti strokes as optional supporting motifs.
- Abstract color fields, bento-box composition, independent magazine cover feeling.
- Typography must look designed: custom editorial Chinese display lettering for Style B; hand-lettered sticker typography for Style A.
- Clear mobile hierarchy: one biggest sentence, one smaller support sentence, one optional rounded info box.

## Style Route

### Style B: Default

Use for most posts.

- young lifestyle-aesthetic magazine
- trend magazine poster cover
- Japanese / lifestyle editorial page order: large whitespace, one dominant subject, strict alignment, sparse microcopy, corner numbering
- MUJI-like warm-white whitespace: airy, premium, low-noise, not cold white, not heavy retro brown
- white / warm-cream negative space
- oversized Chinese headline as first visual focus
- creative typography, diagonal / offset / circled / underlined emphasis
- small English editorial notes, numbering, arrows, and blue hand-drawn marks as atmosphere only
- abstract color fields
- bento-box / editorial composition
- small narrative illustration scenes: album spread, chat-record booklet, sticky notes, tape, photos, phone, notebook, AI screenshot, and blue doodle arrows
- complete small scenario illustrations for inner pages: an orange IP at a desk, browsing chat, checking a design draft, asking AI, relaxing with a game, or doing another concrete action tied to the topic
- premium but still Gen-Z
- dopamine palette, controlled saturation
- generous whitespace
- orange IP small and secondary

Reference absorption rules:

- Learn the editorial order, not the exact magazine image, people, outfits, layout, or copy.
- Use one primary visual subject per page: screenshot, album spread, chat-record stack, orange-IP action, or one information structure.
- Prefer small narrative illustration scenes for inner pages when the post is about emotion: show the action, not only the concept.
- Inner-page illustrations should feel like one lived-in moment, not a scattered sticker board. Cluster important props around the main scene: orange IP + 2-4 necessary props + one quote / pop-up / sticky-note text object.
- Treat whitespace as design. Do not fill empty space with stickers, arrows, icons, or extra text just to make the page look rich.
- Microcopy, English labels, page numbers, circles, and arrows are atmosphere and navigation only; they must not become visual noise.
- Align information blocks strictly: number, title, and body text should share a clear baseline / column logic.
- Labels must not cover screenshot text; orange IP must not cover card text.
- If multiple elements compete for first attention, delete or downscale elements before adding decoration.

### Style A: Strong-Emotion Backup

Use only when the topic has a strong emotional hook.

- Gen-Z emotional sticker poster
- hand-lettered sticker typography
- street collage feeling
- bigger emotional keyword
- higher visual impact
- do not overuse, or the account becomes noisy

## Avoid This Direction

- Black-heavy tech magazine.
- Cold AI dashboard.
- Glassmorphism as the default style.
- Neon cyberpunk.
- Purple-blue gradients.
- Smooth generic AI icons.
- Any mascot or character that is not the original orange IP.
- Large orange mascot competing with the title.
- Overly premium lifestyle photography.
- Dense consulting-slide layout.
- Feminine pastel overload.
- Pages where every text block has the same visual weight.
- System-font title or PPT-like typography.
- Too many decorative elements that make the page noisy.

## Page Design

Core hierarchy:

- Treat page 1 as a poster cover.
- Treat pages 2-4 as editorial reading pages.
- The cover earns the tap; the inner pages carry the explanation.
- Inner-page creativity should come from composition, whitespace, small illustrations, cards, annotations, and evidence frames, not from making every headline huge.

Cover:

- One oversized Chinese emotional sentence as the first visual.
- One deeper support sentence, smaller and clearly secondary.
- Editorial notes / number / English microcopy are allowed, but only as atmosphere.
- One small orange IP visual anchor.
- No more than 3 text levels.
- Title must be readable at feed size.

Inner pages:

- One idea per page.
- Short sentences.
- Headline size must be clearly smaller than the cover, usually 8%-18% of the page height.
- The headline is navigation, not the main visual object.
- Use content visualization before typographic impact: full small scenario illustrations, album cards, chat bubbles, sticky notes, timelines, quote cards, real screenshot frames, or orange-IP actions.
- Main information must be Chinese: inner-page headline, subtitle, speech bubbles, quote cards, and key OS text. English is allowed only as tiny decorative atmosphere and must not carry meaning.
- Orange IP may demonstrate the page action, such as browsing an album, reading chat records, holding a phone, or asking AI, but it must not become the main subject.
- Keep the same visual DNA as the cover: warm white space, black type, one orange emphasis, small blue hand-drawn marks, editorial numbering.
- Visible hierarchy: main point, small note, optional example.
- Include real-scene details instead of abstract slogans.
- Use big/small contrast; do not scatter equal-weight text around the page.
- Preserve roughly 25%-40% whitespace.
- Prefer one content object as the page center: a photo-album strip, chat record stack, two-column distinction, memo card, or real AI screenshot frame.
- For scene-led inner pages, prefer one complete illustrated scene as the center: for example, a designer desk feedback scene with laptop, design draft, group chat window, low-battery orange IP, color swatches, and one quote card. Keep all important items in one cluster.
- Reject and regenerate if an inner page looks like another cover, has a headline visually equal to the cover, or fills the page with same-weight text.
- Reject and revise if any icon, label, sticker, or mascot overlaps readable text or breaks alignment.

Default inner-page logic for emotion/reflection posts:

- Page 2: behavior scene. Example: the original orange IP browsing albums or old chat records; 2-3 small notes explain the feeling.
- Page 3: reframe page. Example: two clean information blocks such as "I thought / Actually" or "old evidence / current need"; quietly embeds the method without sounding like a lecture.
- Page 4: AI evidence page. The real AI chat screenshot or a blank screenshot frame is the main object; headline stays small and the margin notes explain what AI helped separate.

## Orange IP System

The original orange IP is the creator's emotional representative.

- Keep one recognizable design: round orange body, green leaf, thick black outline, simple face, orange blush, warm but not overly childish.
- Use action and expression variations to express the creator's state: browsing albums, reading chat records, holding a phone, staring blankly, lying low-battery on a desk, taking notes, hiding in a moon, holding a star, thinking, relaxing.
- Expressions may vary: happy, confused, emo, relieved, serious note-taking, low-battery, healed.
- In inner pages the orange acts as a small actor inside the scene, normally 10%-20% of the canvas. It should not block text or become a second headline.

## Small Illustration System

For emotion posts, page 2 from the night-emo post is the preferred format logic, not a fixed subject.

- Build a life-like mini scene instead of one flat icon.
- Fixed method: translate the abstract emotion into one visible action / scene.
- Variable props: album, chat records, sticky notes, phone, laptop, desk, bed, subway, calendar, book, mirror, AI screenshot, etc. Choose props from the topic.
- Current preferred inner-page format: complete small scenario illustration + one Chinese quote/pop-up/sticky-note text object + 1-2 short Chinese OS lines. This is more important than decorative microcopy.
- First infer the core emotion: wronged, anxious, disappointed, low-battery, conflicted, relieved, healed, restarting.
- Then choose the matching orange-IP action: browsing, staring, holding, hiding, pausing, writing, handing to AI, separating, letting go, catching oneself, rebooting.
- The illustration shows the action; the text states the discovery.
- Keep whitespace and hierarchy. Rich illustration is allowed, clutter is not.

Emotion-to-action references:

- nostalgia / looking for proof: browsing albums, reading chat records, holding old photos.
- anxiety / overthinking: orange tangled in a line, staring at phone, lying low-battery on desk.
- hurt / stung by one sentence: orange holding a small note, hiding in the moon, worried expression.
- self-doubt: orange looking at mirror, holding magnifier, question-mark sticky notes.
- relief: orange putting phone down, breathing out, leaning on the moon.
- relaxation / after-work buffer: orange wearing headphones, playing games with friends online, sitting at a desk with a drink and screen; keep the inner-page title small and let the scene carry the feeling.
- AI reflection: orange handing a tangled line to AI, splitting notes into fact / thought / next step.

Ending page:

- One small action or AI answer.
- Optional real AI chat screenshot frame.
- Soft comment CTA.

## Image 2 Default

Use Codex image generation / Image 2 by default for complete final cards after the Chinese card copy is confirmed.

Generate:

- four 3:4 Xiaohongshu image-text cards by default
- Chinese card text baked into the generated design
- one small original orange IP per page when useful
- a blank rounded frame if a real AI chat screenshot needs to be inserted

Avoid generating:

- Chinese text before final copy is confirmed
- fake app UI that looks like an AI product ad
- overly smooth stock illustrations
- glossy 3D icons unless the user explicitly asks for them
- other IPs, people, animals, borrowed characters, or multi-character mascot groups

If the user changes card text after generation, regenerate that card. Do not patch text afterward unless the user explicitly asks for an editable design-layer version.

## Color

Suggested palette:

- Cream paper: `#FFF7EC`
- Main orange: `#F08A24`
- Light orange: `#FFD19A`
- Deep orange: `#C86412`
- Ink brown: `#29231E`
- Warm gray: `#766B60`
- Accent blue: use sparingly for graffiti marks and neutral balance.

## Visual Review

Reject the design if:

- It looks like an AI tool ad.
- It could be any growth account.
- It feels like a teacher lecturing.
- Orange dominates so much that it becomes noisy.
- The page is pretty but the message is not clear.
- The picture text duplicates the body copy with no added value.
- Visual hierarchy is flat and the reader cannot tell where to look first.
- Inner pages look like another cover instead of a reading/explanation page.
- Inner-page headline is larger than or visually equal to the cover headline.
- Style A is used for an ordinary topic without strong emotional need.
- Style B becomes too plain and loses young visual impact.
