# ApplyKit manual QA checklist

Use this checklist before each deployment.

## Public pages

- `/en` loads without errors.
- `/es` loads without errors.
- `/en/tools` displays eight tools.
- `/es/herramientas` displays eight tools.
- Each tool detail page loads in English.
- Each tool detail page loads in Spanish.
- FAQ sections display on tool pages.
- Related tools display on tool pages.
- Ad placeholders do not block form use when enabled.

## Generation

- A user can generate a cover letter.
- A user can generate a job application email.
- A user can edit generated output.
- Copy button copies the generated output.
- Required field validation prevents empty submissions.
- No external AI call is required.

## Authentication

- User can register.
- User can log in.
- User can log out.
- User can request password recovery.
- User can update password from recovery flow.
- Header changes after login.
- Private routes redirect anonymous users.

## Documents

- Anonymous user cannot save a document.
- Logged-in user can save a generated document.
- Saved document appears in `/en/documents` and `/es/documentos`.
- User can open saved document detail.
- User can mark document as favorite.
- User can remove favorite.
- User can delete document.
- Deleted document disappears from list.

## Security and privacy

- `generated_documents` has RLS enabled.
- `document_favorites` has RLS enabled.
- `profiles` has RLS enabled.
- Anonymous documents are not saved.
- `usage_events` does not store generated text.
- Supabase service role key is not present in `.env.local`, Vercel public variables, or client code.

## SEO

- `/sitemap.xml` loads.
- `/robots.txt` loads.
- Public pages are indexable.
- Private dashboard, profile, documents, admin, API, and auth routes are disallowed in robots.
- Canonical and alternate language metadata are present on public pages.
- `/en/privacy`, `/es/privacidad`, `/en/terms`, and `/es/terminos` load.

## Admin analytics

- Admin user can open `/en/admin/analytics`.
- Non-admin user cannot access analytics.
- Tool view events are recorded.
- Generate events are recorded.
- Copy events are recorded.
- Save events are recorded.
