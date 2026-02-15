alter table public.articles
add column if not exists status text not null default 'draft';

alter table public.articles
add column if not exists level text;

alter table public.articles
add column if not exists topic text;

alter table public.articles
add column if not exists summary text;

alter table public.articles
add column if not exists estimated_minutes integer;

update public.articles
set status = 'published'
where status is null;

drop policy if exists "articles_select_public" on public.articles;
create policy "articles_select_public"
on public.articles
for select
to anon
using (status = 'published');

drop policy if exists "articles_select_anon" on public.articles;
create policy "articles_select_anon"
on public.articles
for select
to anon
using (status = 'published');

grant all privileges on public.articles to authenticated;
