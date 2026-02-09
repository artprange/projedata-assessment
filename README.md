## Notes

This project includes a mocked API (MSW) to speed up the practical test delivery.

- Frontend: Vite + React + TypeScript + Tailwind
- API contract: `/api/*` endpoints (same contract intended for a Spring Boot + Postgres implementation)
- Mock layer: MSW intercepts requests and persists data in-memory during runtime.

### Running

```bash
npm install
npm run dev
```
