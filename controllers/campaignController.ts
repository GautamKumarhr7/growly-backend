import { Request, Response, NextFunction } from "express";
import { CampaignModel } from "../db/schema";

export const createCampaign = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, platform, objective, budget, targetAudience, description } =
      req.body;
    const userId = (req as any).user.id;

    // Validate required fields
    if (!name || !platform || !objective) {
      return res.status(400).json({
        message: "Campaign name, platform, and objective are required",
      });
    }

    // Validate platform
    const validPlatforms = ["meta", "google"];
    if (!validPlatforms.includes(platform)) {
      return res.status(400).json({
        message: "Platform must be either 'meta' or 'google'",
      });
    }

    // Create new campaign
    const newCampaign = new CampaignModel({
      user_id: userId,
      name,
      platform,
      objective,
      budget: budget || 0,
      targetAudience: targetAudience || {},
      description: description || "",
      status: "draft",
    });

    await newCampaign.save();

    res.status(201).json({
      message: "Campaign created successfully",
      campaign: newCampaign,
    });
  } catch (error) {
    next(error);
  }
};

export const getCampaigns = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const userId = (req as any).user.id;
    const campaigns = await CampaignModel.find({ user_id: userId });

    res.status(200).json({ campaigns });
  } catch (error) {
    next(error);
  }
};

export const getCampaignById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;

    const campaign = await CampaignModel.findOne({ _id: id, user_id: userId });

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    res.status(200).json({ campaign });
  } catch (error) {
    next(error);
  }
};

export const updateCampaign = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;
    const updateData = req.body;

    const campaign = await CampaignModel.findOneAndUpdate(
      { _id: id, user_id: userId },
      updateData,
      { new: true }
    );

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    res.status(200).json({
      message: "Campaign updated successfully",
      campaign,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteCampaign = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { id } = req.params;
    const userId = (req as any).user.id;

    const campaign = await CampaignModel.findOneAndDelete({
      _id: id,
      user_id: userId,
    });

    if (!campaign) {
      return res.status(404).json({ message: "Campaign not found" });
    }

    res.status(200).json({ message: "Campaign deleted successfully" });
  } catch (error) {
    next(error);
  }
};
