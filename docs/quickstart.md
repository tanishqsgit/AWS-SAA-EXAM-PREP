# Start studying with SAA Study Studio

Use the desktop app to study without installing a development toolchain, or run
the source locally if you want to contribute.

## Windows desktop

1. Open [Releases](https://github.com/tanishqsgit/AWS-SAA-EXAM-PREP/releases).
2. Select a Windows x64 Setup or Portable asset for the desired release. Compare
   its hash with the release's `SHA256SUMS.txt` if provided.
3. Launch the application. Builds are unsigned; follow your organisation's rules
   for running unsigned applications.
4. Select **Create profile**, enter an email and an 8–128 character password,
   confirm it, and select **Create profile and start**.
5. Open **Study course**, choose a topic, and read its explanation and references.

The profile is local to this installation. Email ownership is not verified, and
there is no email recovery or automatic cross-device sync. Do not reuse an important password.
The first profile can claim earlier unassigned progress on the same installation.

## Run the source

Requires Node.js and npm compatible with the checked-in dependency lockfile.
From the repository root:

```sh
npm ci
npm run dev
```

Open the URL printed by Vite, normally `http://127.0.0.1:5173`. Create a local
profile as above. Stop the server with Ctrl+C. Keep the hostname, port, and browser
profile consistent to reach the same browser storage.

## Confirm the result

The course should open after sign-in. A page refresh should retain the current
tab's session. Desktop and browser progress stores are separate. External AWS
reference links need internet access.

For data portability and recovery, read [Troubleshoot local profiles](troubleshooting.md).
See [the main README](../README.md) for source-review status and assessment limitations.
