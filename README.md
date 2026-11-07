# SAA Study Studio

A local-first AWS Solutions Architect Associate study application for Windows and
the browser. Study topics, take practice papers, review mistakes, and keep progress
on your own device.

**Stack:** TypeScript · React · Electron · Vite · IndexedDB

[Windows releases](https://github.com/tanishqsgit/AWS-SAA-EXAM-PREP/releases) ·
[User quickstart](docs/quickstart.md) · [Troubleshooting](docs/troubleshooting.md) ·
[Development reference](DEVELOPMENT.md)

## What it includes

- A structured course with 32 chapters, 96 topics, explanations, and worked examples.
- Ten practice papers with 650 scenario questions, plus chapter checks.
- Timed attempts, untimed practice, bookmarks, notes, and review of past attempts.
- A study plan, progress dashboard, and JSON export/import.
- Local profiles, a Windows desktop package, and browser-based progress storage.

This is an independent learning application. Teaching content is AI-authored and
AI-reviewed, with dated source records and no claimed human expert review or official
AWS endorsement. Raw practice accuracy is not an official exam score or pass prediction.

## Use the Windows application

Download a Windows x64 Setup or Portable asset from
[Releases](https://github.com/tanishqsgit/AWS-SAA-EXAM-PREP/releases).
Follow the [quickstart](docs/quickstart.md) for local profile setup. Builds are unsigned;
the release documentation describes checksums and installation behavior.

## Run the source locally

Requires Node.js and npm compatible with the checked-in lockfile. From the repository root:

```sh
npm ci
npm run dev
```

Open the URL printed by Vite, normally `http://127.0.0.1:5173`. Keep the same hostname,
port, and browser profile to reach the same local storage. External AWS source links
require internet; local studying does not require a runtime AI service.

## Engineering details

| Area | Approach |
| --- | --- |
| User interface | React components with TypeScript models |
| Persistence | Profile-specific local progress and validated JSON portability |
| Timed attempts | Persisted absolute deadlines and historical question snapshots |
| Desktop distribution | Electron packaging and GitHub release workflow |
| Content maintenance | Structured question data, validators, and source-review ledgers |

Profiles do not sync across devices or verify email ownership. There is no email
password recovery. Desktop and browser storage are separate; export backups before
moving installations or changing data.

## Development checks

```sh
npm test
npm run build
npm run bank:validate
```

The [verification record](docs/portfolio-verification.md) records 20 passing tests
and a successful build on 4 November 2026, with audit findings and untested paths
listed separately. These are dated results, not a claim that dependencies or cloud
service details were rechecked today.

## Documentation

- [Quickstart](docs/quickstart.md) and [troubleshooting](docs/troubleshooting.md)
- [Build, packaging, data behavior, and complete implementation reference](DEVELOPMENT.md)
- [Desktop distribution guide](docs/desktop-distribution.md)
- [Documentation verification and known follow-up](docs/portfolio-verification.md)

Source-review dates and content limitations are preserved in the development reference
and checked-in ledgers. Structural validation and source retrieval do not replace
technical review by a human instructor.
