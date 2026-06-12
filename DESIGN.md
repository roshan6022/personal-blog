# Blog Application Design Document

## 1. Overview

A Next.js 16-based personal blog with Markdown content support, PostgreSQL database, and a custom admin dashboard for content management. Features include:

- **Public blog** with searchable posts and markdown rendering
- **Admin dashboard** for creating, editing, and deleting posts
- **Authentication** via JWT cookies for admin access
- **Dark mode** support with system theme detection
- **Code highlighting** with copy-to-clipboard functionality
- **Search** via Cmd+K command palette

## 2. Architecture

### High-Level Structure
```
src/
├── app/                    # Next.js App Router
│   ├── api/               # API routes
│   ├── admin/             # Admin pages (protected)
│   ├── post/[slug]/       # Public post pages
│   └── layout.tsx         # Root layout
├── components/            # React components
│   ├── layout/            # Layout components
│   ├── ui/                # UI primitives (shadcn-like)
│   └── *.tsx              # Feature components
├── lib/                   # Utilities & services
├── schema/                # Zod validation schemas
└── types/                 # TypeScript types
```

### Data Flow
1. **Database** (PostgreSQL) ↔ **Prisma ORM** ↔ **API Routes** ↔ **Client Components**
2. **Markdown** → **remark/rehype pipeline** → **HTML** → **PostContent component**
3. **Auth**: Login form → `/api/auth/login` → JWT cookie → Protected routes

### Entry Points
- **Public**: `/` (home), `/post/[slug]` (posts), `/about` (static page)
- **Admin**: `/admin` (dashboard), `/admin/login`, `/admin/post/create`, `/admin/post/edit/[id]`
- **API**: `/api/post`, `/api/post/[id]`, `/api/auth/login`

## 3. File Breakdown

### Database Schema (`prisma/schema.prisma`)

| Model | Fields | Purpose |
|-------|--------|---------|
| `Post` | id, title, slug, content, published, coverImage, expectedReadTime, createdAt, updatedAt, categories | Blog posts |
| `Category` | id, name, slug, posts | Post categorization (many-to-many) |
| `Admin` | id, username, passwordHash | Admin authentication |

### Core Files

| File | Purpose | Dependencies |
|------|---------|--------------|
| `src/lib/prisma.ts` | Prisma client singleton with PostgreSQL adapter | @prisma/client, @prisma/adapter-pg |
| `src/lib/markdown.ts` | Converts Markdown to HTML using unified pipeline | remark-parse, remark-gfm, remark-rehype, rehype-* |
| `src/lib/search-posts.ts` | Fetches published posts for search index | prisma |
| `src/lib/utils.ts` | `cn()` utility for Tailwind class merging | clsx, tailwind-merge |
| `src/lib/fonts.ts` | Google Fonts configuration (Inter, JetBrains Mono, Press Start 2P) | next/font/google |

### API Routes

| Route | Methods | Purpose |
|-------|---------|---------|
| `/api/auth/login` | POST | Authenticates admin, sets JWT cookie |
| `/api/post` | POST | Creates new post |
| `/api/post/[id]` | GET, PUT, DELETE | CRUD operations on posts |

### Admin Pages

| Page | Purpose |
|------|---------|
| `/admin` | Dashboard listing all posts with edit/delete |
| `/admin/login` | Login form with retro styling |
| `/admin/post/create` | Form to create new post |
| `/admin/post/edit/[id]` | Form to edit existing post |

### Key Components

| Component | Purpose |
|-----------|---------|
| `Navbar` | Top navigation with search trigger, theme toggle, GitHub link |
| `PostCard` | Card display for post previews on home page |
| `PostContent` | Renders HTML content with extensive Tailwind prose styling |
| `SearchCommand` | Cmd+K command palette for searching posts |
| `ThemeProvider` | Wrapper for next-themes dark mode support |
| `ThemeToggle` | Button to toggle between light/dark themes |

## 4. Functions & Classes

### `markdownToHtml(markdown: string) => Promise<string>`
- **Purpose**: Converts Markdown to HTML
- **Pipeline**: remark-parse → remark-gfm → remark-rehype → rehype-raw → rehype-highlight → rehype-stringify
- **Side effects**: Parses and transforms input markdown
- **Used by**: `src/app/post/[slug]/page.tsx`

### `slugify(text: string) => string`
- **Purpose**: Converts text to URL-safe slug
- **Logic**: lowercase, trim, replace non-alphanumeric with dashes, remove leading/trailing dashes
- **Used by**: `/api/post/route.ts`, `/admin/post/create/page.tsx`

### `generateUniqueSlug(baseSlug: string) => Promise<string>`
- **Purpose**: Ensures slug uniqueness by appending counter if needed
- **Used by**: `/api/post/route.ts` POST handler

### Login Handler (`/api/auth/login`)
- **Input**: username, password (validated via loginSchema)
- **Logic**: Find admin → bcrypt.compare → jwt.sign → set cookie
- **Output**: JWT cookie (3-day expiry), admin data
- **Side effects**: Sets HTTP-only cookie

## 5. Execution Flow

### Public Blog Access
1. User visits `/` → Server Component fetches published posts from Prisma
2. Posts rendered as `PostCard` components in grid
3. User clicks post → Navigate to `/post/[slug]`
4. Server fetches post by slug, converts markdown to HTML
5. `PostContent` renders styled HTML

### Post Creation Flow
1. Admin visits `/admin` → Redirected to `/admin/login` if not authenticated
2. Submit credentials → `/api/auth/login` → JWT cookie set
3. Navigate to `/admin/post/create`
4. Fill form (title auto-generates slug from title)
5. Submit → POST to `/api/post` → Prisma creates post
6. Redirect to new post page

### Search Flow
1. User presses ⌘K / Ctrl+K
2. `SearchCommand` dialog opens
3. Type to filter posts (client-side)
4. Select post → Navigate to `/post/[slug]`

## 6. Dependencies

### Core
- **next@16.0.7** - React framework with App Router
- **react@19.2.0** - UI library
- **typescript@5.9.3** - Type safety

### Database
- **@prisma/client@7.5.0** - Type-safe ORM
- **@prisma/adapter-pg@7.5.0** - PostgreSQL adapter
- **prisma@7.5.0** - Database migrations
- **pg@8.20.0** - PostgreSQL driver

### Styling
- **tailwindcss@4.2.1** - Utility CSS
- **@tailwindcss/typography** - Prose styling
- **tailwind-merge@3.5.0** - Class merging
- **clsx@2.1.1** - Conditional classes

### UI Components
- **@radix-ui/** (dialog, dropdown-menu, navigation-menu) - Accessible primitives
- **cmdk@1.1.1** - Command palette
- **lucide-react@0.556.0** - Icons
- **framer-motion@12.38.0** - Animations
- **next-themes@0.4.6** - Dark mode

### Markdown Processing
- **unified@11.0.5** - Unified processor
- **remark@15.0.1** - Markdown parser
- **remark-gfm@4.0.1** - GitHub Flavored Markdown
- **remark-rehype@11.1.2** - Markdown to HTML
- **rehype-raw@7.0.0** - Raw HTML in markdown
- **rehype-highlight@7.0.2** - Code highlighting
- **shiki@3.23.0** - Syntax highlighter

### Auth & Security
- **bcryptjs@3.0.3** - Password hashing
- **jsonwebtoken@9.0.3** - JWT tokens
- **zod@4.3.6** - Schema validation

### Fonts
- **geist@1.7.0** - Geist font
- **next/font** - Google Fonts (Inter, JetBrains Mono, Press Start 2P)

## 7. Improvements

### Security
- Add rate limiting to auth endpoints
- Implement CSRF protection
- Add input sanitization beyond Zod (though remark/rehype handle this)
- Use `secure` flag on cookie in production only (already implemented)
- Add token refresh mechanism
- Store JWT_SECRET in environment with validation

### Code Quality
- Extract repeated form field logic into reusable components
- Add error boundaries around major sections
- Implement proper loading states with suspense boundaries
- Add optimistic UI updates for better UX

### Performance
- Add caching headers to static content
- Implement pagination for post listings
- Lazy load images with blur placeholders
- Consider incremental static regeneration (ISR) for posts

### Architecture
- Add middleware for auth protection (currently client-side redirect only)
- Extract API error handling to centralized middleware
- Add proper logging (currently implicit via console)
- Implement proper TypeScript types instead of `any` in PostContent
- Consider separating admin and public layouts

### Admin Dashboard
- Add bulk operations (publish/unpublish multiple)
- Add post preview before publishing
- Add media library for image management
- Add autosave for drafts
- Add rich text editor instead of raw markdown

### Search
- Implement server-side search for large datasets
- Add fuzzy search
- Add search analytics

### Testing
- Add unit tests for utilities
- Add integration tests for API routes
- Add E2E tests for critical flows
