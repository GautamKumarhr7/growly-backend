"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const campaignController_1 = require("../controllers/campaignController");
const adCreativeController_1 = require("../controllers/adCreativeController");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
// Apply auth middleware to all routes
router.use(auth_middleware_1.authMiddleware);
// Campaign routes
router.post("/campaigns", campaignController_1.createCampaign);
router.get("/campaigns", campaignController_1.getCampaigns);
router.get("/campaigns/:id", campaignController_1.getCampaignById);
router.put("/campaigns/:id", campaignController_1.updateCampaign);
router.delete("/campaigns/:id", campaignController_1.deleteCampaign);
// Ad Creative routes
router.post("/generate", adCreativeController_1.generateAdCreative);
router.get("/", adCreativeController_1.getAdCreatives);
router.put("/:id", adCreativeController_1.updateAdCreative);
router.delete("/:id", adCreativeController_1.deleteAdCreative);
exports.default = router;
//# sourceMappingURL=adCreatives.js.map