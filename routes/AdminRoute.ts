import express from "express";
import { CreateVendor, GetVendors, GetVendorsById } from "../controllers";

const router = express.Router();

router.post("/vendor", CreateVendor);
router.get("/vendors", GetVendors);
router.get("/vendor/:id", GetVendorsById);

export { router as AdminRoute };
