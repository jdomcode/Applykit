-- ApplyKit MVP schema
-- Phase 3: tables, indexes, Row Level Security, policies and helper functions.

begin;

create extension if not exists pgcrypto;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  preferred_language text not null default 'en' check (preferred_language in ('en', 'es')),
  role text not null default 'user' check (role in ('user', 'admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.tools (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  category text not null check (category in ('application', 'communication', 'career-profile')),
  status text not null default 'active' check (status in ('active', 'draft', 'archived')),
  icon text,
  created_at timestamptz not null default now()
);

create table if not exists public.tool_translations (
  id uuid primary key default gen_random_uuid(),
  tool_id uuid not null references public.tools(id) on delete cascade,
  locale text not null check (locale in ('en', 'es')),
  title text not null,
  description text not null,
  seo_title text,
  seo_description text,
  intro_content text,
  faq jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  unique (tool_id, locale)
);

create table if not exists public.template_versions (
  id uuid primary key default gen_random_uuid(),
  tool_id uuid not null references public.tools(id) on delete cascade,
  locale text not null check (locale in ('en', 'es')),
  version int not null default 1 check (version > 0),
  name text not null,
  tone text not null,
  template_body text not null,
  input_schema jsonb not null,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  unique (tool_id, locale, tone, version)
);

create table if not exists public.generated_documents (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  tool_id uuid references public.tools(id),
  template_version_id uuid references public.template_versions(id),
  locale text not null check (locale in ('en', 'es')),
  title text not null,
  input_data jsonb not null,
  output_text text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.document_favorites (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  document_id uuid not null references public.generated_documents(id) on delete cascade,
  created_at timestamptz not null default now(),
  unique (user_id, document_id)
);

create table if not exists public.feedback (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  tool_id uuid references public.tools(id) on delete cascade,
  rating int check (rating is null or rating between 1 and 5),
  comment text,
  created_at timestamptz not null default now()
);

create table if not exists public.usage_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users(id) on delete set null,
  tool_id uuid references public.tools(id) on delete set null,
  event_type text not null check (event_type in ('tool_viewed', 'document_generated', 'document_copied', 'document_saved')),
  locale text check (locale is null or locale in ('en', 'es')),
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists tools_status_idx on public.tools(status);
create index if not exists tools_category_idx on public.tools(category);
create index if not exists tool_translations_locale_idx on public.tool_translations(locale);
create index if not exists tool_translations_tool_locale_idx on public.tool_translations(tool_id, locale);
create index if not exists template_versions_tool_locale_tone_idx on public.template_versions(tool_id, locale, tone);
create index if not exists template_versions_active_idx on public.template_versions(tool_id, locale, tone) where is_active = true;
create index if not exists generated_documents_user_created_idx on public.generated_documents(user_id, created_at desc);
create index if not exists generated_documents_tool_idx on public.generated_documents(tool_id);
create index if not exists document_favorites_user_idx on public.document_favorites(user_id);
create index if not exists feedback_tool_idx on public.feedback(tool_id);
create index if not exists usage_events_tool_created_idx on public.usage_events(tool_id, created_at desc);
create index if not exists usage_events_type_created_idx on public.usage_events(event_type, created_at desc);

drop trigger if exists set_profiles_updated_at on public.profiles;
create trigger set_profiles_updated_at
before update on public.profiles
for each row
execute function public.set_updated_at();

drop trigger if exists set_generated_documents_updated_at on public.generated_documents;
create trigger set_generated_documents_updated_at
before update on public.generated_documents
for each row
execute function public.set_updated_at();

create or replace function public.current_user_role()
returns text
language sql
stable
security definer
set search_path = public
as $$
  select role
  from public.profiles
  where id = auth.uid();
$$;

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select coalesce(public.current_user_role() = 'admin', false);
$$;

revoke all on function public.current_user_role() from public;
revoke all on function public.is_admin() from public;
grant execute on function public.current_user_role() to authenticated;
grant execute on function public.is_admin() to authenticated;

alter table public.profiles enable row level security;
alter table public.tools enable row level security;
alter table public.tool_translations enable row level security;
alter table public.template_versions enable row level security;
alter table public.generated_documents enable row level security;
alter table public.document_favorites enable row level security;
alter table public.feedback enable row level security;
alter table public.usage_events enable row level security;

create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (id = (select auth.uid()));

create policy "profiles_insert_own"
on public.profiles
for insert
to authenticated
with check (id = (select auth.uid()) and role = 'user');

create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (id = (select auth.uid()))
with check (id = (select auth.uid()) and role = public.current_user_role());

create policy "tools_public_read_active"
on public.tools
for select
to anon, authenticated
using (status = 'active');

create policy "tools_admin_all"
on public.tools
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "tool_translations_public_read_active_tools"
on public.tool_translations
for select
to anon, authenticated
using (
  exists (
    select 1
    from public.tools t
    where t.id = tool_translations.tool_id
      and t.status = 'active'
  )
);

create policy "tool_translations_admin_all"
on public.tool_translations
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "template_versions_public_read_active"
on public.template_versions
for select
to anon, authenticated
using (
  is_active = true
  and exists (
    select 1
    from public.tools t
    where t.id = template_versions.tool_id
      and t.status = 'active'
  )
);

create policy "template_versions_admin_all"
on public.template_versions
for all
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "generated_documents_select_own"
on public.generated_documents
for select
to authenticated
using (user_id = (select auth.uid()));

create policy "generated_documents_insert_own"
on public.generated_documents
for insert
to authenticated
with check (user_id = (select auth.uid()));

create policy "generated_documents_update_own"
on public.generated_documents
for update
to authenticated
using (user_id = (select auth.uid()))
with check (user_id = (select auth.uid()));

create policy "generated_documents_delete_own"
on public.generated_documents
for delete
to authenticated
using (user_id = (select auth.uid()));

create policy "document_favorites_select_own"
on public.document_favorites
for select
to authenticated
using (user_id = (select auth.uid()));

create policy "document_favorites_insert_own"
on public.document_favorites
for insert
to authenticated
with check (
  user_id = (select auth.uid())
  and exists (
    select 1
    from public.generated_documents d
    where d.id = document_favorites.document_id
      and d.user_id = (select auth.uid())
  )
);

create policy "document_favorites_delete_own"
on public.document_favorites
for delete
to authenticated
using (user_id = (select auth.uid()));

create policy "feedback_authenticated_insert"
on public.feedback
for insert
to authenticated
with check (user_id is null or user_id = (select auth.uid()));

create policy "feedback_admin_select"
on public.feedback
for select
to authenticated
using (public.is_admin());

create policy "feedback_admin_update"
on public.feedback
for update
to authenticated
using (public.is_admin())
with check (public.is_admin());

create policy "feedback_admin_delete"
on public.feedback
for delete
to authenticated
using (public.is_admin());

create policy "usage_events_insert_minimal"
on public.usage_events
for insert
to anon, authenticated
with check (
  (
    (select auth.uid()) is null
    and user_id is null
  )
  or
  (
    (select auth.uid()) is not null
    and (user_id is null or user_id = (select auth.uid()))
  )
);

create policy "usage_events_admin_select"
on public.usage_events
for select
to authenticated
using (public.is_admin());

create policy "usage_events_admin_delete"
on public.usage_events
for delete
to authenticated
using (public.is_admin());

grant usage on schema public to anon, authenticated;

grant select on public.tools to anon, authenticated;
grant select on public.tool_translations to anon, authenticated;
grant select on public.template_versions to anon, authenticated;

grant select, insert, update, delete on public.profiles to authenticated;
grant select, insert, update, delete on public.generated_documents to authenticated;
grant select, insert, delete on public.document_favorites to authenticated;
grant select, insert, update, delete on public.tools to authenticated;
grant select, insert, update, delete on public.tool_translations to authenticated;
grant select, insert, update, delete on public.template_versions to authenticated;
grant select, insert, update, delete on public.feedback to authenticated;
grant select, insert, delete on public.usage_events to authenticated;
grant insert on public.usage_events to anon;

commit;
