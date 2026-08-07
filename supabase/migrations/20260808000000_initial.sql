create extension if not exists pgcrypto;

create type public.profile_role as enum ('user', 'operator', 'admin');
create type public.publication_status as enum ('draft', 'pending', 'published', 'rejected', 'archived');
create type public.moderation_status as enum ('pending', 'approved', 'published', 'rejected', 'archived');
create type public.availability_status as enum ('available', 'on-request', 'not-listed');
create type public.lead_status as enum ('new', 'contacted', 'qualified', 'resolved', 'archived');
create type public.claim_status as enum ('pending', 'approved', 'rejected', 'archived');

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  role public.profile_role not null default 'user',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.cities (
  id text primary key,
  name text not null,
  region text not null,
  state text not null,
  description text,
  status public.publication_status not null default 'published',
  created_at timestamptz not null default now()
);

create table public.care_types (
  id text primary key,
  name text not null,
  description text,
  created_at timestamptz not null default now()
);

create table public.properties (
  id text primary key,
  slug text not null unique,
  name text not null,
  city_id text not null references public.cities(id),
  locality text,
  state text,
  address text,
  summary text,
  description text,
  price_from integer check (price_from is null or price_from >= 0),
  price_note text,
  rating numeric(2,1) not null default 0 check (rating between 0 and 5),
  review_count integer not null default 0 check (review_count >= 0),
  verified boolean not null default false,
  claimed boolean not null default false,
  featured boolean not null default false,
  status public.publication_status not null default 'draft',
  source_label text,
  source_url text,
  source_checked_at timestamptz,
  claimed_by uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.property_care_types (
  property_id text not null references public.properties(id) on delete cascade,
  care_type_id text not null references public.care_types(id),
  primary key (property_id, care_type_id)
);

create table public.property_capabilities (
  id uuid primary key default gen_random_uuid(),
  property_id text not null references public.properties(id) on delete cascade,
  capability_key text not null,
  label text not null,
  availability public.availability_status not null default 'not-listed',
  evidence_note text,
  last_confirmed_at timestamptz,
  unique (property_id, capability_key)
);

create table public.amenities (
  id text primary key,
  name text not null unique
);

create table public.property_amenities (
  property_id text not null references public.properties(id) on delete cascade,
  amenity_id text not null references public.amenities(id),
  primary key (property_id, amenity_id)
);

create table public.rooms (
  id uuid primary key default gen_random_uuid(),
  property_id text not null references public.properties(id) on delete cascade,
  name text not null,
  description text,
  occupancy integer check (occupancy is null or occupancy > 0),
  price_from integer check (price_from is null or price_from >= 0),
  available boolean,
  sort_order integer not null default 0
);

create table public.media (
  id uuid primary key default gen_random_uuid(),
  property_id text not null references public.properties(id) on delete cascade,
  url text not null,
  alt_text text not null,
  media_type text not null default 'image' check (media_type in ('image', 'video')),
  rights_confirmed boolean not null default false,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table public.reviews (
  id uuid primary key default gen_random_uuid(),
  property_id text not null references public.properties(id) on delete cascade,
  user_id uuid not null references public.profiles(id) on delete cascade,
  rating integer not null check (rating between 1 and 5),
  title text not null check (char_length(title) between 4 and 120),
  body text not null check (char_length(body) between 30 and 2000),
  relationship text not null,
  stay_date date,
  visit_confirmed boolean not null default false,
  status public.moderation_status not null default 'pending',
  moderator_note text,
  moderated_by uuid references public.profiles(id),
  moderated_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.leads (
  id uuid primary key default gen_random_uuid(),
  lead_type text not null check (lead_type in ('property', 'concierge')),
  property_id text references public.properties(id) on delete set null,
  name text not null,
  email text not null,
  phone text not null,
  relationship text not null,
  preferred_city text not null,
  care_needs text not null,
  budget text,
  message text,
  source_url text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  consented_at timestamptz not null default now(),
  status public.lead_status not null default 'new',
  assigned_to uuid references public.profiles(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.listing_submissions (
  id uuid primary key default gen_random_uuid(),
  operator_name text not null,
  property_name text not null,
  email text not null,
  phone text not null,
  city text not null,
  website_url text,
  care_types text not null,
  notes text,
  status public.moderation_status not null default 'pending',
  created_property_id text references public.properties(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table public.ownership_claims (
  id uuid primary key default gen_random_uuid(),
  property_id text not null references public.properties(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete set null,
  claimant_name text not null,
  work_email text not null,
  phone text not null,
  job_title text not null,
  evidence_url text,
  notes text,
  status public.claim_status not null default 'pending',
  reviewed_by uuid references public.profiles(id),
  reviewed_at timestamptz,
  created_at timestamptz not null default now()
);

create table public.moderation_history (
  id uuid primary key default gen_random_uuid(),
  entity_type text not null,
  entity_id text not null,
  previous_status text,
  next_status text not null,
  note text,
  moderator_id uuid not null references public.profiles(id),
  created_at timestamptz not null default now()
);

create index properties_city_status_idx on public.properties(city_id, status);
create index properties_featured_idx on public.properties(featured) where status = 'published';
create index reviews_property_status_idx on public.reviews(property_id, status);
create index leads_status_created_idx on public.leads(status, created_at desc);
create index submissions_status_created_idx on public.listing_submissions(status, created_at desc);

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$ select exists (select 1 from public.profiles where id = auth.uid() and role = 'admin'); $$;

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data ->> 'full_name', new.raw_user_meta_data ->> 'name'));
  return new;
end;
$$;

create trigger on_auth_user_created after insert on auth.users for each row execute procedure public.handle_new_user();

create or replace function public.refresh_property_rating()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare target_property text;
begin
  target_property := case when tg_op = 'DELETE' then old.property_id else new.property_id end;
  update public.properties p
  set rating = coalesce((select round(avg(r.rating)::numeric, 1) from public.reviews r where r.property_id = target_property and r.status = 'published'), 0),
      review_count = (select count(*) from public.reviews r where r.property_id = target_property and r.status = 'published'),
      updated_at = now()
  where p.id = target_property;
  return null;
end;
$$;

create trigger reviews_refresh_rating after insert or update of status, rating or delete on public.reviews for each row execute procedure public.refresh_property_rating();

alter table public.profiles enable row level security;
alter table public.cities enable row level security;
alter table public.care_types enable row level security;
alter table public.properties enable row level security;
alter table public.property_care_types enable row level security;
alter table public.property_capabilities enable row level security;
alter table public.amenities enable row level security;
alter table public.property_amenities enable row level security;
alter table public.rooms enable row level security;
alter table public.media enable row level security;
alter table public.reviews enable row level security;
alter table public.leads enable row level security;
alter table public.listing_submissions enable row level security;
alter table public.ownership_claims enable row level security;
alter table public.moderation_history enable row level security;

create policy "Published cities are public" on public.cities for select using (status = 'published' or public.is_admin());
create policy "Care types are public" on public.care_types for select using (true);
create policy "Published properties are public" on public.properties for select using (status = 'published' or public.is_admin());
create policy "Published property care types are public" on public.property_care_types for select using (exists (select 1 from public.properties p where p.id = property_id and p.status = 'published') or public.is_admin());
create policy "Published capabilities are public" on public.property_capabilities for select using (exists (select 1 from public.properties p where p.id = property_id and p.status = 'published') or public.is_admin());
create policy "Amenities are public" on public.amenities for select using (true);
create policy "Published property amenities are public" on public.property_amenities for select using (exists (select 1 from public.properties p where p.id = property_id and p.status = 'published') or public.is_admin());
create policy "Published rooms are public" on public.rooms for select using (exists (select 1 from public.properties p where p.id = property_id and p.status = 'published') or public.is_admin());
create policy "Rights-confirmed media is public" on public.media for select using ((rights_confirmed and exists (select 1 from public.properties p where p.id = property_id and p.status = 'published')) or public.is_admin());

create policy "Users can read own profile" on public.profiles for select using (id = auth.uid() or public.is_admin());
create policy "Users can update own name" on public.profiles for update using (id = auth.uid()) with check (id = auth.uid());
create policy "Published reviews are public" on public.reviews for select using (status = 'published' or user_id = auth.uid() or public.is_admin());
create policy "Users submit own reviews" on public.reviews for insert with check (user_id = auth.uid() and status = 'pending');
create policy "Users edit pending reviews" on public.reviews for update using (user_id = auth.uid() and status = 'pending') with check (user_id = auth.uid() and status = 'pending');
create policy "Users read own claims" on public.ownership_claims for select using (user_id = auth.uid() or public.is_admin());
create policy "Users submit own claims" on public.ownership_claims for insert with check (user_id = auth.uid());

create policy "Admins manage properties" on public.properties for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage property care" on public.property_care_types for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage capabilities" on public.property_capabilities for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage amenities" on public.amenities for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage property amenities" on public.property_amenities for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage rooms" on public.rooms for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage media" on public.media for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage reviews" on public.reviews for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage leads" on public.leads for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage submissions" on public.listing_submissions for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage claims" on public.ownership_claims for all using (public.is_admin()) with check (public.is_admin());
create policy "Admins manage history" on public.moderation_history for all using (public.is_admin()) with check (public.is_admin());

insert into public.cities (id, name, region, state, description) values
  ('delhi-ncr', 'Delhi NCR', 'Delhi, Gurgaon, Noida & Faridabad', 'Delhi NCR', 'Premium care close to leading hospitals and family neighbourhoods.'),
  ('mumbai', 'Mumbai', 'Mumbai Metropolitan Region', 'Maharashtra', 'Connected care residences across Mumbai and its quieter outskirts.'),
  ('bengaluru', 'Bengaluru', 'Bengaluru Urban', 'Karnataka', 'A mature senior-living ecosystem with year-round temperate weather.'),
  ('pune', 'Pune', 'Pune Metropolitan Region', 'Maharashtra', 'Calmer neighbourhoods, good hospitals and established senior communities.'),
  ('chennai', 'Chennai', 'Chennai Metropolitan Area', 'Tamil Nadu', 'Deep care expertise paired with strong clinical infrastructure.'),
  ('hyderabad', 'Hyderabad', 'Hyderabad Metropolitan Region', 'Telangana', 'Modern residential communities with strong hospital connectivity.'),
  ('kolkata', 'Kolkata', 'Kolkata Metropolitan Area', 'West Bengal', 'Compassionate, culturally familiar care in and around the city.'),
  ('chandigarh-tricity', 'Chandigarh Tricity', 'Chandigarh, Mohali & Panchkula', 'Chandigarh', 'Green, planned neighbourhoods with easy regional access.')
on conflict (id) do nothing;

insert into public.care_types (id, name, description) values
  ('assisted-living', 'Assisted living', 'Personal support, meals, medication assistance and a safer daily routine.'),
  ('independent-living', 'Independent living', 'Private senior residences with hospitality, security and social connection.'),
  ('luxury-senior-living', 'Luxury senior living', 'Premium residences with high-touch hospitality and wellness amenities.'),
  ('dementia-care', 'Dementia care', 'Structured, secure care for people living with dementia or Alzheimer’s.'),
  ('post-operative-care', 'Post-operative care', 'Short-stay nursing, rehabilitation and recovery after hospital discharge.'),
  ('rehabilitation', 'Rehabilitation', 'Goal-led physiotherapy and supported recovery for older adults.')
on conflict (id) do nothing;
