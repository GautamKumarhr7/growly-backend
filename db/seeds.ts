// seed.ts
import mongoose from "mongoose";
import {
  roles,
  UserModel,
  GrowlyModel,
  CampaignModel,
  AdCreativeModel,
} from "./schema";
import { dbConnection } from "./connections";

const MONGO_URI = "mongodb://localhost:27017/growly_app"; // change if needed

async function runSeed() {
  try {
    await dbConnection();

    // Clear existing data
    await UserModel.deleteMany({});
    await GrowlyModel.deleteMany({});
    await CampaignModel.deleteMany({});
    await AdCreativeModel.deleteMany({});

    console.log("🗑 Cleared old data");

    // Create users
    const user1 = await UserModel.create({
      name: "John Doe",
      email: "john@example.com",
      password: "hashed_password_1",
      role: roles.Regular,
    });

    const user2 = await UserModel.create({
      name: "Jane Admin",
      email: "jane@example.com",
      password: "hashed_password_2",
      role: roles.Admin,
    });

    console.log("👤 Users inserted:", [user1._id, user2._id]);

    // Create growly posts linked to users
    await GrowlyModel.create([
      {
        user_id: user1._id,
        text: "First growly post",
        headline: "Hello World",
        image: "image1.jpg",
      },
      {
        user_id: user2._id,
        text: "Admin announcement",
        headline: "Important Update",
        image: "image2.jpg",
      },
    ]);

    console.log("📝 Growly posts inserted");

    // Create sample campaigns
    const campaign1 = await CampaignModel.create({
      user_id: user1._id,
      name: "Summer Sale Campaign",
      platform: "meta",
      objective: "Increase sales",
      budget: 1000,
      targetAudience: {
        age: "25-45",
        interests: ["fashion", "shopping"],
        location: "United States",
      },
      description: "Promote summer collection with special discounts",
      status: "active",
    });

    const campaign2 = await CampaignModel.create({
      user_id: user2._id,
      name: "Google Ads Lead Generation",
      platform: "google",
      objective: "Generate leads",
      budget: 2000,
      targetAudience: {
        age: "30-55",
        interests: ["business", "technology"],
        location: "United States",
      },
      description: "Generate qualified leads for B2B services",
      status: "draft",
    });

    console.log("📊 Campaigns inserted:", [campaign1._id, campaign2._id]);

    // Create sample ad creatives
    await AdCreativeModel.create([
      {
        user_id: user1._id,
        campaign_id: campaign1._id,
        platform: "meta",
        ad_type: "image",
        headline: "Transform Your Summer Style Today!",
        description:
          "Experience the future of summer fashion. Perfect for fashion enthusiasts. Get started today and see the difference! Limited time offer available.",
        image_url:
          "https://api.unsplash.com/photos/random?query=fashion&client_id=your_unsplash_client_id&orientation=landscape",
        call_to_action: "Shop Now",
        target_audience: {
          age: "25-45",
          interests: ["fashion", "shopping"],
        },
        status: "generated",
        ai_generated: true,
      },
      {
        user_id: user2._id,
        campaign_id: campaign2._id,
        platform: "google",
        ad_type: "image",
        headline: "Business Solutions | Premium Quality",
        description:
          "Find the perfect business solution for your needs. Trusted by professionals. Fast delivery, competitive pricing.",
        image_url:
          "https://api.unsplash.com/photos/random?query=business&client_id=your_unsplash_client_id&orientation=landscape",
        call_to_action: "Learn More",
        target_audience: {
          age: "30-55",
          interests: ["business", "technology"],
        },
        status: "draft",
        ai_generated: true,
      },
    ]);

    console.log("🎨 Ad creatives inserted");

    console.log("🎉 Seeding completed successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Seeding failed:", err);
    process.exit(1);
  }
}

runSeed();
