# Content review record

Review date: 2026-10-13. Reviewer: AI assistant. No human expert review or AWS endorsement is claimed.

The bank was saved as ten independent 65-question batches. The checked-in source files hold all authored scenarios and keys. Each batch is validated against the same schema and scored/unscored domain allocations. Options are deterministically reordered, keeping stable IDs within the saved question version.

## Checks performed

1. Official certification page, current guide, four domain task pages, and in-scope service list were read. The code remains SAA-C03. Task statements are recorded in the catalog.
2. Official technical documentation was retrieved and its service descriptions and relevant qualifications inspected. Outdated DynamoDB capacity and SQS delivery links were replaced with working official paths. The ledger records retrieval separately; per-question source status records the subsequent capability comparison.
3. Questions were checked for explicit access semantics, current infrastructure, failure boundary, consistency, retention, and cost assumptions. Answers target the requested remaining requirement rather than treating related services as interchangeable.
4. S3 version-recovery scenarios were clarified to distinguish the simplest versioning design from immutable compliance retention. Direct SAML federation scenarios were clarified to prohibit a new broker. Private DynamoDB access was corrected to name gateway endpoints directly rather than requiring interpretation of an S3-only option.
5. RDS questions specify Multi-AZ **DB instance** standby where relevant, avoiding confusion with readable Multi-AZ DB cluster standbys. Read replicas are labelled asynchronous and lag-tolerant. Aurora storage availability is distinguished from having running promotable compute.
6. SQS scenarios require idempotent side effects and completion before deletion. FIFO ordering is scoped to message groups; it is not claimed to make arbitrary side effects exactly once.
7. DynamoDB consistency questions distinguish table/LSI strong reads from eventual GSI reads. TTL is asynchronous and never used as exact-time authorization enforcement. Hot-key redesign is not replaced by aggregate capacity increases.
8. Cost scenarios state modeled economics instead of asserting one service is universally cheaper. Spot requires interruption tolerance. Commitments apply to validated baselines. Interface endpoints have their own cost. Direct Connect is not assumed to be encrypted or redundant by default.
9. Every key and selection count was checked mechanically, and explanations are generated from the capability attached to the selected design. Every option has its capability and a contrast against the required design. Clues and takeaways follow the saved key.
10. Exact normalized scenario duplication is rejected. A lexical near-duplicate screen retains candidates in the report; its threshold is documented in code. Conceptual recurrence and shared architecture options are intentional. This screen does not prove semantic uniqueness.
11. Multiple-response distractors were revised from obvious unsafe shortcuts to plausible incomplete designs. Examples include ALB subnet CIDRs instead of ALB security-group identity, caller-only IAM grants for missing cross-account resource permissions, retention increases instead of safe acknowledgment, FIFO deduplication instead of idempotent side effects, multi-AZ copies instead of off-Region recovery data, short DNS TTLs instead of tested cutover, and infrastructure checks instead of application health. Credential scenarios explicitly distinguish temporary roles from rotated long-lived keys and prohibit image-embedded credential files even when encrypted.

## Review limitations

These scenarios are compact architecture comparisons. Difficulty estimates are editorial. The bank does not have empirical item statistics, a human review panel, validated equivalence between forms, or an official passing interpretation. The eight multiple-response questions per paper are an explicit simulation choice.

Official pages can change after the recorded date. Future edits should repeat source comparison and editorial checks, bump the bank version, and exclude any unresolved flagged question until replaced. Historical attempts preserve their original versions.
