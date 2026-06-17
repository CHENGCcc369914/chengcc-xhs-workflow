# Visual Adapter Rules for 澄Cc

These rules adapt a generic Xiaohongshu visual director to the 澄Cc brand.
Use them together with `visual-system-v2.md`. The V2 file defines the
executable engine; this file defines the 澄Cc-specific look, IP, palette, and
avoid list.
Use `chengcc-ip-extension-rules.md` whenever a ChengCc character, action sticker,
expression sticker, outfit variation, or small scene is needed.
For final ChengCc avatar/IP illustrations, also read the current V2.0 source:
`/Users/ccc/Library/Mobile Documents/iCloud~md~obsidian/Documents/CC-Obsidian/橙Cc 个人IP视觉体系规范2.0.md`.
For outfit design density, also use the current clothing asset reference:
`/Users/ccc/Pictures/小红书运营图片/橙Cc-IP服装资产参考-v0.1/01-橙Cc-IP服装资产标准参考-v0.1.png`.

## Visual System V2 Operating Rule

Before writing Image 2 prompts, convert the post into:

1. Content input: raw content, source type, context, time, related people, sensitivity.
2. Meaning layer: core event, user problem, hidden emotion, key conflict, insight.
3. Emotion layer: one primary type from `clarity`, `confusion`, `anxiety`, `reflection`, `calm`, `tension`, plus intensity 1-5.
4. Layout engine: each page gets `[HEADER]`, `[MAIN]`, `[SIDE]`, `[FOOTER]` zones and a layout type from `HERO`, `GRID`, `SPLIT`, `EDITORIAL`.
5. Visual prompt: healing hand-drawn IP illustration with editorial hierarchy, one primary visual subject, warm whitespace, controlled density, and no generic social-template look.
6. Validation: reject flat hierarchy, equal-weight elements, random decoration, unreadable Chinese, fake screenshots, or inner pages that look like another cover.

Default page roles:

- P1 `Healing Cover`: strong title, main visual, high-contrast warm whitespace.
- P2 `Emotion Page`: raw state and visible behavior.
- P3 `System Page`: AI / reflection / method, modular and readable.
- P4 `Insight Page`: AI evidence, screenshot frame, small action, or light conclusion.

The goal is a computable Xiaohongshu illustration layout system, not decorative image prompts.

## Use This Direction

- Default to Style B: XHS-friendly healing hand-drawn IP illustration system. It should feel fun, warm, therapeutic, and young, while still having clean hierarchy and design sense.
- Current Style B cover default: warm paper / cream background, large readable Chinese title, one ChengCc-avatar emotional action scene as the visual hook, playful hand-drawn marks as secondary atmosphere.
- Rhythm rule: Page 1 is the high-impact cover. Pages 2-4 are explanatory reading pages; reduce headline scale and prioritize content visualization.
- Current Style B inner-page default: healing hand-drawn scenario illustration + warm whitespace + clear card text. Inner pages should be warmer, more human, more fun, and more XHS-save-friendly than strict magazine tests.
- V2 hierarchy rule: every page must first define what the reader sees first, second, and third. If two elements compete for first attention, downscale or remove one.
- Separate the roles: page 1 is a poster cover with an exaggerated Chinese hook and a small ChengCc avatar scene; pages 2-4 are illustration-led reading pages with smaller titles, quote cards / pop-up text, and life-like mini scenes.
- Use Style C only when the user explicitly wants the Japanese Editorial Magazine System / fashion lookbook / high-end typography route.
- Use Style A only for strong-emotion topics: Gen-Z emotional sticker poster, higher impact, street sticker collage.
- Warm cream / light beige background.
- Yellow, orange, light orange, and warm white as the core palette.
- Electric blue and mint green as controlled accents.
- ChengCc Standard Avatar IP by default: healing hand-drawn young male designer IP, same face/hair/proportion, orange `C` necklace, orange/C/orange-fruit outfit system, and ChengCc/Cc/Ccc marks as memory symbols.
- Standard avatar is an identity reference, not a pose template. For final Xiaohongshu cards, do not default to previously generated standing/sitting/phone poses. Recreate the avatar's action, expression, body posture, outfit, props, and scene from the page topic and emotional meaning.
- ChengCc outfits are a scene-variable original clothing asset system, not simple outfit changes. When the avatar appears, the clothing should carry design density through orange elements, C-shaped structure, citrus texture, retro loose silhouettes, pockets, drawstrings, patches, small bags, hats, shoes, or pajamas details.
- Legacy orange fruit mascot is not the default. Use it only if the user explicitly asks for the old mascot route.
- Moon, stars, plants, and graffiti strokes as optional supporting motifs.
- Small C-shaped symbols, orange icon, orange slice, C-shaped moon, ChengCc/Cc/Ccc marks, optional orange phone, subtle stars, plants, note paper, chat bubbles, and low-pressure doodle marks as reusable visual memory.
- Typography must look designed but soft: rounded display Chinese / hand-drawn printed lettering for Style B; high-end editorial Chinese display lettering for Style C; hand-lettered sticker typography for Style A.
- Clear mobile hierarchy: one biggest sentence, one smaller support sentence, one optional rounded info box.

## Style Route

### Style B: Default Healing Hand-Drawn IP System

Use for most posts.

- XHS-friendly healing illustration, not a cold information-design poster.
- Warm ivory / light beige paper texture, soft grain, gentle handmade temperature.
- Hand-drawn young designer IP scene as the emotional anchor: the ChengCc avatar performs one page-specific action with a clear expression.
- The avatar remains the same person, but can become more illustration-like and softer in card scenes if identity locks stay intact.
- Clothing follows the ChengCc clothing asset reference: orange/C/citrus motifs should be integrated into the garment structure, not pasted as a random logo. Use cream, khaki, olive green, and controlled electric blue around the orange recognition color.
- Big readable Chinese title on P1; smaller, friendly, rounded Chinese text on inner pages.
- Soft therapeutic palette: orange, warm yellow, cream, beige, warm gray, with a small cobalt/electric-blue accent for freshness.
- Playful but not childish: doodle arrows, small C-shaped marks, handwritten labels, note paper, small stars/plants, low-pressure texture.
- Complete small scenario illustrations for inner pages: desk, phone, screenshot frame, chat bubbles, design draft, subway, bed, notebook, AI screenshot, photos, coffee, or other props chosen from the topic.
- One page = one scene / one action / one sentence. The illustration shows the behavior; text states the discovery.
- High whitespace remains, but it should feel warm and breathable rather than strict fashion-magazine coldness.
- ChengCc avatar can be the main emotional actor on P2/P3 when the page needs a scene, but must not block text or flatten hierarchy.

Reference absorption rules:

- Learn the warmth and character-sheet discipline from the reference, not its logos, labels, exact outfit, or layout.
- Learn the clothing-design density from the ChengCc outfit asset reference: original orange/C/citrus clothing, layered retro styling, and clean healing life-aesthetic details. Do not simplify the character into a normal T-shirt-and-pants figure.
- Use one primary visual subject per page: ChengCc-avatar action, screenshot, album spread, chat-record stack, or one information structure.
- Prefer small narrative illustration scenes for inner pages when the post is about emotion: show the action, not only the concept.
- Inner-page illustrations should feel like one lived-in moment, not a scattered sticker board. Cluster important props around the main scene: ChengCc avatar + 2-4 necessary props + one quote / pop-up / sticky-note text object.
- Avatar scenes must be concept-led: first decide what the page wants the character to be doing, then generate the action. The standard IP locks likeness, but the pose should be newly designed for that page's title, conflict, and emotional beat.
- Treat whitespace as design. Do not fill empty space with stickers, arrows, icons, or extra text just to make the page look rich.
- Microcopy, English labels, page numbers, circles, and arrows are atmosphere and navigation only; they must not become visual noise.
- Align information blocks strictly: number, title, and body text should share a clear baseline / column logic.
- Labels must not cover screenshot text; ChengCc avatar must not cover card text.
- If multiple elements compete for first attention, delete or downscale elements before adding decoration.

### Style C: Japanese Editorial Magazine Backup

Use only when the user explicitly asks for a high-end magazine, fashion lookbook,
or typography-led route. This is no longer the default Xiaohongshu card style.

- Japanese editorial magazine layout
- high-end fashion editorial system
- strict grid, strong typography hierarchy, high white-space ratio
- cut-out fashion / avatar collage as visual anchor
- controlled orange / blue accent
- no sticker style, no scrapbook chaos

Keep the same content hierarchy, but do not use Style C just because the prompt
mentions "design sense"; the current XHS default is Style B healing hand-drawn IP.

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
- Strict Japanese editorial magazine as the default for ordinary XHS emotion posts.
- ARRI / template logos, copied character-sheet labels, or any reference-image branding.
- Glassmorphism as the default style.
- Neon cyberpunk.
- Purple-blue gradients.
- Smooth generic AI icons.
- Any mascot or character that is not the ChengCc standard avatar IP, unless the creator has explicitly replaced the IP system.
- Large mascot or avatar competing with the title.
- Generic 3D boy that loses Cc's face, hair, earrings, eye ring, orange `C` necklace, or orange/C/orange-fruit outfit system.
- Overly premium lifestyle photography.
- Dense consulting-slide layout.
- Feminine pastel overload.
- Pages where every text block has the same visual weight.
- System-font title or PPT-like typography.
- Too many decorative elements that make the page noisy.

## Page Design

Core hierarchy:

- Treat page 1 as a healing illustration cover.
- Treat pages 2-4 as warm illustration reading pages.
- The cover earns the tap; the inner pages carry the explanation.
- Inner-page creativity should come from one clear character action, warm whitespace, small illustrations, cards, annotations, and evidence frames, not from making every headline huge.

Cover:

- One oversized Chinese emotional sentence as the first visual.
- One deeper support sentence, smaller and clearly secondary.
- Tiny notes / number / English microcopy are allowed, but only as atmosphere.
- One small ChengCc avatar visual anchor when a character helps the page.
- No more than 3 text levels.
- Title must be readable at feed size.

Inner pages:

- One idea per page.
- Short sentences.
- Headline size must be clearly smaller than the cover, usually 8%-18% of the page height.
- The headline is navigation, not the main visual object.
- Use content visualization before typographic impact: full small scenario illustrations, album cards, chat bubbles, sticky notes, timelines, quote cards, real screenshot frames, or ChengCc-avatar actions.
- Main information must be Chinese: inner-page headline, subtitle, speech bubbles, quote cards, and key OS text. English is allowed only as tiny decorative atmosphere and must not carry meaning.
- ChengCc avatar may demonstrate the page action, such as browsing an album, reading chat records, holding a phone, wearing headphones, drawing, organizing an inspiration wall, or asking AI, but it must not become the main subject unless the user asks for a sticker-first output.
- Do not simply paste a fixed avatar pose into a finished layout. If the page has a character, the character must be generated or redesigned as a purposeful mini-scene: gesture, gaze, facial expression, prop interaction, and posture should all explain the page's idea.
- Keep the same visual DNA as the cover: warm paper space, black / warm-brown type, one orange emphasis, small blue hand-drawn marks, soft doodle notes.
- Visible hierarchy: main point, small note, optional example.
- Include real-scene details instead of abstract slogans.
- Use big/small contrast; do not scatter equal-weight text around the page.
- Preserve roughly 25%-40% whitespace.
- Prefer one content object as the page center: a photo-album strip, chat record stack, two-column distinction, memo card, or real AI screenshot frame.
- For scene-led inner pages, prefer one complete illustrated scene as the center: for example, a designer desk feedback scene with laptop, design draft, group chat window, low-battery ChengCc avatar, color swatches, and one quote card. Keep all important items in one cluster.
- Reject and regenerate if an inner page looks like another cover, has a headline visually equal to the cover, turns into cold magazine layout by default, or fills the page with same-weight text.
- Reject and revise if any icon, label, sticker, or mascot overlaps readable text or breaks alignment.

Default inner-page logic for emotion/reflection posts:

- Page 2: behavior scene. Example: ChengCc avatar browsing albums or old chat records with a phone, notebook, or desk prop; 2-3 small notes explain the feeling.
- Page 3: reframe page. Example: two clean information blocks such as "I thought / Actually" or "old evidence / current need"; quietly embeds the method without sounding like a lecture.
- Page 4: AI evidence page. The real AI chat screenshot or a blank screenshot frame is the main object; headline stays small and the margin notes explain what AI helped separate.

## ChengCc Standard Avatar IP System

The ChengCc standard avatar is the creator's visual representative.

- Source file: `references/chengcc-ip-extension-rules.md`.
- V2.0 source: `/Users/ccc/Library/Mobile Documents/iCloud~md~obsidian/Documents/CC-Obsidian/橙Cc 个人IP视觉体系规范2.0.md`.
- Clothing asset reference: `/Users/ccc/Pictures/小红书运营图片/橙Cc-IP服装资产参考-v0.1/01-橙Cc-IP服装资产标准参考-v0.1.png`.
- Legacy standard image: `/Users/ccc/Pictures/小红书运营图片/橙Cc-IP标准设定图-v0.1/01-橙Cc-IP标准设定图-三视图-细节-v0.1.png`.
- Keep one recognizable young male designer IP: same face, black loose 4/6 side-part hair, slightly round chin, calm relaxed eyes, subtle blush/freckles, warm Asian skin texture, designer-newcomer proportion.
- Required identity locks: subtle orange iris/pupil ring; left ear exactly two small silver earlobe earrings; right ear exactly one small silver earlobe earring; visible orange `C` necklace in front/half-side views; orange/C/orange-fruit outfit system.
- Outfit quality lock: avoid ordinary basic T-shirts, designless solid-color clothes, random brand-like streetwear, dark punk/skull styling, dirty textures, or plastic AI materials. Each outfit should feel like a ChengCc-specific clothing asset and contain a main clothing memory point plus two local detail points.
- Use action and expression variations to express the creator's state: browsing albums, reading chat records, holding a phone when relevant, staring blankly, sitting low-battery at a desk, taking notes, checking AI, thinking, relaxing, drawing, drinking coffee, organizing an inspiration wall.
- Expressions may vary: confused, slight emo, relieved, serious note-taking, low-battery, healed, guilty, pretending fine, focused.
- In inner pages the avatar acts as a small actor inside the scene, normally 10%-25% of the canvas. It should not block text or become a second headline.
- For sticker or expression-sheet requests, the avatar may become the main subject, but the identity locks still apply.
- The legacy orange fruit mascot can be used only when the user explicitly asks for the old orange-mascot route.

Action-generation rule:

- The standard avatar image locks identity only: face, hair, earrings, eye ring, orange `C` necklace, outfit symbol system, and general proportion.
- For every final post, create new topic-specific avatar actions unless the user explicitly asks to reuse an older action.
- Existing ChengCc avatar assets may be used as layout placeholders or rough previews, but final Image 2 cards should describe the new action directly in the prompt.
- Each action brief should include: page role, body pose, facial expression, hand action, prop interaction, scene object, and the reason this action supports the headline.
- Reject avatar usage when the person looks like a pasted stock figure, repeats a generic standing pose, or fails to express the page's emotional beat.

## Small Illustration System

For emotion posts, the preferred format is a healing hand-drawn mini-scene, not a fixed subject.

- Build a fun, therapeutic, life-like mini scene instead of one flat icon.
- Fixed method: translate the abstract emotion into one visible action / scene.
- Variable props: album, chat records, sticky notes, optional orange phone, laptop, desk, bed, subway, calendar, book, mirror, AI screenshot, orange icon, C-shaped moon, small plant, design draft, tablet, coffee, etc. Choose props from the topic.
- Current preferred inner-page format: complete small scenario illustration + one Chinese quote/pop-up/sticky-note text object + 1-2 short Chinese OS lines. This is more important than decorative microcopy or strict magazine polish.
- First infer the core emotion: wronged, anxious, disappointed, low-battery, conflicted, relieved, healed, restarting.
- Then choose the matching ChengCc-avatar action: browsing, staring, holding phone, pausing, writing, handing a prompt to AI, separating notes, letting go, catching oneself, rebooting.
- The illustration shows the action; the text states the discovery.
- Keep whitespace and hierarchy. Rich illustration is allowed, clutter is not. The page should feel healing and approachable at feed speed.

Emotion-to-action references:

- nostalgia / looking for proof: avatar browsing albums, reading chat records, holding old photos.
- anxiety / overthinking: avatar tangled in a line, staring at a phone or sticky notes, sitting low-battery at desk.
- hurt / stung by one sentence: avatar holding a small note, worried expression, slightly curled posture.
- self-doubt: avatar looking at mirror, holding magnifier, question-mark sticky notes.
- relief: avatar putting the phone or sticky note down, breathing out, leaning back.
- relaxation / after-work buffer: avatar wearing headphones, playing games online, sitting at a desk with a drink and screen; keep the inner-page title small and let the scene carry the feeling.
- AI reflection: avatar handing a tangled line to AI, splitting notes into fact / thought / next step.

Ending page:

- One small action or AI answer.
- Optional real AI chat screenshot frame.
- Soft comment CTA.

## Image 2 Default

Use Codex image generation / Image 2 by default for complete final cards after the Chinese card copy is confirmed.

Generate:

- four 3:4 Xiaohongshu image-text cards by default
- Chinese card text baked into the generated design
- Style B healing hand-drawn IP illustration by default, unless the user explicitly requests Style A or Style C
- ChengCc standard avatar action/sticker/mini-scene when useful, with identity locks from `chengcc-ip-extension-rules.md`
- fresh page-specific avatar actions for final cards; do not reuse old avatar poses by default
- a blank rounded frame if a real AI chat screenshot needs to be inserted

Avoid generating:

- Chinese text before final copy is confirmed
- fake app UI that looks like an AI product ad
- overly smooth stock illustrations
- overly strict fashion-editorial magazine pages as the default
- glossy 3D icons unless the user explicitly asks for them
- other IPs, people, animals, borrowed characters, or multi-character mascot groups
- generic 3D boys that do not match ChengCc's face/hair/earring/eye/C-necklace/outfit-symbol locks
- plain basic outfits that lose the ChengCc clothing asset system
- old orange fruit mascot as the default character system

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
- It feels like a cold magazine exercise instead of a warm XHS healing post.
- Orange dominates so much that it becomes noisy.
- The page is pretty but the message is not clear.
- The picture text duplicates the body copy with no added value.
- Visual hierarchy is flat and the reader cannot tell where to look first.
- Inner pages look like another cover instead of a reading/explanation page.
- Inner-page headline is larger than or visually equal to the cover headline.
- Style A is used for an ordinary topic without strong emotional need.
- Style B becomes too plain, too cold, or loses healing / fun / young visual impact.
