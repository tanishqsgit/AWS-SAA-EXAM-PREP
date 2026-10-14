# SAA Study Studio

A local-first AWS Solutions Architect Associate study app, available as a Windows desktop application and a React/TypeScript localhost project. Local email-and-password profiles keep each learner's progress separate. No OTP, cloud account, runtime AI service, or shared login backend is needed.

## Download the Windows app

Open [GitHub Releases](https://github.com/tanishqsgit/AWS-SAA-EXAM-PREP/releases/latest) and download **AWS-SAA-Study-Studio-Setup-1.1.2.exe** for installation, or **AWS-SAA-Study-Studio-Portable-1.1.2.exe** to launch without an installer. Builds target Windows x64. The executable includes Electron's runtime, the app, all ten papers, and the complete study course. Users do not need Node.js, npm, Docker, or a localhost server. Internet is needed to download it and open external AWS sources, not to sign in or study.

These builds are unsigned because this project has no code-signing certificate. Windows can display a publisher or SmartScreen warning. Download only from this repository's Releases page; `SHA256SUMS.txt` contains build checksums. Installing updates preserves the local profile store; export before moving machines or deleting app data.

### Local accounts

- Use **Create profile** once per email on this installation, then **Sign in** with that email and password. Case and surrounding spaces are normalized; duplicate registration is rejected.
- Passwords use salted PBKDF2-SHA-256 hashing with 600,000 iterations. Passwords and account hashes are excluded from progress exports. Local study progress is not encrypted.
- Accounts stay local and do not verify email ownership or sync between devices. There is no email password recovery. Anyone can create their own profile with a different email; this is not global account uniqueness.
- The first profile created in the web app claims its previous unassigned progress. Desktop and browser storage are separate: use progress export/import to move between them. Later profiles start independently.
- Refresh preserves the current tab's sign-in. Closing the desktop application requires signing in again; timed deadlines continue while signed out or closed.
- Desktop data is stored under `%APPDATA%/saa-study-studio`, outside the installed program files. Browser data remains specific to the origin and browser profile. An uninstall preserves app data unless you remove it yourself.

### Build the desktop application

```powershell
npm install
npm run desktop:dev
npm run desktop:package
```

The final command creates Setup and Portable executables under `release/`. This folder is ignored by Git: large executable binaries are distributed as GitHub Release assets, while source remains in the repository. A `v*` tag starts the Windows GitHub Actions build, runs unit tests, and uploads the executables and checksums to a release. Manual workflow runs produce a downloadable build artifact.

Run `npm run test:desktop` after `npm run build` for the offline Electron smoke workflow. Set `SAA_PACKAGED_EXECUTABLE` to the `release/win-unpacked/AWS SAA Study Studio.exe` path to run the same test against the packaged runtime. Tests use isolated temporary profile storage.

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


