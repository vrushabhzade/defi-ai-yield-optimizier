# 🚀 Deployment Guide - DeFi AI Yield Optimizer

## Prerequisites

Before deploying, ensure you have:

1. **Vercel Account** - Sign up at https://vercel.com
2. **GitHub Repository** - Push your code to GitHub
3. **API Keys**:
   - Anthropic Claude API Key (https://console.anthropic.com/)
   - WalletConnect Project ID (https://cloud.walletconnect.com/) - Optional

## Step 1: Prepare for Deployment

### 1.1 Test Production Build Locally

```bash
npm run build
npm run preview
```

Visit `http://localhost:4173` to test the production build.

### 1.2 Verify Environment Variables

Check that `.env.example` has all required variables:

```env
# Google Gemini AI (REQUIRED for AI features)
VITE_GEMINI_API_KEY=your_gemini_api_key_here

# Blockchain RPC (Optional - uses public RPC if not set)
VITE_BNB_RPC_URL=https://bsc-dataseed.binance.org/

# WalletConnect (Optional - MetaMask will work without this)
VITE_WALLETCONNECT_PROJECT_ID=your_project_id_here
```

## Step 2: Deploy to Vercel

### Option A: Deploy via Vercel Dashboard (Recommended)

1. **Go to Vercel Dashboard**
   - Visit https://vercel.com/new
   - Click "Import Project"

2. **Import Git Repository**
   - Select your GitHub repository
   - Click "Import"

3. **Configure Project**
   - Framework Preset: **Vite**
   - Root Directory: `./` (leave as is)
   - Build Command: `npm run build`
   - Output Directory: `dist`

4. **Add Environment Variables**
   
   Click "Environment Variables" and add:
   
   | Name | Value | Environment |
   |------|-------|-------------|
   | `GEMINI_API_KEY` | Your Google API key | Production, Preview |
   | `VITE_GEMINI_API_KEY` | Your Google API key | Production, Preview |
   | `VITE_WALLETCONNECT_PROJECT_ID` | Your WalletConnect ID | Production, Preview |
   | `VITE_BNB_RPC_URL` | `https://bsc-dataseed.binance.org/` | Production, Preview |

   > **Important**: Add both `GEMINI_API_KEY` (for serverless function) and `VITE_GEMINI_API_KEY` (for client fallback)

5. **Deploy**
   - Click "Deploy"
   - Wait for build to complete (~2-3 minutes)
   - Your app will be live at `https://your-project.vercel.app`

### Option B: Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy to production
vercel --prod
```

Follow the prompts and add environment variables when asked.

## Step 3: Configure Environment Variables

After deployment, add environment variables in Vercel Dashboard:

1. Go to your project in Vercel
2. Click **Settings** → **Environment Variables**
3. Add the following:

### Required Variables

```
GEMINI_API_KEY=AIzaSy...
VITE_GEMINI_API_KEY=AIzaSy...
```

### Optional Variables

```
VITE_WALLETCONNECT_PROJECT_ID=xxxxx
VITE_BNB_RPC_URL=https://bsc-dataseed.binance.org/
```

## Step 4: Verify Deployment

### 4.1 Check Build Logs

- Go to **Deployments** tab
- Click on latest deployment
- Check build logs for errors

### 4.2 Test Features

Visit your deployed URL and test:

- ✅ **Wallet Connection** - Connect MetaMask
- ✅ **Live Data** - Verify yield opportunities load
- ✅ **Gemini AI Recommendations** - Click "Optimize with Gemini"
- ✅ **Transactions** - Try "Invest Now" (on testnet first!)

### 4.3 Check Serverless Function

The AI serverless function should be at:
```
https://your-project.vercel.app/api/ai-recommendations
```

## Step 5: Custom Domain (Optional)

### Add Custom Domain

1. Go to **Settings** → **Domains**
2. Click "Add Domain"
3. Enter your domain (e.g., `defi-optimizer.com`)
4. Follow DNS configuration instructions

### Update DNS Records

Add these records to your domain provider:

```
Type: A
Name: @
Value: 76.76.21.21

Type: CNAME
Name: www
Value: cname.vercel-dns.com
```

## Troubleshooting

### Build Fails

**Error**: `Module not found`
- **Fix**: Run `npm install` and commit `package-lock.json`

**Error**: `Environment variable not found`
- **Fix**: Add missing variables in Vercel dashboard

### AI Recommendations Not Working

**Issue**: Returns mock data
- **Fix**: Verify `GEMINI_API_KEY` is set in Vercel
- **Check**: Serverless function logs in Vercel dashboard

### Wallet Connection Fails

**Issue**: MetaMask doesn't connect
- **Fix**: Ensure you're on BSC Mainnet (Chain ID: 56)
- **Check**: Browser console for errors

### Transactions Fail

**Issue**: "Insufficient funds" or "Transaction rejected"
- **Fix**: Ensure you have BNB for gas fees
- **Check**: You're on correct network (BSC Mainnet)

## Production Checklist

Before going live with real funds:

- [ ] Test all features on BSC Testnet
- [ ] Verify environment variables are set
- [ ] Check serverless function works
- [ ] Test wallet connection
- [ ] Verify AI recommendations load
- [ ] Test transaction flow (approval + deposit)
- [ ] Monitor Vercel function logs
- [ ] Set up error tracking (Sentry, etc.)
- [ ] Add analytics (Google Analytics, etc.)

## Security Best Practices

> **CRITICAL**: Never commit API keys to Git!

1. **API Keys**
   - Store in Vercel environment variables only
   - Never expose in client-side code
   - Use serverless function for AI calls

2. **Smart Contracts**
   - Only interact with verified contracts
   - Test on testnet first
   - Double-check contract addresses

3. **User Funds**
   - Display clear warnings before transactions
   - Show gas estimates
   - Implement slippage protection

## Monitoring & Maintenance

### Monitor Vercel Functions

- Go to **Functions** tab in Vercel
- Check invocation count and errors
- Monitor response times

### Update Dependencies

```bash
npm update
npm audit fix
```

### Redeploy

Vercel auto-deploys on Git push. To manually redeploy:

```bash
vercel --prod
```

## Cost Estimates

### Vercel
- **Hobby Plan**: Free
  - 100 GB bandwidth/month
  - Serverless function executions: 100 GB-hours

### Google Gemini AI
- **Free Tier**: Extensive free tier (Rate limited)
- **Pay-as-you-go**: Competitive pricing
- **Estimated**: Likely free for moderate usage

### RPC Calls
- **Public RPC**: Free (rate-limited)
- **Alchemy/Infura**: Free tier available

**Total Monthly Cost**: ~$0 for moderate usage with free tiers

## Next Steps

1. **Test thoroughly** on testnet
2. **Monitor usage** and costs
3. **Gather feedback** from users
4. **Iterate** on features
5. **Scale** as needed

---

**Deployment Complete!** 🎉

Your DeFi AI Yield Optimizer is now live and ready to help users optimize their yields!

**Support**: For issues, check Vercel logs and browser console.
