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
function runMigration() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield (0, connections_1.dbConnection)();
            // Ensure indexes for users
            yield schema_1.UserModel.init();
            console.log("✅ Users collection indexes created");
            // Ensure indexes for growly
            yield schema_1.GrowlyModel.init();
            console.log("✅ Growly collection indexes created");
            // Ensure indexes for campaigns
            yield schema_1.CampaignModel.init();
            console.log("✅ Campaigns collection indexes created");
            // Ensure indexes for ad creatives
            yield schema_1.AdCreativeModel.init();
            console.log("✅ Ad Creatives collection indexes created");
            console.log("🎉 Migration completed successfully");
            process.exit(0);
        }
        catch (err) {
            console.error("❌ Migration failed:", err);
            process.exit(1);
        }
    });
}
runMigration();
//# sourceMappingURL=migrations.js.map