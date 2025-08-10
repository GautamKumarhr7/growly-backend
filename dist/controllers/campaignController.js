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
exports.deleteCampaign = exports.updateCampaign = exports.getCampaignById = exports.getCampaigns = exports.createCampaign = void 0;
const schema_1 = require("../db/schema");
const createCampaign = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, platform, objective, budget, targetAudience, description } = req.body;
        const userId = req.user.id;
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
        const newCampaign = new schema_1.CampaignModel({
            user_id: userId,
            name,
            platform,
            objective,
            budget: budget || 0,
            targetAudience: targetAudience || {},
            description: description || "",
            status: "draft",
        });
        yield newCampaign.save();
        res.status(201).json({
            message: "Campaign created successfully",
            campaign: newCampaign,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.createCampaign = createCampaign;
const getCampaigns = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.user.id;
        const campaigns = yield schema_1.CampaignModel.find({ user_id: userId });
        res.status(200).json({ campaigns });
    }
    catch (error) {
        next(error);
    }
});
exports.getCampaigns = getCampaigns;
const getCampaignById = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const campaign = yield schema_1.CampaignModel.findOne({ _id: id, user_id: userId });
        if (!campaign) {
            return res.status(404).json({ message: "Campaign not found" });
        }
        res.status(200).json({ campaign });
    }
    catch (error) {
        next(error);
    }
});
exports.getCampaignById = getCampaignById;
const updateCampaign = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const updateData = req.body;
        const campaign = yield schema_1.CampaignModel.findOneAndUpdate({ _id: id, user_id: userId }, updateData, { new: true });
        if (!campaign) {
            return res.status(404).json({ message: "Campaign not found" });
        }
        res.status(200).json({
            message: "Campaign updated successfully",
            campaign,
        });
    }
    catch (error) {
        next(error);
    }
});
exports.updateCampaign = updateCampaign;
const deleteCampaign = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const campaign = yield schema_1.CampaignModel.findOneAndDelete({
            _id: id,
            user_id: userId,
        });
        if (!campaign) {
            return res.status(404).json({ message: "Campaign not found" });
        }
        res.status(200).json({ message: "Campaign deleted successfully" });
    }
    catch (error) {
        next(error);
    }
});
exports.deleteCampaign = deleteCampaign;
//# sourceMappingURL=campaignController.js.map