# Frontend - Static Website Powered by Sanity CMS

This is the public-facing website that fetches all content from your Sanity CMS project.

## Setup

### 1. Update Sanity Configuration

Edit `src/utils/sanityClient.js` and update:

```javascript
const SANITY_CONFIG = {
  projectId: 'YOUR_PROJECT_ID',  // Get from sanity.io/manage
  dataset: 'production',
  apiVersion: '2024-01-01',
  useCdn: true,
  token: process.env.SANITY_API_TOKEN || '', // Optional
}
```

### 2. Configure CORS in Sanity

1. Go to [sanity.io/manage](https://sanity.io/manage)
2. Navigate to API section
3. Add CORS origins:
   - `http://localhost:8000` (local development)
   - `https://yourdomain.com` (production)

### 3. Run Locally

```bash
cd frontend
python -m http.server 8000
```

Visit `http://localhost:8000`

## Environment Variables

For production deployment, set these environment variables:

```bash
SANITY_PROJECT_ID=your_project_id
SANITY_DATASET=production
SANITY_API_TOKEN=optional_token
```

## How It Works

1. **On page load**, the app fetches all content from Sanity using GROQ queries
2. **Content is rendered** dynamically into the DOM
3. **Theme colors** from Sanity are applied via CSS variables
4. **Any changes** made in Sanity Studio will appear on the live site (after refresh)

## GROQ Queries Used

All queries are defined in `src/utils/sanityClient.js`:

```groq
// Fetch everything in one efficient query
{
  "site": *[_type == "site"][0],
  "navbar": *[_type == "navbar"][0],
  "hero": *[_type == "hero"][0],
  "about": *[_type == "about"][0],
  "services": *[_type == "service"] | order(order asc),
  "contact": *[_type == "contact"][0],
  "footer": *[_type == "footer"][0]
}
```

## Deployment to GitHub Pages

### Option 1: Direct GitHub Pages Deployment

1. Push `frontend/` folder to GitHub
2. Go to repository Settings → Pages
3. Select "Deploy from a branch"
4. Choose `main` branch and `/frontend` folder
5. Your site is live at `https://username.github.io/repository`

### Option 2: Using GitHub Actions (Auto-deploy)

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches: [ main ]
    paths: [ 'frontend/**' ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Deploy
        run: |
          mkdir -p build
          cp -r frontend/* build/
      - uses: peaceiris/actions-gh-pages@v3
        with:
          github_token: ${{ secrets.GITHUB_TOKEN }}
          publish_dir: ./build
```

## Real-time Updates

By default, the app uses Sanity's CDN (`useCdn: true`). For real-time updates:

1. Set `useCdn: false` in `sanityClient.js`
2. Consider adding a refresh button or WebSocket listener for live updates

## Customization

### Change Styling
Edit `src/styles/main.css` - CSS variables at the top make theming easy

### Add More Sections
1. Create new schema in `sanity/schemas/`
2. Add GROQ query to `sanityClient.js`
3. Create render function in `app.js`

### Connect Form to Backend
In `src/scripts/app.js`, `handleFormSubmit()` function:

```javascript
// Replace with your backend/email service
await fetch('YOUR_BACKEND_URL/contact', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify(data)
})
```

## Troubleshooting

### "CORS error" or "Cannot fetch from Sanity"
- Check CORS origins are configured in Sanity
- Verify projectId is correct
- Ensure dataset is `production` or matches your Sanity dataset

### Content not showing
- Open browser console (F12) to check for errors
- Verify content documents exist in Sanity Studio
- Try refreshing the page

### Theme colors not applying
- Ensure `primaryColor` and `secondaryColor` exist in site configuration in Sanity
- Colors must be valid hex codes (e.g., `#667eea`)
