# 🚀 Deployment Guide

This guide will help you deploy the AI-Powered Resume & Portfolio Builder to various platforms.

---

## 🌐 Vercel (Recommended)

Vercel is the easiest and fastest way to deploy Next.js applications.

### One-Click Deploy

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/madara88645/resume-portfolio-builder&env=OPENAI_API_KEY&envDescription=OpenAI%20API%20key%20for%20AI%20generation&envLink=https://platform.openai.com/api-keys)

### Manual Deploy

1. **Install Vercel CLI**
   ```bash
   npm i -g vercel
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```

4. **Add Environment Variables**
   ```bash
   vercel env add OPENAI_API_KEY
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Environment Variables

Add these in your Vercel project settings:

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Optional | OpenAI API key for AI generation |
| `OPENAI_MODEL` | Optional | Default: `gpt-4o-mini` |
| `OPENAI_PARSER_MODEL` | Optional | Model for parsing |
| `OPENAI_SUMMARY_MODEL` | Optional | Model for summaries |
| `OPENAI_PORTFOLIO_MODEL` | Optional | Model for portfolios |

---

## 📦 Netlify

1. **Build Command:** `npm run build`
2. **Publish Directory:** `.next`
3. **Node Version:** 18+

### Environment Variables
Same as Vercel (see table above)

---

## 🐳 Docker

### Build Image

```bash
docker build -t resume-portfolio-builder .
```

### Run Container

```bash
docker run -p 3000:3000 \
  -e OPENAI_API_KEY=your_key_here \
  resume-portfolio-builder
```

### Docker Compose

Create `docker-compose.yml`:

```yaml
version: '3.8'
services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - OPENAI_API_KEY=${OPENAI_API_KEY}
      - NODE_ENV=production
```

Run:
```bash
docker-compose up
```

---

## ☁️ AWS

### AWS Amplify

1. Connect your GitHub repository
2. Configure build settings:
   - Build command: `npm run build`
   - Output directory: `.next`
3. Add environment variables
4. Deploy

### AWS EC2

1. Launch Ubuntu instance
2. Install Node.js 18+
3. Clone repository
4. Install dependencies: `npm install`
5. Build: `npm run build`
6. Start with PM2: `pm2 start npm --name "portfolio" -- start`
7. Configure nginx as reverse proxy

---

## 🔵 Azure

### Azure Static Web Apps

1. Install Azure Static Web Apps CLI:
   ```bash
   npm install -g @azure/static-web-apps-cli
   ```

2. Deploy:
   ```bash
   swa deploy
   ```

### Azure App Service

1. Create App Service (Node.js 18 LTS)
2. Configure deployment source (GitHub)
3. Set environment variables
4. Deploy

---

## 🎯 Custom Server

### Requirements
- Node.js 18.17+
- npm or yarn
- Process manager (PM2 recommended)

### Steps

1. **Clone & Install**
   ```bash
   git clone https://github.com/madara88645/resume-portfolio-builder.git
   cd resume-portfolio-builder
   npm install
   ```

2. **Environment Setup**
   ```bash
   cp .env.example .env.local
   # Edit .env.local with your values
   ```

3. **Build**
   ```bash
   npm run build
   ```

4. **Start with PM2**
   ```bash
   npm install -g pm2
   pm2 start npm --name "resume-portfolio" -- start
   pm2 save
   pm2 startup
   ```

5. **Configure Nginx**
   ```nginx
   server {
       listen 80;
       server_name yourdomain.com;

       location / {
           proxy_pass http://localhost:3000;
           proxy_http_version 1.1;
           proxy_set_header Upgrade $http_upgrade;
           proxy_set_header Connection 'upgrade';
           proxy_set_header Host $host;
           proxy_cache_bypass $http_upgrade;
       }
   }
   ```

6. **SSL with Let's Encrypt**
   ```bash
   sudo certbot --nginx -d yourdomain.com
   ```

---

## 🔒 Security Considerations

### Environment Variables
- ❌ Never commit `.env.local` or `.env`
- ✅ Use platform-specific secret management
- ✅ Rotate API keys regularly
- ✅ Set up usage limits on OpenAI dashboard

### CORS
- Configure allowed origins if using custom domain
- Restrict API access to your domain

### Rate Limiting
- Implement rate limiting on API routes
- Use Vercel's edge functions or middleware

---

## 📊 Monitoring

### Vercel Analytics
```bash
npm install @vercel/analytics
```

Add to `app/layout.tsx`:
```typescript
import { Analytics } from '@vercel/analytics/react';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
```

### Error Tracking
Consider integrating:
- Sentry
- LogRocket
- Datadog

---

## 🎯 Performance Optimization

### Build Optimization
```bash
# Analyze bundle size
npm install -g next-bundle-analyzer
ANALYZE=true npm run build
```

### Caching
- Enable Vercel's edge caching
- Configure CDN for static assets
- Use Redis for session storage (future)

---

## 🔄 CI/CD

### GitHub Actions

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy to Vercel

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '18'
      - run: npm ci
      - run: npm run build
      - uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
```

---

## 📝 Post-Deployment Checklist

- [ ] Test file upload (PDF, DOCX, TXT)
- [ ] Test sample resumes
- [ ] Verify AI generation (if API key provided)
- [ ] Test mock mode (without API key)
- [ ] Check mobile responsiveness
- [ ] Verify download functionality
- [ ] Test share links
- [ ] Monitor error logs
- [ ] Set up analytics
- [ ] Configure custom domain (optional)
- [ ] Enable HTTPS
- [ ] Test performance (Lighthouse)

---

## 🆘 Troubleshooting

### Build Fails
```bash
# Clear cache
rm -rf .next node_modules package-lock.json
npm install
npm run build
```

### PDF Parsing Issues
- Ensure pdf-parse is listed in dependencies
- Check server logs for detailed errors
- Verify file size limits

### API Rate Limits
- Check OpenAI dashboard for usage
- Implement request throttling
- Consider caching responses

---

## 📞 Support

Need help with deployment?
- 📖 [Documentation](https://github.com/madara88645/resume-portfolio-builder/wiki)
- 🐛 [Report Issues](https://github.com/madara88645/resume-portfolio-builder/issues)
- 💬 [Discussions](https://github.com/madara88645/resume-portfolio-builder/discussions)

---

**Good luck with your deployment! 🚀**
