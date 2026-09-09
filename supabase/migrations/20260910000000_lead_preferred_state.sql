alter table public.leads
  add column if not exists preferred_state text;

comment on column public.leads.preferred_state is 'The Indian state or union territory the family is seeking care in.';
