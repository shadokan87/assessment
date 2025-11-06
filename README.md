
# Assessment 2: Summary

## Frontend (React)

### 1. Memory Leak
- Fixed: `Items.js` leaked memory if the component unmounted before fetch completed. Now uses `AbortController` to cancel fetch on unmount.

## Backend (Node.js)

### 1. Refactor Blocking I/O
- Fixed: `src/routes/items.js` used `fs.readFileSync`. Now uses non-blocking async operations (`fs.promises.readFile`).

### 2. Performance
- Fixed: `GET /api/stats` recalculated stats on every request. Now caches results for improved performance.