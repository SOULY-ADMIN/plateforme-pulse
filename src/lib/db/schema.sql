create extension if not exists "uuid-ossp";

create type design_status as enum (
  'DRAFT',
  'PENDING_REVIEW',
  'APPROVED',
  'REJECTED',
  'FEATURED',
  'SELECTED_FOR_DROP'
);

create table users (
  id uuid primary key default uuid_generate_v4(),
  clerk_user_id text unique not null,
  username text unique not null,
  display_name text not null,
  avatar_url text,
  bio text,
  created_at timestamptz not null default now()
);

create table designs (
  id uuid primary key default uuid_generate_v4(),
  creator_id uuid not null references users(id) on delete cascade,
  slug text unique not null,
  title text not null,
  description text not null,
  inspiration text,
  product_type text not null,
  clothing_type text not null,
  fabric text not null,
  gsm text,
  fit text not null default 'Regular Fit',
  branding text not null default 'No Branding',
  color_base text not null default 'Black',
  collar text,
  sleeve text,
  leg_opening text,
  cut text,
  embroidery text,
  print_type text,
  colorway text,
  washing_style text,
  target_aesthetic text,
  cover_image_url text not null,
  gallery_image_urls text[] not null default '{}',
  tags text[] not null default '{}',
  palette text[] not null default '{}',
  status design_status not null default 'PENDING_REVIEW',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  constraint designs_product_type_check check (product_type in ('T-shirt', 'Long Sleeve', 'Sweatshirt', 'Hoodie', 'Pants', 'Joggers', 'Cargo Pants', 'Shorts')),
  constraint designs_fit_check check (
    (product_type in ('T-shirt', 'Long Sleeve') and fit in ('Regular Fit', 'Slim Fit', 'Oversized Fit', 'Boxy Fit'))
    or
    (product_type in ('Sweatshirt', 'Hoodie') and fit in ('Regular', 'Oversized', 'Boxy'))
    or
    (product_type in ('Pants', 'Joggers', 'Cargo Pants') and fit in ('Skinny', 'Slim', 'Straight', 'Baggy', 'Flare', 'Bootcut', 'Relaxed'))
    or
    (product_type = 'Shorts' and fit in ('Regular', 'Relaxed', 'Oversized'))
  ),
  constraint designs_branding_check check (branding in ('No Branding', 'Embroidery', 'Printed Logo', 'Woven Label', 'Screen Print', 'Puff Print')),
  constraint designs_fabric_check check (fabric in ('Lightweight', 'Medium Weight', 'Heavyweight', 'Standard Fleece', 'Heavy Fleece', 'Premium Heavyweight', 'Cotton Twill', 'Heavy Cotton', 'Nylon Cotton', 'Cotton Fleece', 'Ripstop Cotton', 'Fleece Cotton')),
  constraint designs_color_base_check check (color_base in ('Black', 'White', 'Grey', 'Navy', 'Cream')),
  constraint designs_collar_check check (collar is null or collar in ('Crew Neck', 'Heavy Crew Neck', 'Mock Neck')),
  constraint designs_sleeve_check check (sleeve is null or sleeve in ('Short Sleeve', 'Long Sleeve')),
  constraint designs_leg_opening_check check (leg_opening is null or leg_opening in ('Tapered', 'Straight', 'Wide'))
);

create table design_likes (
  design_id uuid references designs(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (design_id, user_id)
);

create table design_saves (
  design_id uuid references designs(id) on delete cascade,
  user_id uuid references users(id) on delete cascade,
  collection_name text not null default 'Saved',
  created_at timestamptz not null default now(),
  primary key (design_id, user_id, collection_name)
);

create table comments (
  id uuid primary key default uuid_generate_v4(),
  design_id uuid not null references designs(id) on delete cascade,
  user_id uuid not null references users(id) on delete cascade,
  body text not null,
  created_at timestamptz not null default now()
);

create table follows (
  follower_id uuid references users(id) on delete cascade,
  following_id uuid references users(id) on delete cascade,
  created_at timestamptz not null default now(),
  primary key (follower_id, following_id)
);

create table drops (
  id uuid primary key default uuid_generate_v4(),
  drop_number int unique not null,
  title text not null,
  description text,
  launch_at timestamptz,
  status text not null default 'CURATING',
  created_at timestamptz not null default now()
);

create table drop_designs (
  drop_id uuid references drops(id) on delete cascade,
  design_id uuid references designs(id) on delete cascade,
  winner_badge text,
  production_status text not null default 'SELECTED',
  primary key (drop_id, design_id)
);

create table products (
  id uuid primary key default uuid_generate_v4(),
  design_id uuid unique not null references designs(id) on delete restrict,
  name text not null,
  price_cents int not null,
  inventory_count int not null default 0,
  status text not null default 'PREORDER',
  created_at timestamptz not null default now()
);

create table waitlist_entries (
  id uuid primary key default uuid_generate_v4(),
  email text unique not null,
  invite_code text,
  reason text,
  status text not null default 'PENDING',
  queue_position int,
  created_at timestamptz not null default now()
);

create table invite_codes (
  id uuid primary key default uuid_generate_v4(),
  code text unique not null,
  max_uses int not null default 1,
  used_count int not null default 0,
  access_tier text not null default 'ALPHA',
  expires_at timestamptz,
  created_at timestamptz not null default now()
);

create table notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references users(id) on delete cascade,
  title text not null,
  body text,
  type text not null,
  read_at timestamptz,
  created_at timestamptz not null default now()
);

create table moderation_events (
  id uuid primary key default uuid_generate_v4(),
  design_id uuid references designs(id) on delete cascade,
  moderator_id uuid references users(id) on delete set null,
  action text not null,
  risk_level text not null default 'LOW',
  notes text,
  created_at timestamptz not null default now()
);

create index designs_status_created_idx on designs(status, created_at desc);
create index designs_tags_idx on designs using gin(tags);
create index design_likes_design_idx on design_likes(design_id);
create index comments_design_created_idx on comments(design_id, created_at desc);
create index waitlist_status_created_idx on waitlist_entries(status, created_at desc);
create index notifications_user_created_idx on notifications(user_id, created_at desc);
create index moderation_events_design_created_idx on moderation_events(design_id, created_at desc);

create view user_profile_stats as
select
  u.id,
  u.clerk_user_id,
  u.username,
  u.display_name,
  u.avatar_url,
  u.bio,
  count(distinct inbound.follower_id) filter (where inbound.follower_id is not null) as follower_count,
  count(distinct outbound.following_id) filter (where outbound.following_id is not null) as following_count,
  count(distinct d.id) as uploaded_designs,
  count(distinct dl.design_id) as liked_designs,
  count(distinct ds.design_id) as saved_designs
from users u
left join follows inbound on inbound.following_id = u.id
left join follows outbound on outbound.follower_id = u.id
left join designs d on d.creator_id = u.id
left join design_likes dl on dl.user_id = u.id
left join design_saves ds on ds.user_id = u.id
group by u.id;
