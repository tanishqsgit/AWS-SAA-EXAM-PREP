# Beginner course delivery and review

Historical first-version report. The current course is version `2026.10.14-v2`: see [expanded review](expanded-course-review.md) and [current status](course-status.json) for the 32-chapter course and coverage audit.

Delivered on 14 October 2026. Course version: 2026.10.14-v1. Original teaching content and questions were authored and editorially reviewed by an AI assistant; no human expert review or guarantee of passing is claimed.

## Scope

16 ordered chapters, 48 topics, and 162 chapter-test questions. Of these, 96 are new concept checks (two per topic), and 66 are labelled applied questions drawn from the existing 650-question bank. The full-paper bank was preserved unchanged. Reusing applied items supports learning but can increase familiarity with later paper items; course guidance explicitly distinguishes this from independent readiness evidence.

The sequence starts with computers, websites, and cloud concepts, then geography/shared responsibility, IAM/encryption/secrets, networking, compute/scaling, storage, relational databases, DynamoDB, messaging, serverless/containers, global/hybrid networks, disaster recovery, observability/governance/security, migration/analytics, cost, and complete architecture decision exercises.

Every topic contains its objective, explanatory prose, a simple child-friendly story, AWS mapping, the analogy's limitation, worked problem and steps, pitfalls, takeaways, notes, and completion control. The searchable glossary defines 46 common terms. Chapter drafts survive refresh; course progress and historical assessment snapshots are portable and strictly validated before import.

## Source and technical review

The official current guide still identifies SAA-C03. The source ledger records 78 retrieved official reference pages separately from editorial comparison. Local reference text is retained under `docs/course-sources/`. Course content avoids arbitrary changing quotas and prices, and qualifies service support and cost assumptions.

Reviewed distinctions include: physical AZs versus Regions; customer guest-OS responsibility; roles versus passwords; permission ceilings versus grants; key access versus object access; routing versus authorization; stateful groups versus stateless ACLs; gateway versus interface endpoints; object/block/file interfaces; database availability versus read scaling and historical recovery; table/LSI versus GSI consistency; asynchronous TTL versus exact-time expiry; queue delivery versus idempotent effects; fanout versus competing workers; FIFO groups versus workflows; managed execution versus host control; viewer versus origin authorization; dedicated connectivity versus encryption/redundancy; replayable streams versus managed delivery; and personal study targets versus official scoring.

## Honest learning measures

Completion marks are learner self-reports, not proof of mastery. Chapter test scores are raw exact-set accuracy with sample counts; 80% is an explicitly labelled personal study target. Course and retake results do not enter the original timed first-attempt trend. Time estimates are planning aids. Stories are stepping stones to real technical reasoning and identify their limits.

## Verification

Unit tests validate chapter order, unique IDs, minimum explanatory content, a simple example and worked steps for every topic, topic assessment coverage, selection keys, option explanations, official reference hosts, exact scoring, safe import, backward-compatible old exports, and historical snapshots. Browser tests cover the course learning flow, examples, glossary, notes, completion, draft refresh/resume, test submission/review, export/import, mobile layout, and blocking study material during a timed exam. Separate production tests check offline course and exam restoration. Build and existing exam workflows are checked as part of delivery.

Final checks: `npm test` passed 14 unit tests; the development Playwright suite passed 8 workflows; the production offline suite passed 2 workflows; `npm run build` passed. Desktop/mobile screenshots were inspected. The development server is available on the existing localhost origin.
