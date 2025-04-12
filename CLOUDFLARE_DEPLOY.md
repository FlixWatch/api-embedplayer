# Deploying to Cloudflare Pages

This guide will help you deploy this Next.js application to Cloudflare Pages.

## Prerequisites

- A Cloudflare account
- Node.js version 18.17.0 or later
- Git installed on your machine

## Deployment Steps

### 1. Push your code to a Git repository

If your code isn't already in a Git repository:

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin YOUR_REPOSITORY_URL
git push -u origin main
```

### 2. Connect to Cloudflare Pages

1. Log in to the Cloudflare dashboard
2. Navigate to **Pages**
3. Click **Create a project**
4. Select **Connect to Git**
5. Choose your repository provider and authenticate
6. Select the repository with your Next.js app

### 3. Configure your build settings

Use these settings:

- **Project name**: embedded-player-next (or your preferred name)
- **Production branch**: main (or your default branch)
- **Build command**: npm run build
- **Build output directory**: .next
- **Node.js version**: 18.17.0 (matches .node-version file)

### 4. Environment Variables (optional)

If needed, add environment variables in the Cloudflare Pages dashboard.

### 5. Deploy

Click **Save and Deploy** to start the deployment process.

## Post-Deployment

After deployment, you can:

- Set up a custom domain in the Cloudflare Pages dashboard
- Configure additional environment variables for production
- Set up preview deployments for branches

## Troubleshooting

If you encounter issues:

1. Check the build logs in the Cloudflare dashboard
2. Ensure your Next.js configuration is set to `output: 'standalone'`
3. Verify Node.js version compatibility
4. Check that all dependencies are properly specified in package.json

## Resources

- [Cloudflare Pages Documentation](https://developers.cloudflare.com/pages/)
- [Next.js on Cloudflare Pages](https://developers.cloudflare.com/pages/framework-guides/deploy-a-nextjs-site/) 