# /scripts — Development Utilities (NEVER DEPLOYED)

This directory contains local development scripts that are excluded from
all deployments via `.vercelignore`.

**These files were moved here from the production `api/` directory during
the Red-Team Security Purge (2026-02-24).**

## Contents

All test/migration scripts were previously deleted in the Dead Code Purge.
If you add new dev-only scripts (DB migrations, seeders, etc.), place them here.

## Security

- This directory is listed in `.vercelignore` — it will **never** be deployed
- Do NOT import from this directory in any production code
