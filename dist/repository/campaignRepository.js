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
exports.CampaignRepository = void 0;
const schema_1 = require("../db/schema");
class CampaignRepository {
    static create(campaignData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schema_1.CampaignModel.create(campaignData);
        });
    }
    static findById(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schema_1.CampaignModel.findOne({ _id: id, user_id: userId });
        });
    }
    static findByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schema_1.CampaignModel.find({ user_id: userId }).sort({
                created_at: -1,
            });
        });
    }
    static update(id, userId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schema_1.CampaignModel.findOneAndUpdate({ _id: id, user_id: userId }, updateData, { new: true });
        });
    }
    static delete(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schema_1.CampaignModel.findOneAndDelete({ _id: id, user_id: userId });
        });
    }
    static findByPlatform(userId, platform) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schema_1.CampaignModel.find({
                user_id: userId,
                platform,
            }).sort({ created_at: -1 });
        });
    }
}
exports.CampaignRepository = CampaignRepository;
//# sourceMappingURL=campaignRepository.js.map