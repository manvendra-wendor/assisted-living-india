-- Reviews are submitted anonymously from the public review form (no customer login exists on this site),
-- so a submitted review cannot reference a profiles row until one is created.
alter table public.reviews alter column user_id drop not null;
