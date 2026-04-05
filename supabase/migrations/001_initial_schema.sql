-- ============================================================
-- LinkMe — Supabase Database Schema
-- Jalankan di: Supabase Dashboard > SQL Editor
-- ============================================================

-- Enable UUID extension
create extension if not exists "uuid-ossp";

-- ─── PROFILES ────────────────────────────────────────────────
create table public.profiles (
  id            uuid primary key references auth.users(id) on delete cascade,
  username      text unique not null,
  display_name  text,
  bio           text,
  avatar_url    text,
  theme_id      text default 'default',
  custom_domain text unique,
  is_pro        boolean not null default false,
  total_views   bigint not null default 0,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now()
);

-- Index username untuk lookup cepat
create index profiles_username_idx on public.profiles(username);

-- ─── LINKS ───────────────────────────────────────────────────
create table public.links (
  id           uuid primary key default uuid_generate_v4(),
  profile_id   uuid not null references public.profiles(id) on delete cascade,
  title        text not null,
  url          text not null,
  icon         text,
  color        text default '#1B56FD',
  is_active    boolean not null default true,
  sort_order   integer not null default 0,
  total_clicks bigint not null default 0,
  created_at   timestamptz not null default now(),
  updated_at   timestamptz not null default now()
);

create index links_profile_id_idx on public.links(profile_id);
create index links_sort_order_idx on public.links(profile_id, sort_order);

-- ─── LINK CLICKS (immutable event log) ───────────────────────
create table public.link_clicks (
  id         uuid primary key default uuid_generate_v4(),
  link_id    uuid not null references public.links(id) on delete cascade,
  profile_id uuid not null references public.profiles(id) on delete cascade,
  clicked_at timestamptz not null default now(),
  ip_hash    text,
  user_agent text,
  country    text,
  device     text check (device in ('mobile','tablet','desktop')),
  referrer   text
);

create index link_clicks_profile_idx on public.link_clicks(profile_id, clicked_at desc);
create index link_clicks_link_idx    on public.link_clicks(link_id, clicked_at desc);

-- ─── PROFILE VIEWS (immutable event log) ─────────────────────
create table public.profile_views (
  id         uuid primary key default uuid_generate_v4(),
  profile_id uuid not null references public.profiles(id) on delete cascade,
  viewed_at  timestamptz not null default now(),
  ip_hash    text,
  country    text,
  device     text check (device in ('mobile','tablet','desktop')),
  referrer   text
);

create index profile_views_profile_idx on public.profile_views(profile_id, viewed_at desc);

-- ─── THEMES ──────────────────────────────────────────────────
create table public.themes (
  id           uuid primary key default uuid_generate_v4(),
  name         text not null,
  slug         text unique not null,
  bg_color     text not null,
  text_color   text not null,
  accent_color text not null,
  card_style   text not null default 'rounded',
  is_premium   boolean not null default false,
  preview_url  text,
  created_at   timestamptz not null default now()
);

-- Seed default themes
insert into public.themes (name, slug, bg_color, text_color, accent_color, card_style, is_premium) values
  ('Default',        'default',        '#F9F8F6', '#0A0A0A', '#1B56FD', 'rounded', false),
  ('Midnight Pro',   'midnight-pro',   '#0F172A', '#F8FAFC', '#3B82F6', 'rounded', false),
  ('Warm Sunset',    'warm-sunset',    '#FFF7ED', '#7C2D12', '#EF4444', 'pill',    false),
  ('Fresh Green',    'fresh-green',    '#F0FDF4', '#064E3B', '#059669', 'rounded', false),
  ('Dreamy Purple',  'dreamy-purple',  '#FDF4FF', '#581C87', '#7C3AED', 'pill',    true),
  ('Rose Gold',      'rose-gold',      '#FFF1F2', '#9F1239', '#EC4899', 'rounded', true),
  ('Ocean Blue',     'ocean-blue',     '#EFF6FF', '#1E3A8A', '#2563EB', 'square',  true),
  ('Carbon Dark',    'carbon-dark',    '#111827', '#F9FAFB', '#6B7280', 'square',  true);

-- ─── ANALYTICS SUMMARY VIEW ──────────────────────────────────
create or replace view public.analytics_summary as
select
  p.id as profile_id,
  p.total_views,
  coalesce((select sum(l.total_clicks) from public.links l where l.profile_id = p.id), 0) as total_clicks,
  coalesce((
    select count(*) from public.profile_views pv
    where pv.profile_id = p.id and pv.viewed_at >= now() - interval '1 day'
  ), 0) as views_today,
  coalesce((
    select count(*) from public.link_clicks lc
    where lc.profile_id = p.id and lc.clicked_at >= now() - interval '1 day'
  ), 0) as clicks_today,
  coalesce((
    select count(*) from public.profile_views pv
    where pv.profile_id = p.id and pv.viewed_at >= now() - interval '7 days'
  ), 0) as views_this_week,
  coalesce((
    select count(*) from public.link_clicks lc
    where lc.profile_id = p.id and lc.clicked_at >= now() - interval '7 days'
  ), 0) as clicks_this_week
from public.profiles p;

-- ─── RPC FUNCTIONS ───────────────────────────────────────────
create or replace function public.increment_link_clicks(link_id uuid)
returns void language sql security definer as $$
  update public.links set total_clicks = total_clicks + 1 where id = link_id;
$$;

create or replace function public.increment_profile_views(profile_id uuid)
returns void language sql security definer as $$
  update public.profiles set total_views = total_views + 1 where id = profile_id;
$$;

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, username, display_name)
  values (
    new.id,
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'username', split_part(new.email, '@', 1))
  )
  on conflict (id) do nothing;
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute function public.handle_new_user();

-- ─── ROW LEVEL SECURITY ──────────────────────────────────────
alter table public.profiles      enable row level security;
alter table public.links         enable row level security;
alter table public.link_clicks   enable row level security;
alter table public.profile_views enable row level security;
alter table public.themes        enable row level security;

-- Profiles: siapapun bisa baca, hanya owner yang bisa update
create policy "profiles_select_public" on public.profiles for select using (true);
create policy "profiles_update_own"    on public.profiles for update using (auth.uid() = id);

-- Links: siapapun bisa baca yang aktif (untuk halaman publik), owner bisa semua
create policy "links_select_active"  on public.links for select using (is_active = true or auth.uid() = profile_id);
create policy "links_insert_own"     on public.links for insert with check (auth.uid() = profile_id);
create policy "links_update_own"     on public.links for update using (auth.uid() = profile_id);
create policy "links_delete_own"     on public.links for delete using (auth.uid() = profile_id);

-- Link clicks: siapapun bisa insert (track klik publik), hanya owner yang bisa baca
create policy "link_clicks_insert_public" on public.link_clicks for insert with check (true);
create policy "link_clicks_select_own"    on public.link_clicks for select using (auth.uid() = profile_id);

-- Profile views: siapapun bisa insert, hanya owner yang bisa baca
create policy "profile_views_insert_public" on public.profile_views for insert with check (true);
create policy "profile_views_select_own"    on public.profile_views for select using (auth.uid() = profile_id);

-- Themes: semua bisa baca
create policy "themes_select_all" on public.themes for select using (true);

-- ─── STORAGE BUCKET ──────────────────────────────────────────
-- Buat bucket di Supabase Dashboard > Storage, atau jalankan ini:
insert into storage.buckets (id, name, public) values ('linkme-uploads', 'linkme-uploads', true)
on conflict do nothing;

create policy "avatar_upload_own" on storage.objects
  for insert with check (bucket_id = 'linkme-uploads' and auth.uid()::text = (storage.foldername(name))[2]);

create policy "avatar_read_public" on storage.objects
  for select using (bucket_id = 'linkme-uploads');
