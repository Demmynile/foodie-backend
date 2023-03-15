import { NextFunction, Response, Request } from "express";
import { CreateVendorInput } from "../dto";
import { Vendor } from "../models";
import { GeneratePassword, GenerateSalt } from "../utility";

export const FindVendor = async (id: string | undefined, email?: string) => {
  if (email) {
    const vendor = await Vendor.findOne({ email: email });
    return vendor;
  } else {
    const vendor = await Vendor.findById(id);
    return vendor;
  }
};

export const CreateVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const {
    name,
    ownerName,
    foodType,
    pinCode,
    address,
    phone,
    email,
    password,
  } = <CreateVendorInput>req.body;

  const existingVendor = await Vendor.findOne({ email: email });
  console.log(existingVendor);

  if (existingVendor !== null) {
    return res.json({ message: "A vendor already exist with this email ID" });
  }

  const salt = await GenerateSalt();
  const userPassword = await GeneratePassword(password, salt);

  const createVendor = await Vendor.create({
    name: name,
    address: address,
    pinCode: pinCode,
    foodType: foodType,
    email: email,
    password: userPassword,
    salt: salt,
    ownerName: ownerName,
    phone: phone,
    rating: 0,
    serviceAvailable: false,
    coverImages: [],
    foods: [],
  });

  return res.json(createVendor);
};

export const GetVendors = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vendors = await Vendor.find();

  //validation
  if (vendors !== null) {
    return res.json(vendors);
  }

  //response
  return res.json({ message: "vendors data not available" });
};

export const GetVendorsById = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const vendorId = req.params.id;

  const vendor = await FindVendor(vendorId);

  //validaton
  if (vendor !== null) {
    return res.json(vendor);
  }
};
