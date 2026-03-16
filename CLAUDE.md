# PDS Tracker

Nationwide NWS "Particularly Dangerous Situation" alert monitor.

## Tech Stack
- Vite 6 + vanilla JS (ES modules)
- Plain CSS with custom properties
- Pub/sub Store pattern
- Deploy target: Vercel

## Commands
- `npm run dev` — dev server on port 3001
- `npm run build` — production build to `dist/`
- `npm run preview` — preview production build

## Architecture
- `src/api/nwsAlerts.js` — Fetches all active alerts from `api.weather.gov/alerts/active`
- `src/utils/pdsFilter.js` — Client-side filter for "particularly dangerous situation" in description/headline/NWSheadline
- `src/state/store.js` — Simplified pub/sub state management
- `src/ui/` — Render functions that take DOM container + data props
- `src/main.js` — Orchestrator: fetch loop, render cycle

## Key Details
- NWS API requires User-Agent header
- Auto-refreshes every 2 minutes
- On fetch error, last successful data is preserved
- PDS alerts categorized: tornado, svr-tstorm, other
- Sorted: tornado first, then severe thunderstorm, then other; newest onset first within each
