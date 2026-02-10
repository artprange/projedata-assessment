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

To speed up delivery, the API is mocked using **MSW (Mock Service Worker)** in development mode.

- All requests are made to `/api/*`
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
```
