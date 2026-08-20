-- Deterministic development seed for the early AbleSpace task experience.

INSERT INTO users (id, email, full_name, title, username, is_guest)
VALUES
  ('00000000-0000-4000-8000-000000000001', 'guest@example.com', 'Guest User', 'Product Designer', 'guest', true),
  ('00000000-0000-4000-8000-000000000002', 'alex@example.com', 'Alex Carter', 'Frontend Engineer', 'alex-carter', false)
ON CONFLICT (id) DO UPDATE SET
  email = EXCLUDED.email,
  full_name = EXCLUDED.full_name,
  title = EXCLUDED.title,
  username = EXCLUDED.username,
  is_guest = EXCLUDED.is_guest;

INSERT INTO workspaces (id, name, slug)
VALUES ('00000000-0000-4000-8000-000000000101', 'AbleSpace', 'ablespace')
ON CONFLICT (id) DO UPDATE SET
  name = EXCLUDED.name,
  slug = EXCLUDED.slug;

INSERT INTO workspace_members (workspace_id, user_id, role)
VALUES
  ('00000000-0000-4000-8000-000000000101', '00000000-0000-4000-8000-000000000001', 'owner'),
  ('00000000-0000-4000-8000-000000000101', '00000000-0000-4000-8000-000000000002', 'member')
ON CONFLICT (workspace_id, user_id) DO UPDATE SET
  role = EXCLUDED.role;

INSERT INTO tasks (id, workspace_id, reporter_id, title, description, status, priority, due_date)
VALUES
  (
    '00000000-0000-4000-8000-000000000201',
    '00000000-0000-4000-8000-000000000101',
    '00000000-0000-4000-8000-000000000001',
    'Design Homepage',
    'Create the initial homepage layout for the AbleSpace task experience.',
    'todo',
    'high',
    '2026-09-01'
  ),
  (
    '00000000-0000-4000-8000-000000000202',
    '00000000-0000-4000-8000-000000000101',
    '00000000-0000-4000-8000-000000000001',
    'Write API Documentation',
    'Create clear and detailed API documentation to guide developers in using the inventory and sales metrics effectively.',
    'doing',
    'medium',
    '2026-09-05'
  )
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  status = EXCLUDED.status,
  priority = EXCLUDED.priority,
  due_date = EXCLUDED.due_date;

INSERT INTO task_members (task_id, user_id)
VALUES
  ('00000000-0000-4000-8000-000000000201', '00000000-0000-4000-8000-000000000001'),
  ('00000000-0000-4000-8000-000000000202', '00000000-0000-4000-8000-000000000001'),
  ('00000000-0000-4000-8000-000000000202', '00000000-0000-4000-8000-000000000002')
ON CONFLICT (task_id, user_id) DO NOTHING;
