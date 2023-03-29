import express, { Request, Response, NextFunction } from "express";
import { Vendor } from "../models";

export const GetFoodAvailability = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pincode = req.params.pinCode;

  const result = await Vendor.find({
    pincode: pincode,
    serviceAvailable: false,
  })
    .sort([["rating", "descending"]])
    .populate("foods");

  if (result.length > 0) {
    return res.status(200).json(result);
  }

  return res.status(400).json({ message: "Data Not found" });
};

export const GetTopRestaurants = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const pincode = req.params.pinCode;

  const result = await Vendor.find({
    pincode: pincode,
    serviceAvailable: false,
  })
    .sort([["rating", "descending"]])
    .limit(10);

  if (result.length > 0) {
    return res.status(200).json(result);
  }

  return res.status(400).json({ message: "Data Not found" });
};

export const GetFoodIn30Min = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const SearchFoods = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};

export const RestaurantById = (
  req: Request,
  res: Response,
  next: NextFunction
) => {};
