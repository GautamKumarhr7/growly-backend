// migration.ts
import mongoose from "mongoose";
import {
  UserModel,
  GrowlyModel,
  CampaignModel,
  AdCreativeModel,
} from "./schema";
import { dbConnection } from "./connections";

const MONGO_URI = "mongodb://localhost:27017/growly_app"; // change if needed

async function runMigration() {
  try {
    await dbConnection();

    // Ensure indexes for users
    await UserModel.init();
    console.log("✅ Users collection indexes created");

    // Ensure indexes for growly
    await GrowlyModel.init();
    console.log("✅ Growly collection indexes created");

    // Ensure indexes for campaigns
    await CampaignModel.init();
    console.log("✅ Campaigns collection indexes created");

    // Ensure indexes for ad creatives
    await AdCreativeModel.init();
    console.log("✅ Ad Creatives collection indexes created");

    console.log("🎉 Migration completed successfully");
    process.exit(0);
  } catch (err) {
    console.error("❌ Migration failed:", err);
    process.exit(1);
  }
}

runMigration();
