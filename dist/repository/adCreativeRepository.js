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
exports.AdCreativeRepository = void 0;
const schema_1 = require("../db/schema");
class AdCreativeRepository {
    static create(adCreativeData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schema_1.AdCreativeModel.create(adCreativeData);
        });
    }
    static findById(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schema_1.AdCreativeModel.findOne({ _id: id, user_id: userId }).populate("campaign_id", "name platform");
        });
    }
    static findByUserId(userId_1) {
        return __awaiter(this, arguments, void 0, function* (userId, filters = {}) {
            let query = { user_id: userId };
            if (filters.campaignId)
                query.campaign_id = filters.campaignId;
            if (filters.platform)
                query.platform = filters.platform;
            if (filters.status)
                query.status = filters.status;
            return yield schema_1.AdCreativeModel.find(query)
                .populate("campaign_id", "name platform")
                .sort({ created_at: -1 });
        });
    }
    static update(id, userId, updateData) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schema_1.AdCreativeModel.findOneAndUpdate({ _id: id, user_id: userId }, updateData, { new: true });
        });
    }
    static delete(id, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schema_1.AdCreativeModel.findOneAndDelete({ _id: id, user_id: userId });
        });
    }
    static findByCampaign(campaignId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schema_1.AdCreativeModel.find({
                campaign_id: campaignId,
                user_id: userId,
            }).sort({ created_at: -1 });
        });
    }
    static findByPlatform(userId, platform) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield schema_1.AdCreativeModel.find({
                user_id: userId,
                platform,
            })
                .populate("campaign_id", "name platform")
                .sort({ created_at: -1 });
        });
    }
}
exports.AdCreativeRepository = AdCreativeRepository;
//# sourceMappingURL=adCreativeRepository.js.map