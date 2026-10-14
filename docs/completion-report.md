# Delivery report

Completed locally on 13 October 2026. Source directory: `D:\AWS SAA EXAM SIMLULATOR`. Development URL: `http://127.0.0.1:5173`.

## Application

React 19, TypeScript, Vite, Tailwind CSS, IndexedDB via idb, Zod import validation, Vitest, and Playwright. Charts use CSS and semantic buttons without adding a chart library. The application has no authentication, paid service, cloud backend, runtime AI dependency, CDN assets, or remote font dependency.

The delivered screens cover the dashboard, ten timed papers, untimed filtered quizzes, result reviews, notes/bookmarks, configurable 21-day plan, printable paper/answer-key library, source transparency, JSON export/import, and confirmed reset. Historical timed attempts include complete question snapshots. First-attempt analytics exclude retakes and untimed quizzes. Multiple-response scoring uses exact set equality.

## Content

- Verified current official version: SAA-C03, dated 2026-10-13.
- 10 fixed paper files, each with 65 questions; 650 unique IDs and unique normalized scenario strings.
- Every paper: 50 simulated scored questions, allocated Secure 15 / Resilient 13 / High-performing 12 / Cost-optimised 10.
- Every paper: 15 simulated unscored questions, allocated 4 / 4 / 4 / 3.
- Every paper: 8 multiple-answer questions, a stated simulation choice rather than an official ratio.
- 650 structural checks passed; 650 source capability comparisons recorded; 0 unresolved flagged questions in the checked-in bank.
- Source comparison, schema validation, and AI editorial review are distinct metadata fields. The source ledger preserves official URLs, resolved URLs, retrieval date, and retrieval status. The review record explains assumption clarifications and technical distinctions.

Shared architecture option sets and repeated concepts are intentional. Lexical similarity screening has no unresolved candidates at its documented threshold, but cannot prove semantic uniqueness. No human review, empirical item calibration, equal official difficulty, or AWS endorsement is claimed. Difficulty labels are estimates. Scores are raw learning results, never fabricated AWS scaled scores or official passing interpretations.

## Verification

- `npm test`: 9 Vitest tests pass, including all 650 question schemas, allocations, selections, scoring, deadlines, retake separation, and valid/invalid imports.
- `npm run test:e2e`: 5 Chromium workflows pass for answer/flag/navigation/refresh/resume/submit/review/dashboard, expiry, restoration after an expired deadline, practice/notes/bookmarks/export/import, and mobile schedule warnings plus hostile import rejection.
- Production offline Playwright test passes for cached reload with all-bank navigation and an active saved answer.
- Desktop and mobile screenshots inspected. No JavaScript errors or mobile horizontal overflow observed during inspection.
- `npm run build` passes. The full offline question bank deliberately produces a roughly 2.55 MB JavaScript bundle, around 399 KB gzip; Vite reports its size warning. It is loaded once and cached in production.
- `npm audit`: no reported vulnerabilities at delivery.

## Limits

Browser origin/profile storage must remain available; use JSON export for backups. Maintain the same hostname and port to access the same storage. One active browser tab is supported to prevent competing writes. Deadline accuracy relies on a correct system clock. Individual-question time is approximate visible time, while total exam time uses the absolute deadline. Official documentation links need internet, although development source snapshots are available locally.

The production service worker was corrected to handle static preview-server `Vary: Origin` headers, and the offline restore test verifies that fix. The application has independent study-interface behavior and does not reproduce Pearson VUE examination security.
