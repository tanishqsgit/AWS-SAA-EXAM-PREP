# Desktop distribution v1.1.0

The application is packaged using Electron and electron-builder. Windows x64 NSIS Setup and Portable executables bundle a Chromium/Node runtime and all Vite production assets. There is no local web-server process to start and no runtime cloud dependency. The original exam bank and study course are bundled unchanged.

## Identity and storage boundary

Email uniqueness is enforced with an IndexedDB account key in an atomic transaction. Emails are trimmed and lowercased. Password hashes are salted PBKDF2-SHA-256 (600,000 iterations), not plaintext. Progress uses profile-specific state keys. Authentication state stays in sessionStorage and is removed on sign-out. Existing first-profile migration occurs in the same account/progress transaction and consumes the old unassigned progress exactly once.

This is local profile access rather than verified internet identity. An owner with direct access to local browser or app storage can inspect or modify local data. No OTP, shared account service, global uniqueness, password-recovery email, or encrypted-at-rest progress is claimed. JSON exports contain progress, not password hashes, and imports replace only the signed-in profile's progress after validation and confirmation.

The desktop app uses a stable `study://app` origin. Standard/secure protocol registration allows web storage and Web Crypto without a local HTTP listener. The window has context isolation, sandboxing, and no renderer Node integration. Navigation remains within the bundled origin; approved HTTPS AWS/GitHub links open in the system browser. Permission requests are denied. A content security policy restricts application resources to the bundle. A single-instance lock prevents competing windows. Test runs use isolated temporary user data rather than real learner profiles.

## Distribution

Git ignores installer output. GitHub Actions builds on Windows, runs unit tests, produces checksums, and creates a GitHub Release when a version tag is pushed. Manual builds expose artifacts through Actions. Source download by itself remains the developer project; nontechnical users should download an executable from Releases.

The binaries are unsigned. Windows publisher/SmartScreen prompts are possible. No paid code-signing service was introduced. Updates use a newly downloaded installer; there is no automatic updater or background cloud service. Existing profile data lives outside the installation and is retained on uninstall by default. Portable and installed copies run for the same Windows user and share the same application-data location, so moving only the executable does not transfer the learner's progress.

## Validation

Version 1.1.0 passed 20 unit tests, 13 browser workflows (including duplicate emails, wrong passwords, profile isolation, legacy migration, and safe exports), and 3 production offline workflows. The Electron source runtime and packaged runtime both passed offline registration, all 32 bundled chapters, persisted exam answers, close/reopen login, absolute-deadline expiry, and saved course notes. TypeScript and Vite production builds passed. Setup and Portable executables were produced; their Authenticode status is `NotSigned`.

The build helper downloads the Electron runtime during setup, verifies the official package's SHA-256 checksum before extraction, and can fall back to a mirror if the GitHub transfer fails. This affects developers and CI during packaging; installed users need no runtime download. Native-window screenshots can require an active Windows compositor, so the functional smoke test does not depend on screenshots. Existing desktop and browser screenshots are available in this folder.

Official implementation references: [Electron protocol](https://www.electronjs.org/docs/latest/api/protocol), [Electron security](https://www.electronjs.org/docs/latest/tutorial/security), and [electron-builder NSIS](https://www.electron.build/nsis/).
