import { Request, Response, NextFunction } from "express";
import { AdCreativeModel, CampaignModel } from "../db/schema";
import { generateAICreative } from "../services/aiService";

export const generateAdCreative = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      campaignId,
      productDescription,
      targetAudience,
      platform,
      adType,
      brandGuidelines,
      callToAction,
    } = req.body;
    const userId = (req as any).user.id;

    // Validate required fields
    if (!campaignId) {
      return res.status(400).json({
        message: "Please select a campaign first. Campaign ID is required.",
      });
    }

    if (!productDescription || !targetAudience || !platform) {
      return res.status(400).json({
        message:
          "Product description, target audience, and platform are required",
      });
    }

    // Validate platform
    const validPlatforms = ["meta", "google"];
    if (!validPlatforms.includes(platform)) {
      return res.status(400).json({
        message: "Platform must be either 'meta' or 'google'",
      });
    }

    // Verify campaign exists and belongs to user
    const campaign = await CampaignModel.findOne({
      _id: campaignId,
      user_id: userId,
    });

    if (!campaign) {
      return res.status(404).json({
        message: "Campaign not found. Please select a valid campaign first.",
      });
    }

    // Generate AI creative
    const aiCreative = await generateAICreative({
      productDescription,
      targetAudience,
      platform,
      adType: adType || "image",
      brandGuidelines: brandGuidelines || {},
      callToAction: callToAction || "Learn More",
    });

    // Save to database
    const newAdCreative = new AdCreativeModel({
      user_id: userId,
      campaign_id: campaignId,
      platform,
      ad_type: adType || "image",
      headline: aiCreative.headline,
      description: aiCreative.description,
      image_url: aiCreative.imageUrl,
      call_to_action: aiCreative.callToAction,
      target_audience: targetAudience,
      status: "generated",
      ai_generated: true,
    });

    await newAdCreative.save();

    res.status(201).json({
      message: "Ad creative generated successfully",
      adCreative: newAdCreative,
      aiResponse: aiCreative,
      campaign: campaign,
    });
  } catch (error) {
    next(error);
  }
};

export const getAdCreatives = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;
    const { campaignId, platform, status } = req.query;

    let query: any = { user_id: userId };

    if (campaignId) query.campaign_id = campaignId;
    if (platform) query.platform = platform;
    if (status) query.status = status;

    const adCreatives = await AdCreativeModel.find(query)
      .populate("campaign_id", "name platform")
      .sort({ created_at: -1 });

    res.status(200).json({ adCreatives });
  } catch (error) {
    next(error);
  }
};

export const updateAdCreative = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    const updateData = req.body;

    const adCreative = await AdCreativeModel.findOneAndUpdate(
      { _id: id, user_id: userId },
      updateData,
      { new: true }
    );

    if (!adCreative) {
      return res.status(404).json({ message: "Ad creative not found" });
    }

    res.status(200).json({
      message: "Ad creative updated successfully",
      adCreative,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteAdCreative = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;

    const adCreative = await AdCreativeModel.findOneAndDelete({
      _id: id,
      user_id: userId,
    });

    if (!adCreative) {
      return res.status(404).json({ message: "Ad creative not found" });
    }

    res.status(200).json({ message: "Ad creative deleted successfully" });
  } catch (error) {
    next(error);
  }
};
