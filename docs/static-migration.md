# ApplyKit static migration

ApplyKit is being converted into a fully public, anonymous static site.

Current direction:

- No login.
- No registration.
- No sessions.
- No dashboard.
- No saved document history.
- No admin panel.
- Local document generation in the browser.
- Eight bilingual tools preserved.
- Static hosting preparation for Cloudflare Pages.

Phase 3 removed account-related UI, private routes, backend document APIs, analytics backend code, and the previous account backend dependencies.

Phase 4 will configure static export and generate the `out/` directory.
