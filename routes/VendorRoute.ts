import express, { Request, Response, NextFunction } from "express";
import multer from "multer";
import {
  AddFood,
  GetFoods,
  GetVendorProfile,
  updateVendorCoverImage,
  UpdateVendorProfile,
  UpdateVendorService,
  VendorLogin,
} from "../controllers";
import { Authenticate } from "../middlewares/CommonAuth";

const router = express.Router();

//image storage initialization
const imageStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "images");
  },

  filename: function (req, file, cb) {
    cb(null, new Date().toISOString + "_" + file.originalname);
  },
});

const images = multer({ storage: imageStorage }).array("images", 10);

// Authentication
router.post("/login", VendorLogin);

//General Apis
router.use(Authenticate);
router.get("/profile", GetVendorProfile);
router.patch("/profile", UpdateVendorProfile);
router.patch("/coverimage", images, updateVendorCoverImage);
router.patch("/service", UpdateVendorService);

//Foods
router.post("/food", images, AddFood);
router.get("/foods", GetFoods);

export { router as VendorRoute };
