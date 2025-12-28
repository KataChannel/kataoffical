# 🚀 Quick Start - Rausach V3 Deployment

## Deployment Info
- **Frontend**: http://116.118.49.243:12100
- **Backend**: http://116.118.49.243:12101  
- **Database**: rausachv3@116.118.49.243:55432
- **Path**: /opt/rausachv3

## One Command Deploy
```bash
./deploy-v3.sh all
```

## Step by Step
```bash
# 1. Build images
./deploy-v3.sh build

# 2. Upload to server
./deploy-v3.sh upload

# 3. Deploy
./deploy-v3.sh deploy
```

## NPM Scripts
```bash
npm run deploy:v3        # Full deploy
npm run deploy:v3:build  # Build only
npm run deploy:v3:info   # Show info
```

## Quick Reference
```bash
./deploy-info.sh
```

## Documentation
- 📖 Full Guide: [DEPLOYMENT_V3.md](DEPLOYMENT_V3.md)
- 📋 Summary: [DEPLOYMENT_SUMMARY.md](DEPLOYMENT_SUMMARY.md)

---
✅ Ready to deploy!
