# Deploy Growly to Render

## Prerequisites

- GitHub repository with your code
- MongoDB database (MongoDB Atlas recommended)
- Render account

## Step 1: Prepare Your Database

### Option A: MongoDB Atlas (Recommended)

1. Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
2. Create a free cluster
3. Get your connection string (it looks like: `mongodb+srv://username:password@cluster.mongodb.net/growly_app`)

### Option B: Render MongoDB

1. In Render dashboard, create a new MongoDB service
2. Use the provided connection string

## Step 2: Deploy to Render

### Method 1: Connect GitHub Repository

1. Go to [Render Dashboard](https://dashboard.render.com)
2. Click "New +" → "Web Service"
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `growly-api`
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Free

### Method 2: Manual Deployment

1. Push your code to GitHub
2. In Render dashboard, create new Web Service
3. Connect to your repository
4. Use the same configuration as above

## Step 3: Configure Environment Variables

In your Render service dashboard, add these environment variables:

| Variable       | Value                                 |
| -------------- | ------------------------------------- |
| `NODE_ENV`     | `production`                          |
| `PORT`         | `10000`                               |
| `MONGOOSE_URL` | Your MongoDB connection string        |
| `JWT_SECRET`   | A long, random string for JWT signing |

### Example JWT_SECRET:

```
your_super_secret_jwt_key_here_change_this_in_production_12345
```

## Step 4: Deploy and Test

1. Click "Create Web Service"
2. Wait for the build to complete
3. Your API will be available at: `https://your-app-name.onrender.com`

## Step 5: Test Your API

### Test the health check:

```bash
curl https://your-app-name.onrender.com/
```

### Register a user:

```bash
curl -X POST https://your-app-name.onrender.com/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test User",
    "email": "test@example.com",
    "password": "password123",
    "role": "regular"
  }'
```

## Troubleshooting

### Common Issues:

1. **Build fails**: Check that all dependencies are in `package.json`
2. **Database connection fails**: Verify your MongoDB connection string
3. **Port issues**: Render uses port 10000 by default
4. **Environment variables**: Make sure all required variables are set

### Logs:

- Check Render dashboard → Your service → Logs
- Look for any error messages during build or runtime

## Production Considerations

1. **Database**: Use MongoDB Atlas for production
2. **Security**: Use a strong JWT_SECRET
3. **CORS**: Update CORS settings for your frontend domain
4. **Monitoring**: Set up health checks and monitoring

## Update CORS for Production

In `app.ts`, update the CORS origin to your frontend domain:

```typescript
app.use(
  cors({
    origin: "https://your-frontend-domain.com", // Update this
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
```

## Final Notes

- Your API will be available at: `https://your-app-name.onrender.com`
- Free tier has limitations (sleeps after inactivity)
- Consider upgrading to paid plan for production use
- Monitor your service logs for any issues
