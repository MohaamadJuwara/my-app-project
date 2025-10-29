This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 📝 Auto-README Updates

This project includes automatic README.md updates that track code changes:

- **Automatic Updates**: README updates automatically when files are saved (local monitoring) and on Git commits/pushes
- **Tracks**: Project structure, functions/components, dependencies, and recent changes
- **Preserves Manual Edits**: Your manual edits to README are preserved; only specific sections are auto-updated

### Usage

- **Start monitoring**: `npm run readme:monitor` (runs in background, watches for file changes)
- **Manual update**: `npm run readme:update` (updates README once)
- **Git hooks**: Automatically installed; updates README before commits and pushes

The system tracks changes in `app/`, `lib/`, and `scripts/` directories.

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Project Structure

```
├── app/
    ├── api/
    │   ├── comments/
    │   │   ├── [id]/
    │   │   │   └── route.ts
    │   │   └── route.ts
    │   ├── invoices/
    │   │   ├── [id]/
    │   │   │   └── route.ts
    │   │   ├── stats/
    │   │   │   └── route.ts
    │   │   └── route.ts
    │   ├── migrate/
    │   │   └── route.ts
    │   └── users/
    │   │   ├── [id]/
    │   │       └── route.ts
    │   │   └── route.ts
    ├── blog/
    │   ├── [slug]/
    │   │   └── page.tsx
    │   ├── layout.tsx
    │   └── page.tsx
    ├── contexts/
    │   └── theme-context.tsx
    ├── dashboard/
    │   ├── (overview)/
    │   │   ├── loading.tsx
    │   │   └── page.tsx
    │   ├── customers/
    │   │   └── page.tsx
    │   ├── invoices/
    │   │   ├── [id]/
    │   │   │   └── edit/
    │   │   │   │   └── page.tsx
    │   │   ├── create/
    │   │   │   └── page.tsx
    │   │   ├── invoices-table.tsx
    │   │   └── page.tsx
    │   ├── products/
    │   │   └── page.tsx
    │   └── layout.tsx
    ├── lib/
    │   ├── data.ts
    │   ├── definitions.ts
    │   ├── placeholder-data.ts
    │   ├── posts.ts
    │   └── utils.ts
    ├── query/
    │   └── route.ts
    ├── ui/
    │   ├── customers/
    │   │   └── table.tsx
    │   ├── dashboard/
    │   │   ├── cards.tsx
    │   │   ├── latest-invoices.tsx
    │   │   ├── nav-links.tsx
    │   │   ├── revenue-chart.tsx
    │   │   └── sidenav.tsx
    │   ├── invoices/
    │   │   ├── breadcrumbs.tsx
    │   │   ├── buttons.tsx
    │   │   ├── create-form.tsx
    │   │   ├── edit-form.tsx
    │   │   ├── pagination.tsx
    │   │   ├── status.tsx
    │   │   └── table.tsx
    │   ├── acme-logo.tsx
    │   ├── button.tsx
    │   ├── client-theme-toggle.tsx
    │   ├── comments-display.tsx
    │   ├── fonts.ts
    │   ├── login-form.tsx
    │   ├── search.tsx
    │   ├── skeletons.tsx
    │   └── theme-toggle.tsx
    ├── layout.tsx
    ├── like-button.js
    ├── like-button.tsx
    └── page.tsx
├── lib/
    ├── actions.ts
    └── database.ts
└── scripts/
    ├── git-hooks.js
    └── readme-monitor.js
```

## Key Functions & Components

### app/api/comments/[id]/route.ts

- `GET()` (exported)
- `PUT()` (exported)
- `DELETE()` (exported)

### app/api/comments/route.ts

- `GET()` (exported)
- `POST()` (exported)
- `PUT()` (exported)

### app/api/invoices/[id]/route.ts

- `GET()` (exported)
- `PUT()` (exported)
- `DELETE()` (exported)

### app/api/invoices/route.ts

- `GET()` (exported)
- `POST()` (exported)

### app/api/invoices/stats/route.ts

- `GET()` (exported)

### app/api/migrate/route.ts

- `POST()` (exported)
- `GET()` (exported)

### app/api/users/[id]/route.ts

- `GET()` (exported)
- `PUT()` (exported)
- `DELETE()` (exported)

### app/api/users/route.ts

- `GET()` (exported)
- `POST()` (exported)
- `PUT()` (exported)

### app/blog/[slug]/page.tsx

- `BlogPostPage()` (exported)

### app/blog/layout.tsx

- `BlogLayout()` (exported)

### app/blog/page.tsx

- `BlogPage()` (exported)

### app/contexts/theme-context.tsx

- `ThemeProvider()` (exported)
- `useTheme()` (exported)

### app/dashboard/(overview)/loading.tsx

- `Loading()` (exported)

### app/dashboard/(overview)/page.tsx

- `Page()` (exported)
- `dynamic()` (exported)

### app/dashboard/customers/page.tsx

- `CustomersPage()` (exported)

### app/dashboard/invoices/[id]/edit/page.tsx

- `Page()` (exported)
- `dynamic()` (exported)

### app/dashboard/invoices/create/page.tsx

- `Page()` (exported)
- `dynamic()` (exported)

### app/dashboard/invoices/invoices-table.tsx

- `InvoicesTableWrapper()` (exported)

### app/dashboard/invoices/page.tsx

- `InvoicesPage()` (exported)

### app/dashboard/layout.tsx

- `Layout()` (exported)
- `experimental_ppr()` (exported)

### app/dashboard/products/page.tsx

- `ProductsPage()` (exported)

### app/layout.tsx

- `RootLayout()` (exported)

### app/lib/data.ts

- `fetchRevenue()` (exported)
- `fetchLatestInvoices()` (exported)
- `fetchCardData()` (exported)
- `fetchFilteredInvoices()` (exported)
- `fetchInvoicesPages()` (exported)
- `fetchInvoiceById()` (exported)
- `fetchCustomers()` (exported)
- `fetchFilteredCustomers()` (exported)
- `createInvoice()` (exported)
- `getInvoiceById()` (exported)
- `updateInvoice()` (exported)
- `deleteInvoice()` (exported)
- `getSql()` 

### app/lib/posts.ts

- `getPosts()` (exported)

### app/lib/utils.ts

- `formatCurrency()` (exported)
- `formatDateToLocal()` (exported)
- `generateYAxis()` (exported)
- `generatePagination()` (exported)

### app/like-button.js

- `LikeButton()` (exported)

### app/page.tsx

- `Page()` (exported)

### app/query/route.ts

- `GET()` (exported)
- `POST()` (exported)

### app/ui/acme-logo.tsx

- `AcmeLogo()` (exported)

### app/ui/button.tsx

- `Button()` (exported)

### app/ui/client-theme-toggle.tsx

- `ClientThemeToggle()` (exported)

### app/ui/comments-display.tsx

- `CommentsDisplay()` (exported)

### app/ui/customers/table.tsx

- `CustomersTable()` (exported)

### app/ui/dashboard/cards.tsx

- `Card()` (exported)
- `CardWrapper()` (exported)

### app/ui/dashboard/latest-invoices.tsx

- `LatestInvoices()` (exported)

### app/ui/dashboard/nav-links.tsx

- `NavLinks()` (exported)

### app/ui/dashboard/revenue-chart.tsx

- `RevenueChart()` (exported)

### app/ui/dashboard/sidenav.tsx

- `SideNav()` (exported)

### app/ui/fonts.ts

- `inter()` (exported)
- `lusitana()` (exported)

### app/ui/invoices/breadcrumbs.tsx

- `Breadcrumbs()` (exported)

### app/ui/invoices/buttons.tsx

- `CreateInvoice()` (exported)
- `UpdateInvoice()` (exported)
- `DeleteInvoice()` (exported)

### app/ui/invoices/create-form.tsx

- `Form()` (exported)

### app/ui/invoices/edit-form.tsx

- `EditInvoiceForm()` (exported)

### app/ui/invoices/pagination.tsx

- `Pagination()` (exported)
- `PaginationNumber()` 
- `PaginationArrow()` 

### app/ui/invoices/status.tsx

- `InvoiceStatus()` (exported)

### app/ui/invoices/table.tsx

- `InvoicesTable()` (exported)

### app/ui/login-form.tsx

- `LoginForm()` (exported)

### app/ui/search.tsx

- `Search()` (exported)

### app/ui/skeletons.tsx

- `CardSkeleton()` (exported)
- `LatestInvoicesSkeleton()` (exported)
- `CardsSkeleton()` (exported)
- `RevenueChartSkeleton()` (exported)

### app/ui/theme-toggle.tsx

- `ThemeToggle()` (exported)

### lib/actions.ts

- `createInvoice()` (exported)
- `updateInvoice()` (exported)
- `getSql()` 

### lib/database.ts

- `createCommentsTable()` (exported)
- `insertComment()` (exported)
- `getAllComments()` (exported)
- `getCommentsByPostId()` (exported)
- `getCommentById()` (exported)
- `updateComment()` (exported)
- `deleteComment()` (exported)
- `hardDeleteComment()` (exported)
- `createUsersTable()` (exported)
- `insertUser()` (exported)
- `getAllUsers()` (exported)
- `getUserById()` (exported)
- `updateUser()` (exported)
- `deleteUser()` (exported)
- `getDatabaseConnection()` 

### scripts/git-hooks.js

- `installHooks()` 

### scripts/readme-monitor.js

- `loadChanges()` 
- `saveChanges()` 
- `extractFunctions()` 
- `analyzeFile()` 
- `extractImports()` 
- `getDependencies()` 
- `updateReadme()` 
- `updateSection()` 
- `updateChangeLog()` 
- `generateProjectStructure()` 
- `generateFunctionsList()` 
- `generateDependenciesList()` 
- `getAllCodeFiles()` 
- `handleFileChange()` 
- `processChanges()` 
- `startWatcher()` 
- `runOnce()`

## Dependencies

### Runtime Dependencies

- `@heroicons/react`
- `@neondatabase/serverless`
- `@tailwindcss/forms`
- `autoprefixer`
- `bcrypt`
- `clsx`
- `glob`
- `next`
- `next-auth`
- `postcss`
- `postgres`
- `react`
- `react-dom`
- `rimraf`
- `tailwindcss`
- `typescript`
- `use-debounce`
- `zod`

### Development Dependencies

- `@types/bcrypt`
- `@types/css-modules`
- `@types/node`
- `@types/react`
- `@types/react-dom`
- `chokidar`
- `eslint`
- `typescript`

## API Documentation

### Users API

The Users API provides full CRUD operations for managing user records.

**Resource:** `users`  
**Base URL:** `/api/users`

**Fields:**
- `customer` (string, required) - Customer name
- `email` (string, required, valid email format) - User email address
- `amount` (number, required, positive) - Amount value
- `date` (string, required, ISO format YYYY-MM-DD) - Date value
- `status` (string, required) - Status value

**Endpoints:**

1. **GET /api/users** - List all users
   - Response: `{ "users": [...] }`
   - Status: 200

2. **GET /api/users/:id** - Get single user
   - Response: `{ "user": {...} }`
   - Status: 200 (success), 404 (not found), 400 (invalid ID)

3. **POST /api/users** - Create user
   - Request Body:
     ```json
     {
       "customer": "John Doe",
       "email": "john@example.com",
       "amount": 100.50,
       "date": "2025-10-29",
       "status": "active"
     }
     ```
   - Response: `{ "user": {...} }`
   - Status: 201 (created), 400 (validation error), 409 (email exists), 500 (server error)

4. **PUT /api/users/:id** - Update user
   - Request Body (all fields optional):
     ```json
     {
       "customer": "Jane Doe",
       "email": "jane@example.com",
       "amount": 200.00,
       "date": "2025-10-30",
       "status": "inactive"
     }
     ```
   - Response: `{ "user": {...} }`
   - Status: 200 (success), 400 (validation error), 404 (not found), 409 (email exists)

5. **DELETE /api/users/:id** - Delete user
   - Response: `{ "message": "User deleted successfully", "user": {...} }`
   - Status: 200 (success), 404 (not found), 400 (invalid ID)

**Example Requests:**

Create user:
```bash
curl -X POST http://localhost:3000/api/users \
  -H "Content-Type: application/json" \
  -d '{
    "customer": "John Doe",
    "email": "john@example.com",
    "amount": 100.50,
    "date": "2025-10-29",
    "status": "active"
  }'
```

Get all users:
```bash
curl http://localhost:3000/api/users
```

Update user:
```bash
curl -X PUT http://localhost:3000/api/users/1 \
  -H "Content-Type: application/json" \
  -d '{
    "status": "inactive",
    "amount": 250.00
  }'
```

**Database Table:** `users`
- Automatically created via `PUT /api/users` endpoint or manually via database migration
- Indexes: email, date, status for optimized queries

## Changelog

### Recent Changes

- 10/29/2025: Updated `app/ui/login-form.tsx`
- 10/29/2025: Updated `app/ui/search.tsx`
- 10/29/2025: Updated `app/ui/skeletons.tsx`
- 10/29/2025: Updated `app/ui/theme-toggle.tsx`
- 10/29/2025: Updated `lib/actions.ts`
- 10/29/2025: Updated `lib/database.ts`
- 10/29/2025: Updated `scripts/git-hooks.js`
- 10/29/2025: Updated `scripts/readme-monitor.js`
- 10/29/2025: Updated `app/api/users/[id]/route.ts`
- 10/29/2025: Updated `app/api/users/route.ts`

_Last updated: 2025-10-29_

