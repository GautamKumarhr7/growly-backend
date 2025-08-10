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
exports.deleteAdCreative = exports.updateAdCreative = exports.getAdCreatives = exports.generateAdCreative = void 0;
const schema_1 = require("../db/schema");
const aiService_1 = require("../services/aiService");
const generateAdCreative = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { campaignId, productDescription, targetAudience, platform, adType, brandGuidelines, callToAction, } = req.body;
        const userId = req.user.id;
        // Validate required fields
        if (!campaignId) {
            return res.status(400).json({
                message: "Please select a campaign first. Campaign ID is required.",
            });
        }
        if (!productDescription || !targetAudience || !platform) {
            return res.status(400).json({
                message: "Product description, target audience, and platform are required",
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
        const campaign = yield schema_1.CampaignModel.findOne({
            _id: campaignId,
            user_id: userId,
        });
        if (!campaign) {
            return res.status(404).json({
                message: "Campaign not found. Please select a valid campaign first.",
            });
        }
        // Generate AI creative
        const aiCreative = yield (0, aiService_1.generateAICreative)({
            productDescription,
            targetAudience,
            platform,
            adType: adType || "image",
            brandGuidelines: brandGuidelines || {},
            callToAction: callToAction || "Learn More",
        });
        // Save to database
        const newAdCreative = new schema_1.AdCreativeModel({
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
        yield newAdCreative.save();
        res.status(201).json({
            message: "Ad creative generated successfully",
            adCreative: newAdCreative,
            aiResponse: aiCreative,
            campaign: campaign,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.generateAdCreative = generateAdCreative;
const getAdCreatives = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const { campaignId, platform, status } = req.query;
        let query = { user_id: userId };
        if (campaignId)
            query.campaign_id = campaignId;
        if (platform)
            query.platform = platform;
        if (status)
            query.status = status;
        const adCreatives = yield schema_1.AdCreativeModel.find(query)
            .populate("campaign_id", "name platform")
            .sort({ created_at: -1 });
        res.status(200).json({ adCreatives });
    }
    catch (error) {
        next(error);
    }
});
exports.getAdCreatives = getAdCreatives;
const updateAdCreative = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const updateData = req.body;
        const adCreative = yield schema_1.AdCreativeModel.findOneAndUpdate({ _id: id, user_id: userId }, updateData, { new: true });
        if (!adCreative) {
            return res.status(404).json({ message: "Ad creative not found" });
        }
        res.status(200).json({
            message: "Ad creative updated successfully",
            adCreative,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateAdCreative = updateAdCreative;
const deleteAdCreative = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const adCreative = yield schema_1.AdCreativeModel.findOneAndDelete({
            _id: id,
            user_id: userId,
        });
        if (!adCreative) {
            return res.status(404).json({ message: "Ad creative not found" });
        }
        res.status(200).json({ message: "Ad creative deleted successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteAdCreative = deleteAdCreative;
//# sourceMappingURL=adCreativeController.js.map