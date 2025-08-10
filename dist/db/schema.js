"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdCreativeModel = exports.CampaignModel = exports.GrowlyModel = exports.UserModel = exports.roles = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
var roles;
(function (roles) {
    roles["Admin"] = "admin";
    roles["Regular"] = "regular";
})(roles || (exports.roles = roles = {}));
// Users Schema
const UsersSchema = new mongoose_1.default.Schema({
    _id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        default: () => new mongoose_1.default.Types.ObjectId(),
    },
    name: { type: String, required: true, trim: true },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: { type: String, required: true },
    role: { type: String, enum: Object.values(roles), default: roles.Regular },
    created_at: { type: Date, default: Date.now },
});
exports.UserModel = mongoose_1.default.model("users", UsersSchema);
// Growly Schema
const GrowlySchema = new mongoose_1.default.Schema({
    _id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        default: () => new mongoose_1.default.Types.ObjectId(),
    },
    user_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    text: { type: String, required: true, trim: true },
    headline: { type: String, required: true, trim: true },
    image: { type: String, required: true, trim: true },
});
exports.GrowlyModel = mongoose_1.default.model("growly", GrowlySchema);
// Campaign Schema
const CampaignSchema = new mongoose_1.default.Schema({
    _id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        default: () => new mongoose_1.default.Types.ObjectId(),
    },
    user_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    name: { type: String, required: true, trim: true },
    platform: {
        type: String,
        required: true,
        enum: ["meta", "google"],
    },
    objective: { type: String, required: true, trim: true },
    budget: { type: Number, default: 0 },
    targetAudience: { type: mongoose_1.default.Schema.Types.Mixed, default: {} },
    description: { type: String, trim: true, default: "" },
    status: {
        type: String,
        enum: ["draft", "active", "paused", "completed"],
        default: "draft",
    },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});
exports.CampaignModel = mongoose_1.default.model("campaigns", CampaignSchema);
// Ad Creative Schema
const AdCreativeSchema = new mongoose_1.default.Schema({
    _id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        default: () => new mongoose_1.default.Types.ObjectId(),
    },
    user_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "users",
        required: true,
    },
    campaign_id: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "campaigns",
    },
    platform: {
        type: String,
        required: true,
        enum: ["meta", "google"],
    },
    ad_type: {
        type: String,
        required: true,
        enum: ["image", "video", "carousel", "story"],
    },
    headline: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    image_url: { type: String, required: true, trim: true },
    call_to_action: { type: String, required: true, trim: true },
    target_audience: { type: mongoose_1.default.Schema.Types.Mixed, required: true },
    status: {
        type: String,
        enum: ["draft", "generated", "approved", "rejected", "published"],
        default: "draft",
    },
    ai_generated: { type: Boolean, default: false },
    performance_metrics: { type: mongoose_1.default.Schema.Types.Mixed, default: {} },
    created_at: { type: Date, default: Date.now },
    updated_at: { type: Date, default: Date.now },
});
exports.AdCreativeModel = mongoose_1.default.model("ad_creatives", AdCreativeSchema);
//# sourceMappingURL=schema.js.map