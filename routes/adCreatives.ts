import { Router } from "express";
import {
  createCampaign,
  getCampaigns,
  getCampaignById,
  updateCampaign,
  deleteCampaign,
} from "../controllers/campaignController";
import {
  generateAdCreative,
  getAdCreatives,
  updateAdCreative,
  deleteAdCreative,
} from "../controllers/adCreativeController";
import { authMiddleware } from "../middlewares/auth.middleware";

const router = Router();

// Apply auth middleware to all routes
router.use(authMiddleware);

// Campaign routes
router.post("/campaigns", createCampaign);
router.get("/campaigns", getCampaigns);
router.get("/campaigns/:id", getCampaignById);
router.put("/campaigns/:id", updateCampaign);
router.delete("/campaigns/:id", deleteCampaign);

// Ad Creative routes
router.post("/generate", generateAdCreative);
router.get("/", getAdCreatives);
router.put("/:id", updateAdCreative);
router.delete("/:id", deleteAdCreative);

export default router;
