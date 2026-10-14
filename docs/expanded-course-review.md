# Course expansion and scope audit

Updated 14 October 2026. Course version `2026.10.14-v2`.

The course now contains 32 ordered chapters, 96 topics, 252 authored concept/service checks, and 66 labelled applied scenarios from the unchanged practice bank: 318 chapter-test questions. The service atlas adds 118 informal recognition checks. These are separate from the 650 questions in the ten fixed papers. Every topic includes a simple story, its AWS mapping and limitation, a worked example, revision points, and chapter assessment coverage.

The coverage matrix maps all 14 official task statements and 13 published technology/concept groups to real topics. The atlas matches all 118 distinct service names extracted from the official list (Amazon Redshift is listed in more than one category and counted once). No listed name lacks a teaching location. This checks the published scope, not every possible service feature or exam question: AWS explicitly describes its guide as non-exhaustive. Depth differs between core architectural decisions, overview recognition, and guide-listed legacy offerings.

## Added teaching areas

Chapters 17–24 cover managed APIs, authorization and safe retries, frontend/mobile capabilities, infrastructure as code, Systems Manager, account governance, security-service distinctions, certificates, cryptographic control, compliance evidence, IPv6 and connectivity, hybrid/file storage families, registries, and Kubernetes operating responsibilities.

Chapters 25–32 cover batch and specialist compute placement, media capability recognition, analytics engines and governed lakes, specialist database models, migration and protocol compatibility, observability and standby readiness, guide-listed managed AI capabilities, detailed billing and cost analysis, and end-to-end failure/recovery reasoning. Additional checks address hibernation, Requester Pays, SSD/HDD performance, NAT operations, key rotation, and columnar layouts.

## Validation and limits

Structural tests validate IDs, mappings, choices, sources, selection counts, historical snapshots, old first-version drafts, and new progress import/export. Source retrieval and AI editorial comparison have separate records in `expanded-course-source-ledger.json` and `atlas-source-ledger.json`. All 161 distinct chapter reference pages were retrieved. The AI comparison reviewed service capabilities, stated constraints and answer boundaries; it is not human expert review or calibrated assessment validation.

Ambiguous service-recognition prompts were revised to distinguish SNS topic fanout from event-bus routing, SQL Server on RDS from Aurora, Aurora-specific cluster storage, ECS task orchestration from Kubernetes, and EC2 group scaling from cross-service plans. Standalone service cards and chapter checks retain appropriate source references.

Legacy availability is visible: Elastic Transcoder’s documented end of support was 13 November 2025; Snowball Edge documentation says it is unavailable to new customers; AWS no longer resells VMware Cloud on AWS (since 30 April 2024). These guide-listed roles are explained historically rather than recommended unconditionally for new workloads. The surviving official Spanish Elastic Transcoder history notice is cited and paraphrased in English.

Original first-16 chapter check IDs and answer ordering are preserved. New attempts retain question snapshots. Existing notes, topic completion, historical attempts and old drafts are accepted. Atlas quick checks are intentionally informal and reset when leaving the course; chapter-test drafts, results, notes and topic completion persist in IndexedDB and JSON exports. Timed attempts still prevent access to teaching material.

Completing this material cannot guarantee passing. The official SAA-C03 minimum is 720 on AWS’s 100–1000 scaled-score range; this app does not equate a raw percentage to that scaled score. Use fresh first-attempt reasoning, explanations of rejected options, and hands-on or paper exercises to identify remaining weaknesses.

## References

Validation completed: 18 Vitest tests passed; all 11 development browser workflows passed; all 3 production offline workflows passed; TypeScript and Vite production build passed. Desktop/mobile course and atlas screenshots were inspected. The build bundles the local question bank and course (approximately 511 KB compressed JavaScript), so Vite reports a chunk-size advisory; no runtime network service is required.

- [AWS certification page](https://aws.amazon.com/certification/certified-solutions-architect-associate/)
- [Official SAA-C03 guide](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/solutions-architect-associate-03.html)
- [In-scope service list](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/saa-03-in-scope-services.html)
- [Published concepts](https://docs.aws.amazon.com/aws-certification/latest/solutions-architect-associate-03/saa-technologies-concepts.html)
- [Coverage mappings](course-coverage.json)
- [Current counts and status](course-status.json)
