import { CampaignModel } from "../db/schema";
import mongoose from "mongoose";

export class CampaignRepository {
  static async create(campaignData: any) {
    return await CampaignModel.create(campaignData);
  }

  static async findById(id: string, userId: string) {
    return await CampaignModel.findOne({ _id: id, user_id: userId });
  }

  static async findByUserId(userId: string) {
    return await CampaignModel.find({ user_id: userId }).sort({
      created_at: -1,
    });
  }

  static async update(id: string, userId: string, updateData: any) {
    return await CampaignModel.findOneAndUpdate(
      { _id: id, user_id: userId },
      updateData,
      { new: true }
    );
  }

  static async delete(id: string, userId: string) {
    return await CampaignModel.findOneAndDelete({ _id: id, user_id: userId });
  }

  static async findByPlatform(userId: string, platform: string) {
    return await CampaignModel.find({
      user_id: userId,
      platform,
    }).sort({ created_at: -1 });
  }
}
