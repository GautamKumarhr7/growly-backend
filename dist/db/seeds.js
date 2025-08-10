"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const schema_1 = require("./schema");
const connections_1 = require("./connections");
const MONGO_URI = "mongodb://localhost:27017/growly_app"; // change if needed
function runSeed() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, connections_1.dbConnection)();
            // Clear existing data
            yield schema_1.UserModel.deleteMany({});
            yield schema_1.GrowlyModel.deleteMany({});
            yield schema_1.CampaignModel.deleteMany({});
            yield schema_1.AdCreativeModel.deleteMany({});
            console.log("🗑 Cleared old data");
            // Create users
            const user1 = yield schema_1.UserModel.create({
                name: "John Doe",
                email: "john@example.com",
                password: "hashed_password_1",
                role: schema_1.roles.Regular,
            });
            const user2 = yield schema_1.UserModel.create({
                name: "Jane Admin",
                email: "jane@example.com",
                password: "hashed_password_2",
                role: schema_1.roles.Admin,
            });
            console.log("👤 Users inserted:", [user1._id, user2._id]);
            // Create growly posts linked to users
            yield schema_1.GrowlyModel.create([
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
            const campaign1 = yield schema_1.CampaignModel.create({
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
            const campaign2 = yield schema_1.CampaignModel.create({
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
            yield schema_1.AdCreativeModel.create([
                {
                    user_id: user1._id,
                    campaign_id: campaign1._id,
                    platform: "meta",
                    ad_type: "image",
                    headline: "Transform Your Summer Style Today!",
                    description: "Experience the future of summer fashion. Perfect for fashion enthusiasts. Get started today and see the difference! Limited time offer available.",
                    image_url: "https://api.unsplash.com/photos/random?query=fashion&client_id=your_unsplash_client_id&orientation=landscape",
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
                    description: "Find the perfect business solution for your needs. Trusted by professionals. Fast delivery, competitive pricing.",
                    image_url: "https://api.unsplash.com/photos/random?query=business&client_id=your_unsplash_client_id&orientation=landscape",
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
        }
        catch (err) {
            console.error("❌ Seeding failed:", err);
            process.exit(1);
        }
    });
}
runSeed();
//# sourceMappingURL=seeds.js.map