-- ==============================================================
-- Earthworm: English to Arabic Learning App - Supabase Schema
-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard)
-- ==============================================================

-- 1. Profiles Table (optional if using Supabase Auth)
create table if not exists public.profiles (
  id uuid references auth.users on delete cascade primary key,
  username text,
  avatar text,
  created_at timestamptz default now()
);

-- 2. User Course Progress
create table if not exists public.course_progress (
  id bigserial primary key,
  user_id text not null,
  course_pack_id text not null,
  course_id text not null,
  statement_index int default 0,
  updated_at timestamptz default now(),
  constraint course_progress_unique unique (user_id, course_pack_id, course_id)
);

-- 3. Course Completion History
create table if not exists public.course_history (
  id bigserial primary key,
  user_id text not null,
  course_pack_id text not null,
  course_id text not null,
  completion_count int default 1,
  completed_at timestamptz default now(),
  constraint course_history_unique unique (user_id, course_pack_id, course_id)
);

-- 4. Mastered Elements (Words and Sentences mastered by user)
create table if not exists public.mastered_elements (
  id text primary key,
  user_id text not null,
  english text not null,
  arabic text default '',
  mastered_at timestamptz default now()
);

-- 5. Daily Learning Activities
create table if not exists public.learning_activities (
  id bigserial primary key,
  user_id text not null,
  activity_date date default current_date,
  duration int default 0,
  created_at timestamptz default now(),
  constraint learning_activities_unique unique (user_id, activity_date)
);

-- Enable Row Level Security (RLS)
alter table public.profiles enable row level security;
alter table public.course_progress enable row level security;
alter table public.course_history enable row level security;
alter table public.mastered_elements enable row level security;
alter table public.learning_activities enable row level security;

-- Public access policies for standard anon/authenticated access
create policy "Allow all operations for anon" on public.course_progress for all using (true) with check (true);
create policy "Allow all operations for anon" on public.course_history for all using (true) with check (true);
create policy "Allow all operations for anon" on public.mastered_elements for all using (true) with check (true);
create policy "Allow all operations for anon" on public.learning_activities for all using (true) with check (true);
create policy "Allow all operations for anon" on public.profiles for all using (true) with check (true);
