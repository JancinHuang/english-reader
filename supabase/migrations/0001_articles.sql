create table if not exists public.articles (
  id text primary key,
  title text not null,
  tags text[] not null default '{}',
  vocab jsonb not null default '[]'::jsonb,
  content jsonb not null default '[]'::jsonb,
  quiz jsonb not null default '[]'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists articles_set_updated_at on public.articles;
create trigger articles_set_updated_at
before update on public.articles
for each row
execute function public.set_updated_at();

alter table public.articles enable row level security;

drop policy if exists "articles_select_public" on public.articles;
create policy "articles_select_public"
on public.articles
for select
to public
using (true);
