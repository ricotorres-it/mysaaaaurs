# MySaaaaurs Anniversary Site

Mobile-first anniversary scrapbook website prepared for GitHub Pages.

## Target repository

`ricotorres-it/mysaaaaurs`

The Vite config uses relative asset paths, so the same source works under any GitHub Pages project repository name without changing `/saursaur/` or `/mysaaaaurs/` paths manually.

## Upload to the new GitHub account

1. Download/extract the prepared ZIP.
2. Open `https://github.com/ricotorres-it/mysaaaaurs`.
3. Upload **the contents of the extracted folder** to the repository root. Do not upload one extra parent folder around the project.
4. Commit the files to the `main` branch.
5. Go to **Settings → Pages** and select **GitHub Actions** as the source if GitHub asks for a Pages source.
6. Open the **Actions** tab and wait for `Deploy anniversary site to GitHub Pages` to complete successfully.

Expected website address after deployment:

`https://ricotorres-it.github.io/mysaaaaurs/`

## Local check

```bash
npm install
npm run build
npm run dev
```

## Important

Keep these folders/files when uploading:

- `.github/workflows/pages.yml`
- `assets/`
- `index.html`
- `app-v3.js`
- all `.css` files
- `package.json`
- `vite.config.js`

Do not upload `node_modules/` or `dist/` if you generate them locally; GitHub Actions builds `dist/` automatically.
