# LEAF&DEO Architecture & Scalability Blueprint

## 1. Complete Architecture (Clean Architecture)

LEAF&DEO uses a modular frontend architecture strictly separating presentation from infrastructure.
The UI layer is not allowed to communicate directly with any external service.

`[UI Components] -> [Application Services] -> [Repository Interfaces] <- [Infrastructure Providers]`

**Layers:**
- **UI (App Router):** React components, Pages (`/app`), hooks.
- **Services (`src/core/services`):** Pure TypeScript business logic (e.g., `ProductService`, `WhatsAppService`).
- **Repositories (`src/core/repositories`):** Interface definitions for data requirements.
- **Providers (`src/infrastructure/providers`):** Implementations of repositories (e.g., `SupabaseProductProvider`, `MockProductProvider`).

## 2. Database Schema (Supabase / Postgres)

```sql
-- Products
CREATE TABLE products (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name text NOT NULL,
  scientific_name text NOT NULL,
  slug text UNIQUE NOT NULL,
  short_description text,
  description text,
  category_id UUID REFERENCES categories(id),
  origin_country text,
  base_price numeric,
  price_visibility text CHECK (price_visibility IN ('public', 'contact_for_price', 'request_quote')),
  stock_status text CHECK (stock_status IN ('in_stock', 'out_of_stock', 'coming_soon')),
  plant_story text,
  collector_notes text,
  import_details text
);

-- Care Details
CREATE TABLE care_profiles (
  id UUID PRIMARY KEY,
  product_id UUID REFERENCES products(id),
  light_requirement text,
  humidity text,
  watering text,
  difficulty text,
  growth_rate text,
  pet_safe boolean,
  temperature text
);

-- Variants
CREATE TABLE variants (
  id UUID PRIMARY KEY,
  product_id UUID REFERENCES products(id),
  name text NOT NULL,
  sku text UNIQUE,
  price_modifier numeric DEFAULT 0,
  stock_status text
);
```

## 3. Media Provider Architecture

Current: Cloudinary via Next.js `next/image` with custom loader.

```typescript
// interface MediaProvider {
//   upload(file: File): Promise<string>;
//   getOptimizedUrl(path: string, options: MediaOptions): string;
// }
```
When moving from Cloudinary to S3 or a CDN, we simply implement a new `S3MediaProvider` and bind it to the DI container. The UI `Image` components remain untouched because they receive generic URLs or use wrapper components that utilize the provider.

## 4. WhatsApp Commerce Architecture

Currently implemented in `whatsapp.service.ts`:
- Stateless Cart: `localStorage` client-side context tracking.
- Inquiry Generation: Maps state array `[{product, variant, qty}]` to a formatted Unicode string.
- Routing: Deep links into `wa.me/<number>?text=...` to funnel right into the Sales team's WhatsApp Business CRM.

## 5. Inquiry Cart Architecture

The `InquiryCartContext` stores items locally.
When a user clicks "Add to Inquiry":
- Context merges duplicate variants.
- Top NAV indicator updates.
- On `/inquiry`: User can add `customerNotes` -> Service generates one combined quote request.
- Future: This can be backed by a server `CartService` once DB persistence is needed.

## 6. Admin Import Architecture

Future Admin Panel (`/admin/import`):
- Uses generic DTOs inside a Node.js background worker (Redis/Bull queue).
- **Validation**: Zod schemas validate each CSV row for constraints (slug uniqueness, price numeric).
- **Dry-run**: Transactions are used to test a roll-back before committing the massive upload.
- **Rollback Support**: Use Postgres Savepoints to revert entire 1000-row batch if one row fails on strict constraint.

## 7. SEO Architecture

- **Next.js Metadata API**: used in native `layout.tsx` and `page.tsx` dynamically fetching SEO fields from `Product`.
- **Structured Data (JSON-LD)**: Schema.org Product injected into page header.
- **Canonical URLs**: Managed via a Site Config object to dynamically set canonical tags avoiding duplicate content from query parameters (like `?variant=small`).

## 8. Theme System (Tailwind 4 + CSS Variables)

Tailwind `globals.css` declares themes using standard CSS properties instead of generic hex codes to easily toggle variants:
- `--color-brand-cream`
- `--color-brand-forest`
By injecting a `.dark` or `.theme-earth` class into the `<html>` root, the specific Hex values rotate, allowing for dynamic re-theming without rebuilding. 

## 9. Future Migration Strategy

To move from Mock data to Supabase:
1. Generate Supabase client (`src/infrastructure/supabase/client.ts`).
2. Create `SupabaseProductProvider` implementing `ProductRepository`.
3. In `di.ts`, switch `productProvider` assignment: 
   `const productProvider = new SupabaseProductProvider();`
*No frontend component (`app/page.tsx`, `components/product/...`) will require modification.*

## 10. Scalability Documentation

- **Frontend Caching**: Uses Next.js App Router Data Cache and `revalidate` on static paths like `/collections` to guarantee instant load times for thousands of SKUs.
- **Edge Delivery**: UI runs on Edge standard compatible Vercel/Cloud Run environments.
- **Backend Expandability**: Bounded contexts allow breaking out separate APIs (e.g. replacing `ProductService` with a fetch to a Golang microservice) eventually.
