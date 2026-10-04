# Verdant — Windows run guide

1. Open this folder in VS Code.
2. Open Terminal (PowerShell) in the project root.
3. Run:

```powershell
npm install
npm run dev
```

4. Open http://localhost:3000

The project no longer relies on Unix-only `tee`, `cp`, or `bun` commands for the normal Windows workflow.

If the database is empty, the app seeds the catalogue on first load through the existing seed endpoint.

For a production-style local check:

```powershell
npm run build
npm start
```
