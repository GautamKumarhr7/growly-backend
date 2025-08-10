import mongoose from "mongoose";

export enum roles {
  Admin = "admin",
  Regular = "regular",
}

// Users Schema

const UsersSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
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

export const UserModel = mongoose.model("users", UsersSchema);

// Growly Schema

const GrowlySchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  text: { type: String, required: true, trim: true },
  headline: { type: String, required: true, trim: true },
  image: { type: String, required: true, trim: true },
});

export const GrowlyModel = mongoose.model("growly", GrowlySchema);

// Campaign Schema
const CampaignSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
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
  targetAudience: { type: mongoose.Schema.Types.Mixed, default: {} },
  description: { type: String, trim: true, default: "" },
  status: {
    type: String,
    enum: ["draft", "active", "paused", "completed"],
    default: "draft",
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const CampaignModel = mongoose.model("campaigns", CampaignSchema);

// Ad Creative Schema
const AdCreativeSchema = new mongoose.Schema({
  _id: {
    type: mongoose.Schema.Types.ObjectId,
    default: () => new mongoose.Types.ObjectId(),
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  campaign_id: {
    type: mongoose.Schema.Types.ObjectId,
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
  target_audience: { type: mongoose.Schema.Types.Mixed, required: true },
  status: {
    type: String,
    enum: ["draft", "generated", "approved", "rejected", "published"],
    default: "draft",
  },
  ai_generated: { type: Boolean, default: false },
  performance_metrics: { type: mongoose.Schema.Types.Mixed, default: {} },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

export const AdCreativeModel = mongoose.model("ad_creatives", AdCreativeSchema);
