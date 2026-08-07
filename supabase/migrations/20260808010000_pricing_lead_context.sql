alter table public.leads
  add column if not exists urgency text,
  add column if not exists search_reason text;

comment on column public.leads.urgency is 'How quickly the family needs to find an option.';
comment on column public.leads.search_reason is 'Whether dementia, hospital discharge, rehabilitation, or general support prompted the search.';
