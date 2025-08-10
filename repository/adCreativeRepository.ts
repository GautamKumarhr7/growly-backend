import { AdCreativeModel } from "../db/schema";
import mongoose from "mongoose";

export class AdCreativeRepository {
  static async create(adCreativeData: any) {
    return await AdCreativeModel.create(adCreativeData);
  }

  static async findById(id: string, userId: string) {
    return await AdCreativeModel.findOne({ _id: id, user_id: userId }).populate(
      "campaign_id",
      "name platform"
    );
  }

  static async findByUserId(userId: string, filters: any = {}) {
    let query: any = { user_id: userId };

    if (filters.campaignId) query.campaign_id = filters.campaignId;
    if (filters.platform) query.platform = filters.platform;
    if (filters.status) query.status = filters.status;

    return await AdCreativeModel.find(query)
      .populate("campaign_id", "name platform")
      .sort({ created_at: -1 });
  }

  static async update(id: string, userId: string, updateData: any) {
    return await AdCreativeModel.findOneAndUpdate(
      { _id: id, user_id: userId },
      updateData,
      { new: true }
    );
  }

  static async delete(id: string, userId: string) {
    return await AdCreativeModel.findOneAndDelete({ _id: id, user_id: userId });
  }

  static async findByCampaign(campaignId: string, userId: string) {
    return await AdCreativeModel.find({
      campaign_id: campaignId,
      user_id: userId,
    }).sort({ created_at: -1 });
  }

  static async findByPlatform(userId: string, platform: string) {
    return await AdCreativeModel.find({
      user_id: userId,
      platform,
    })
      .populate("campaign_id", "name platform")
      .sort({ created_at: -1 });
  }
}
