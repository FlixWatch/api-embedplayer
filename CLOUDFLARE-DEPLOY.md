# Deploying to Cloudflare Pages

This guide explains how to deploy this Next.js application to Cloudflare Pages.

## Building for Cloudflare Pages

1. Run the export command to create a static bundle:

```bash
yarn export
```

2. This will create a `cloudflare-pages` directory containing all the necessary files for deployment.

## Deployment Steps

### Manual Deployment (Recommended for testing)

1. Go to the Cloudflare Pages dashboard: https://dash.cloudflare.com/
2. Click on "Create a project" > "Pages"
3. Choose "Upload assets" deployment option
4. Drag and drop the entire `cloudflare-pages` directory or use the file picker
5. Once uploaded, your site will be deployed and you'll receive a URL to access it

### Continuous Deployment (Optional)

For automated deployments from your Git repository:

1. Push your code to GitHub or another supported Git provider
2. In Cloudflare Pages, create a new project and connect your Git repository
3. Set the build command to `yarn export`
4. Set the build output directory to `cloudflare-pages`
5. Click "Save and Deploy"

## Setting Up Custom Domain (Optional)

1. In your Cloudflare Pages project, go to "Custom domains"
2. Add your domain and follow the instructions to set up DNS records
3. Wait for DNS propagation and SSL certificate issuance

## Troubleshooting

- If you see a blank page, check that all static assets were correctly copied to the `cloudflare-pages` directory
- If navigation doesn't work, remember that this is a static export with client-side routing - all routes need properly generated HTML files
- For API functionality, you'll need to use Cloudflare Workers or another solution, as this is a static site 