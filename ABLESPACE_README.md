# AbleSpace

Full-stack Task Management System for the AbleSpace Technical Assessment.

## Status

- Figma reconnaissance: COMPLETE — 13/13 pages
- Architecture: FROZEN
- Implementation: NOT STARTED
- Deployment: NOT STARTED

## Stack

### Frontend
- Next.js
- App Router
- TypeScript
- Tailwind CSS

### Backend
- NestJS
- TypeScript

### Database
- PostgreSQL

### Deployment
- One GitHub repository
- One Vercel project
- Next.js frontend + NestJS backend in the same project/repository
- Managed PostgreSQL database

## Repository Structure

```text
ABLESPACE/
│
├── frontend/
│   ├── app/
│   │   ├── (auth)/
│   │   │   └── login/
│   │   ├── (app)/
│   │   │   ├── tasks/
│   │   │   ├── tasks/[taskId]/
│   │   │   └── profile/
│   │   ├── layout.tsx
│   │   └── ...
│   │
│   ├── components/
│   │   ├── ui/
│   │   ├── layout/
│   │   ├── navigation/
│   │   ├── menus/
│   │   ├── forms/
│   │   ├── tasks/
│   │   └── profile/
│   │
│   ├── features/
│   │   ├── auth/
│   │   ├── tasks/
│   │   ├── profile/
│   │   └── appearance/
│   │
│   ├── hooks/
│   ├── lib/
│   ├── services/
│   ├── types/
│   ├── styles/
│   └── public/
│       ├── icons/
│       ├── images/
│       ├── logos/
│       └── assets/
│
├── backend/
│   └── src/
│       ├── auth/
│       ├── users/
│       ├── tasks/
│       ├── workspaces/
│       ├── common/
│       └── ...
│
├── database/
│   ├── migrations/
│   └── seed/
│
├── requirements.txt
└── README.md
```

`...` means additional files/modules may be added only when an actual responsibility requires them. It is not a request to generate arbitrary files.

## Architecture Principles

1. Figma pages are visual evidence, views, or states—not automatically separate React pages.
2. Components are reusable implementation units.
3. Tokens represent the shared visual language.
4. Interaction differences are represented as component/application state.
5. Do not duplicate implementations merely because Figma contains repeated frames.
6. Do not invent unspecified Figma properties.
7. Keep engineering decisions explicitly separate from Figma facts.
8. Prefer readable, explainable TypeScript over unnecessary abstraction.

## Application Routes

```text
/login
/tasks
/tasks/[taskId]
/profile
```

Search, Fields, Filter, Theme, Color, Priority, and Calendar states are component/application states unless implementation later proves a separate route is necessary.

## Application Shell

```text
AppShell
├── Sidebar
│   ├── SidebarHeader
│   ├── SidebarContent
│   ├── SidebarGroup
│   ├── SidebarMenuItem
│   └── SidebarMenuButton
│
└── Main
    ├── Header
    └── PageContent
```

Known Sidebar geometry:

```text
Width: 256px
Height: 900px
Background: var(--base-sidebar, #FAFAFA)
```

## Shared UI

Candidate reusable primitives:

```text
Button
Input
Checkbox
Badge
Avatar
IconButton
Separator
Popover
DropdownMenu
DropdownMenuItem
NestedDropdownMenu
```

Do not create a separate file for every visual element unless it has a meaningful reusable responsibility.

## Dropdown Architecture

One shared dropdown/menu foundation should support:

```text
DropdownMenu
├── DropdownMenuTrigger
├── DropdownMenuContent
├── DropdownMenuItem
└── NestedDropdownMenu
```

Specialized systems:

```text
ThemeDropdown
ColorDropdown
FieldsMenu
FilterDropdown
PriorityDropdown
```

### Theme

```text
Light
Dark
```

### Required Color Options

```text
Blue
Emerald
Rose
Black
```

The Figma reference also showed Amber and Pink, but the required implementation scope is the four options above.

### Fields

```text
FieldsMenu
├── ViewSelector
│   ├── List
│   └── Board
└── FieldVisibilityControl[]
    └── Checkbox
```

### Filter

```text
FilterDropdown
├── Status
├── Priority
│   └── PrioritySubmenu
├── Members
├── Due Date
├── Teams
├── Labels
└── Reporter
```

Priority is a nested menu, not seven independent dropdown implementations.

## Task Architecture

```text
TasksFeature
│
├── TaskToolbar
│   ├── Search
│   ├── Fields
│   ├── Filter
│   └── AddTask
│
├── BoardView
│   ├── KanbanBoard
│   └── KanbanColumn
│       └── TaskCard
│
└── ListView
    └── TaskSection
        └── TaskTable
            ├── TaskTableHeader
            ├── TaskRow
            ├── Priority
            ├── Members
            ├── DueDate
            └── Actions
```

The underlying Task domain is shared between Board and List presentations.

### Board

Known geometry:

```text
Kanban workspace:
960 × 558px
Gap: 16px
```

Representative column:

```text
289 × 436px
Radius: 8px
Border: 1px
Background: var(--base-accent, #F5F5F5)
Border: 1px solid var(--base-border, #E5E5E5)
```

Visible columns:

```text
To Do
Doing
Completed
On Hold
```

### List

Visible columns:

```text
Task
Priority
Members
Due Date
Actions
```

Known table:

```text
976 × 224px
Radius: border-radius/rounded-md
Border: 1px solid var(--base-border, #E5E5E5)
Show Footer: false
Show Caption: false
```

Sections:

```text
To Do
Doing
Completed
```

### Search State

Documented search:

```text
Design Homepage
⌘F
```

The matching task is `Design Homepage`.

## Task Detail

```text
TaskDetail
├── TaskDetailHeader
├── Properties
├── Labels
├── Resources
├── Subtasks
├── Discussion / Updates
├── Comments
└── DetailsPanel
    ├── Status
    ├── Priority
    ├── Members
    ├── Dates
    ├── Labels
    ├── Teams
    └── Reporter
```

Example task:

```text
Write API Documentation
```

Description:

```text
Create clear and detailed API documentation to guide developers
in using the inventory and sales metrics effectively.
```

### Details Panel

```text
323 × 480px
Gap: 20px
```

Details Card:

```text
323 × 306px
Gap: 12px
Padding: spacing/3
Radius: border-radius/rounded-lg
Border: 1px solid var(--base-border, #E5E5E5)
```

Shadow:

```text
0px 1px 1px 0px #0000000A
0px 3px 6px -2px #00000005
```

### Calendar

The calendar is a state of the Date field, not a separate page:

```text
Type: Basic
Mobile: No
Width: 214px
Height: 268px
Gap: 16px
Padding: spacing/3
Radius: rounded-md
Background: #FFFFFF
Border-width: border-width/border
```

## Profile

```text
ProfilePage
├── ProfileHeading
├── ProfileInformationCard
│   ├── ProfilePictureRow
│   ├── EmailRow
│   ├── FullNameRow
│   ├── TitleRow
│   └── UsernameRow
│
└── WorkspaceAccess
    └── LeaveWorkspace
```

Known Profile content:

```text
Profile picture
Email
Full name
Title
Username
Workspace access
```

Profile content width:

```text
640px
```

## Design Tokens

### Colors

```text
--base-sidebar: #FAFAFA
--base-sidebar-accent: #F5F5F5
--base-background: #FFFFFF
--base-border: #E5E5E5
--base-primary: #171717
--base-accent: #F5F5F5
--base-secondary: #F5F5F5
--base-popover: #FFFFFF
--base-input: #E5E5E5
--custom-foreground-5: #0A0A0A0D
```

### Spacing

Known tokens:

```text
spacing/0
spacing/0-5
spacing/2
spacing/2-5
spacing/3
spacing/4
spacing/8
container-padding-x
```

### Radius

```text
rounded-md
rounded-lg
rounded-xl
rounded-2xl
rounded-3xl
rounded-full
```

### Borders

```text
border-width/border
```

### Shadows

Known Figma tokens:

```text
shadow-md1
shadow-md2
shadow-lg1
shadow-lg2
shadowmd1
shadowmd2
```

These should not be silently collapsed until the design-token implementation is reconciled.

## Typography

Known specifications include:

### Profile heading

```text
font/font-sans
font-weight/medium
text/2xl/font-size
line-height: 100%
letter-spacing: 0%
```

### Back to App

```text
font/font-sans
font-weight/normal
text/sm/font-size
line-height: 100%
letter-spacing: 0%
```

### Task Detail

```text
Font: Inter
Weight: 400 / Regular
Size: 14px
Line-height: 20px
Letter-spacing: 0%
```

## State Management

### Server/domain state

```text
User
Tasks
Task details
Subtasks
Members
Labels
Teams
Workspace
Comments / Updates
```

### UI state

```text
Current task view
Search query
Filters
Field visibility
Open menu
Selected priority
Selected date
Theme
Color
```

Avoid one giant global store. The exact state-management library remains an engineering decision.

## Backend

Candidate NestJS modules:

```text
backend/src/
├── auth/
├── users/
├── tasks/
├── workspaces/
└── common/
```

Potential API surface:

```text
POST   /auth/login
POST   /auth/guest
GET    /auth/me

GET    /users/me
PATCH  /users/me

GET    /tasks
GET    /tasks/:id
POST   /tasks
PATCH  /tasks/:id
DELETE /tasks/:id

GET    /tasks/:id/subtasks
POST   /tasks/:id/subtasks
PATCH  /subtasks/:id
DELETE /subtasks/:id
```

These are candidate contracts and must be finalized during implementation.

## PostgreSQL

Candidate entities:

```text
User
Workspace
WorkspaceMember
Task
Subtask
Label
TaskLabel
Comment / Update
Team
```

Potential Task properties:

```text
title
description
status
priority
dueDate
members
labels
teams
reporter
subtasks
```

Figma does not specify database tables. The final schema is an engineering decision.

## Authentication

The assessment requires Guest Login.

The exact provider, session/token strategy and authorization model are engineering decisions.

## Responsive Strategy

The assessment requires:

```text
Desktop
Tablet
Mobile
```

The supplied Figma material is primarily desktop-oriented.

Therefore:

- Desktop follows supplied geometry.
- Tablet/mobile behavior is an engineering decision where Figma is silent.
- Responsive behavior must preserve the supplied visual identity.

## Accessibility

The implementation should provide:

- semantic navigation
- keyboard-accessible menus
- visible focus states
- logical tab order
- Escape-to-close menus
- accessible form labels
- accessible validation errors
- semantic tables
- accessible task actions
- accessible calendar navigation
- status/priority information not conveyed only through color

## Assets

```text
frontend/public/
├── icons/
├── images/
├── logos/
└── assets/
```

Use icon libraries for library-provided icons instead of creating duplicate SVG assets for every icon.

Actual Figma-provided images/logos should be stored as project assets when required.

## File-count Philosophy

One visual element does not equal one code file.

Prefer:

```text
TaskCard
Avatar
Badge
DropdownMenu
```

over creating separate files for every title/date/avatar/label/action fragment.

The rule is:

> One file per meaningful responsibility, not one file per visual element.

## Candidate Data/Interaction Architecture

```text
Task Data
    ↓
Task Query / UI State
    ↓
┌───────────────┬───────────────┐
│               │               │
Board View      List View       Detail
│               │               │
Task Cards      Task Tables     Details Panel
```

Search, fields and filters operate on the Task presentation/query layer without duplicating the Task domain model.

## Responsive Architecture

The application must support:

```text
Desktop
Tablet
Mobile
```

Exact breakpoints and mobile/tablet layouts are engineering decisions where Figma does not specify them.

## Unknowns

The following remain intentionally unspecified:

- exact mobile layouts
- exact tablet layouts
- authentication provider
- session strategy
- final API contracts
- final PostgreSQL schema
- state-management library
- theme persistence mechanism
- color persistence mechanism
- empty/loading/error states
- some icon identities
- exact prototype destinations
- some keyboard/accessibility details

Unknowns must never be presented as Figma specifications.

## Development Order

```text
1. Repository initialization
2. Next.js frontend
3. NestJS backend
4. PostgreSQL connection/migrations
5. Design tokens
6. Shared UI primitives
7. Application shell
8. Authentication / Guest Login
9. Profile
10. Task domain
11. Board View
12. List View
13. Task Detail
14. Search / Fields / Filters
15. Appearance system
16. API integration
17. Validation
18. Responsive behavior
19. Loading / Empty / Error states
20. Accessibility
21. Testing
22. Production deployment
23. Documentation
24. Final QA
```

## Git Strategy

Use meaningful small commits that reflect actual work:

```text
initial repository setup
configure frontend
configure backend
configure PostgreSQL
add design tokens
add application shell
add shared UI primitives
add navigation/sidebar
implement login
implement profile
implement task board
implement task list
implement task detail
add search/filter/fields states
add appearance controls
integrate API
add validation
add theme persistence
add responsive behavior
add accessibility
production configuration
deployment
documentation
```

Never fabricate commit history.

## Quality Gate

Before final submission, verify:

### Frontend
- visual fidelity
- typography
- design tokens
- component reuse
- Board/List parity
- Task Detail
- Profile
- Theme
- Color
- Search
- Filters
- Fields
- responsive behavior

### Backend
- authentication
- Guest Login
- validation
- task CRUD
- profile operations
- subtasks
- authorization
- error handling

### Database
- relationships
- constraints
- indexes
- migrations
- seed data

### Deployment
- Vercel build
- environment variables
- PostgreSQL connection
- API availability
- production URL
- refresh/deep-link behavior

## Current Gate

```text
RECONNAISSANCE  → COMPLETE
ARCHITECTURE    → FROZEN
IMPLEMENTATION  → NEXT PHASE
TESTING         → PENDING
DEPLOYMENT      → PENDING
```

## License / Ownership

Assessment project. Add the final licensing/usage statement according to the submission requirements before publication.
