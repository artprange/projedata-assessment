# Inventory System (Frontend)

Web UI for managing products, raw materials (stock), product bill-of-materials (BOM) and a production plan suggestion based on available stock.

Built with:

- Vite + React + TypeScript
- TailwindCSS
- React Router

## Features

- Products CRUD (code, name, price)
- Materials CRUD (code, name, stock quantity)
- Associate materials to products (BOM) with required quantity per unit
- Production plan:
  - Suggests which products can be produced and in which quantities
  - Prioritizes higher unit price products first
  - Calculates grand total value and remaining stock after the plan

## Mocked API (MSW)

The API is mocked using **MSW (Mock Service Worker)** when `VITE_DEMO=true`, in both development and production builds. This explicit flag follows the same approach as `dining-front`.

- In demo mode, all requests are made to `/api/*`
- MSW intercepts these requests and returns responses using an in-memory store (runtime-only persistence)
- The endpoints follow the same contract intended for a real backend (e.g. Spring Boot + Postgres)

### Endpoints (mocked)

**Products**

- `GET /api/products`
- `POST /api/products`
- `GET /api/products/:id`
- `PUT /api/products/:id`
- `DELETE /api/products/:id`

**Materials**

- `GET /api/materials`
- `POST /api/materials`
- `PUT /api/materials/:id`
- `DELETE /api/materials/:id`

**BOM (product materials)**

- `GET /api/products/:productId/materials`
- `POST /api/products/:productId/materials`
- `PUT /api/product-materials/:id`
- `DELETE /api/product-materials/:id`

**Planning**

- `GET /api/production-plan`

## Running locally

### Requirements

- Node.js 20+ recommended
- npm

### Install

```bash
npm install
cp .env.example .env
npm run dev
```

The provided environment enables demo mode, so no backend is required. The
seeded products and materials are stored in memory; reloading resets changes.

To use the real backend, set `VITE_DEMO=false` and configure
`VITE_API_BASE_URL` with the backend origin (for example,
`http://localhost:8080`). Requests will use that origin followed by `/api/*`.
Restart Vite after changing `.env`. For production, rebuild with `npm run build`
because Vite embeds these variables at build time. Use `npm run preview` to
check the build locally.
