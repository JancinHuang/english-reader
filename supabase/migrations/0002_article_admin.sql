alter table public.articles
add column if not exists status text not null default 'published';

create table if not exists public.dataset_meta (
  id integer primary key,
  version integer not null default 1,
  updated_at timestamptz not null default now()
);

insert into public.dataset_meta (id, version)
values (1, 1)
on conflict (id) do nothing;

alter table public.dataset_meta enable row level security;

drop policy if exists "dataset_meta_select_public" on public.dataset_meta;
create policy "dataset_meta_select_public"
on public.dataset_meta
for select
to public
using (true);

drop policy if exists "articles_select_public" on public.articles;
create policy "articles_select_public"
on public.articles
for select
to public
using (status = 'published');

grant select on public.articles to anon;
grant select on public.dataset_meta to anon;

grant all privileges on public.articles to authenticated;
grant all privileges on public.dataset_meta to authenticated;
