# SAA Study Studio

A localhost, local-first React/TypeScript application for a 21-day AWS Solutions Architect Associate study programme. No account, deployment, runtime AI service, or cloud backend is needed.

## Run

In this directory:

```powershell
npm install
npm run dev
```

Open the localhost URL printed by Vite, normally **http://127.0.0.1:5173**. Keep the same hostname and port to access the same browser IndexedDB storage. Data is browser-profile specific. Clearing site data clears local progress; export regularly using **Data & sources**.

```powershell
npm test
npm run build
```

For browser tests:

```powershell
npx playwright install chromium
npm run test:e2e
```

For a production preview:

```powershell
npm run preview
```

The production build has a service worker. Visit once successfully on the preview origin, allow installation to complete, and subsequent reloads on that origin work offline. Running Vite locally also needs no internet after dependencies are installed. AWS source links need internet; retrieved source text is preserved under `docs/sources/` for development review. No fonts, images, API services, or CDN dependencies are fetched by the app.

## Implemented

**Study course** includes 32 ordered chapters and 96 topics from computing and cloud fundamentals through complete architecture decisions and specialist service selection. Every topic has a learning objective, detailed explanation, an expandable **Explain it simply** story, explicit AWS mapping and analogy limitation, a worked example, common mistakes, and revision takeaways. A searchable 46-term glossary explains unfamiliar words. Topic completion, notes, last reading position, and chapter-test drafts/results are stored locally and included in JSON portability.

Every chapter has a test: 252 authored concept/service checks cover all 96 topics, and 66 labelled applied scenarios from the existing bank reinforce architecture decisions (318 total chapter-test questions). Answers remain hidden until submission; results explain all options and link official references. Scores are separate from timed first-attempt analytics. New chapter attempts preserve question snapshots for historical review; original chapter IDs, answer ordering, notes and first-version drafts are preserved. The existing 650-paper-question bank is unchanged.

Open **Exam coverage checklist & service atlas** inside Study course for mappings of all 14 official task statements, 13 published concept groups, and 118 distinct in-scope service names. The atlas offers a purpose, selection scenario, boundary, example, linked simple story/full lesson, and informal recognition MCQ for each service. Core, overview and guide-listed legacy depth labels are explicit. These quick atlas checks reset when leaving the course; chapter tests and reading progress persist. AWS describes its guide as non-exhaustive: mapped scope does not mean every possible feature or exam question is covered.

Course content version: `2026.10.14-v2`. All 161 distinct chapter reference pages were retrieved, and capabilities were compared by AI on 14 October 2026; the original paper-bank verification record remains dated 13 October. Structural validation, source retrieval and AI editorial review are separate records. See `docs/course-status.json`, `docs/course-coverage.json`, `docs/expanded-course-source-ledger.json`, `docs/atlas-source-ledger.json`, and `docs/expanded-course-review.md`. This is original AI-authored teaching material with no human expert review or guaranteed certification outcome. Legacy availability warnings are visible for Elastic Transcoder, Snow Family, and VMware Cloud on AWS.

- Ten fixed papers of 65 original scenario questions, saved in ten batches. Every paper has exactly 50 simulated scored questions allocated 15/13/12/10 and 15 simulated unscored questions allocated 4/4/4/3. Scored status is hidden during timed attempts; positions and option orders are deterministic.
- Each paper has 8 multiple-response questions. This ratio is our simulation choice. Difficulty labels are editorial, and these papers have no official or psychometrically calibrated equivalence.
- Timed attempts use a persisted absolute deadline and continue while hidden or closed. Expired attempts finalize on reopening. Answers, position, flags, and approximate visible-question timings persist in IndexedDB. One active browser tab is supported to prevent competing writes.
- Single answers and multiple answers use exact-set scoring, with no partial credit or negative marking. Results separate raw scored accuracy from learning accuracy, show domain/topic sample counts, and unlock full option explanations and official sources.
- Untimed practice supports domain/topic/difficulty and missed/flagged/bookmarked filters, short quizzes, immediate explanations, notes, bookmarks, and incorrect retries. Practice quiz history is separate from timed trends.
- Dashboard trends and revision heuristics use first timed attempts only. Retakes stay in history and cannot improve the first-attempt trend. A practice target or raw accuracy is not an official pass prediction.
- Configurable 21-day plan with mock days 1,3,5,7,9,11,13,15,17,19; daily-time warnings; optional exercises; days 20–21 focused on recurring mistakes and short quizzes.
- Validated JSON import/export, explicit replacement/reset confirmation, historical question snapshots, print-friendly papers and separate answer keys, responsive layouts, labelled controls, keyboard navigation, and visible focus.

## Verified blueprint and content status

**SAA-C03**, verified **13 October 2026** against the [official certification page](https://aws.amazon.com/certification/certified-solutions-architect-associate/) and [current official exam guide](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html). `docs/blueprint.json` records the original and resolved guide URLs, date, format, and weights.

The checked-in bank contains **650 generated, 650 structurally validated, 650 source-checked, 0 unresolved flagged questions**. Each question has stable identifiers, domain/task mapping, service tags, editorial difficulty, type/selection count, option explanations, clues, trade-off, takeaway, references, and separate schema/source/editorial metadata.

Source checks compare stated service capabilities against retrieved official AWS pages. They do not mean AWS endorsed the content or a human expert reviewed it. Review records are AI editorial review. Source retrieval alone is distinct from technical review. Shared option designs recur to reinforce architecture concepts. The lexical duplicate screen verifies unique text and screens close wording; it cannot establish semantic uniqueness or calibrated equivalence. See `docs/bank-status.json`, `docs/source-ledger.json`, and `docs/editorial-review.md`.

AWS uses scaled scoring. This application deliberately reports no invented AWS scaled score and does not translate a raw percentage into an official passing standard.

## Bank maintenance

The authored question families are in `scripts/secure.mjs`, `resilient.mjs`, `performance.mjs`, and `cost.mjs`. They contain individually written scenarios and decision keys. `scripts/catalog.mjs` records task statements and official source URLs.

Generate a single saved batch after review:

```powershell
node scripts/generate-bank.mjs 1
npm run bank:validate
```

Valid batch numbers are 1–10. Regenerating reads the saved source ledger. Retrieval failures are labelled unverified rather than source checked. A question with `validation.editorial: "flagged"` is excluded from normal papers; a paper is unavailable until it again has 65 eligible questions. Bump the bank version for future content changes. Historical attempts retain their original question snapshots.

## Practical limits

This is an independent study application, without Pearson VUE security controls. Browser code contains the local learning bank, while the timed interface hides keys and explanations until submission. Per-question time is approximate visible time; total exam time is determined by the deadline. The operating-system clock should remain correct. Browser storage failure is displayed, and exporting provides a portable backup.

The 650-question bank is compact, AI-authored teaching content, not official exam content, dumps, recalled questions, or a copied commercial bank. A human instructor should independently review it before using it as a formal assessment. No calibrated difficulty, validated pass probability, or official examination equivalence is claimed.
