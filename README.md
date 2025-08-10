# Growly - AI-Powered Ad Creative Generation

A SaaS tool that helps small businesses generate ad creatives (images + text + headlines) using AI for Meta and Google Ads.

## 🚀 Features

- **User Authentication**: Secure JWT-based authentication system
- **Campaign Management**: Create and manage advertising campaigns
- **AI-Powered Creative Generation**: Generate ad creatives with AI for Meta and Google Ads
- **Multi-Platform Support**: Support for Meta (Facebook/Instagram) and Google Ads
- **Creative Management**: Store, update, and manage generated ad creatives
- **Role-Based Access**: Admin and regular user roles

## 🛠 Tech Stack

- **Backend**: Node.js with Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT tokens with bcrypt password hashing
- **Language**: TypeScript
- **AI Integration**: Simulated AI service for creative generation

## 📋 API Endpoints

### Authentication

| Method | Endpoint    | Description                  |
| ------ | ----------- | ---------------------------- |
| `POST` | `/register` | Register a new user          |
| `POST` | `/login`    | User login and get JWT token |

### Campaigns (Protected Routes)

| Method   | Endpoint                       | Description                    |
| -------- | ------------------------------ | ------------------------------ |
| `POST`   | `/api/creatives/campaigns`     | Create a new campaign          |
| `GET`    | `/api/creatives/campaigns`     | Get all campaigns for the user |
| `PUT`    | `/api/creatives/campaigns/:id` | Update a campaign              |
| `DELETE` | `/api/creatives/campaigns/:id` | Delete a campaign              |

### Ad Creatives (Protected Routes)

| Method   | Endpoint                  | Description                       |
| -------- | ------------------------- | --------------------------------- |
| `POST`   | `/api/creatives/generate` | Generate AI-powered ad creative   |
| `GET`    | `/api/creatives`          | Get all ad creatives for the user |
| `PUT`    | `/api/creatives/:id`      | Update an ad creative             |
| `DELETE` | `/api/creatives/:id`      | Delete an ad creative             |

## 📝 Request Examples

### Create Campaign

```bash
POST /api/creatives/campaigns
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "name": "Summer Sale Campaign",
  "platform": "meta",
  "objective": "Increase sales",
  "budget": 1000,
  "targetAudience": {
    "age": "25-45",
    "interests": ["fashion", "shopping"],
    "location": "United States"
  },
  "description": "Promote summer collection with special discounts"
}
```

### Generate Ad Creative

```bash
POST /api/creatives/generate
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "campaignId": "campaign_id_here",
  "productDescription": "Premium summer fashion collection",
  "targetAudience": "Fashion-conscious women aged 25-45",
  "platform": "meta",
  "adType": "image",
  "brandGuidelines": {
    "colors": ["#FF6B6B", "#4ECDC4"],
    "tone": "casual and friendly"
  },
  "callToAction": "Shop Now"
}
```

## 🗄 Database Schema

### Users

```typescript
{
  name: String (required),
  email: String (required, unique),
  password: String (required, hashed),
  role: Enum (admin, regular),
  created_at: Date
}
```

### Campaigns

```typescript
{
  user_id: ObjectId (ref: users),
  name: String (required),
  platform: Enum (meta, google),
  objective: String (required),
  budget: Number,
  targetAudience: Mixed,
  description: String,
  status: Enum (draft, active, paused, completed)
}
```

### Ad Creatives

```typescript
{
  user_id: ObjectId (ref: users),
  campaign_id: ObjectId (ref: campaigns),
  platform: Enum (meta, google),
  ad_type: Enum (image, video, carousel, story),
  headline: String (required),
  description: String (required),
  image_url: String (required),
  call_to_action: String (required),
  target_audience: Mixed (required),
  status: Enum (draft, generated, approved, rejected, published),
  ai_generated: Boolean
}
```

## ⚙️ Setup Instructions

### 1. Prerequisites

- Node.js (v14 or higher)
- MongoDB (local or cloud instance)
- npm or yarn

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Variables

Create a `.env` file in the root directory:

```env
MONGOOSE_URL=mongodb://localhost:27017/growly_app
JWT_SECRET=your_super_secret_jwt_key_here
PORT=3002
```

### 4. Database Setup

```bash
# Run migrations to create indexes
npm run migrate

# Seed database with sample data
npm run seed
```

### 5. Start Development Server

```bash
npm run dev
```

The server will start on `http://localhost:3002`

## 🤖 AI Integration

The current implementation includes a simulated AI service that generates:

- **Platform-specific headlines** (Meta vs Google Ads)
- **Compelling descriptions** tailored to the target audience
- **Image URLs** (integrated with Unsplash API)
- **Call-to-action buttons** optimized for conversion

### To integrate with real AI services:

Replace the functions in `services/aiService.ts` with actual AI API calls:

- **OpenAI GPT** for text generation
- **DALL-E** for image generation
- **Stable Diffusion** for custom images
- **Claude** for copywriting

## 📁 Project Structure

```
growly/
├── controllers/          # Request handlers
│   ├── login.ts
│   ├── userRegister.ts
│   ├── campaignController.ts
│   └── adCreativeController.ts
├── db/                   # Database files
│   ├── connections.ts
│   ├── schema.ts
│   ├── migrations.ts
│   └── seeds.ts
├── middlewares/          # Express middlewares
│   └── auth.middleware.ts
├── repository/           # Data access layer
│   ├── campaignRepository.ts
│   └── adCreativeRepository.ts
├── routes/               # API routes
│   └── adCreatives.ts
├── services/             # Business logic
│   └── aiService.ts
├── app.ts               # Express app setup
├── server.ts            # Server entry point
└── package.json
```

## 🔧 Available Scripts

```bash
npm run dev          # Start development server with nodemon
npm run migrate      # Run database migrations
npm run seed         # Seed database with sample data
```

## 🧪 Testing the API

### 1. Register a user

```bash
curl -X POST http://localhost:3002/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123",
    "role": "regular"
  }'
```

### 2. Login to get JWT token

```bash
curl -X POST http://localhost:3002/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 3. Create a campaign (use the token from login)

```bash
curl -X POST http://localhost:3002/api/creatives/campaigns \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Test Campaign",
    "platform": "meta",
    "objective": "Increase sales"
  }'
```

## 🚀 Future Enhancements

- [ ] **Real AI Integration**: OpenAI, DALL-E, Claude APIs
- [ ] **Image Generation**: Custom image creation and editing
- [ ] **A/B Testing**: Test different creative variations
- [ ] **Performance Analytics**: Track ad performance metrics
- [ ] **Bulk Operations**: Generate multiple creatives at once
- [ ] **Template System**: Reusable creative templates
- [ ] **Ad Platform Integration**: Direct upload to Meta/Google Ads
- [ ] **Brand Guidelines**: Automated brand compliance
- [ ] **Collaboration**: Team member access and permissions
- [ ] **Export Options**: Download creatives in various formats

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 📞 Support

For support and questions:

- Create an issue in the repository
- Email: support@growly.com
- Documentation: [docs.growly.com](https://docs.growly.com)

---

**Growly** - Empowering small businesses with AI-powered ad creative generation 🚀
