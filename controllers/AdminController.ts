import { NextFunction , Response , Request } from "express";
import { CreateVendorInput } from "../dto";
import { Vendor } from "../models";
import { GeneratePassword, GenerateSalt } from "../utility";



export const CreateVendor = async(req : Request , res : Response , next : NextFunction) => {
   
	const {name , ownerName , foodType ,  pinCode , address , phone , email , password} = <CreateVendorInput>req.body;

	const existingVendor = await Vendor.findOne({email : email})

	if(existingVendor !== null){
		return res.json({"message" : "A vendor already exist with this email ID"})
	}

	const salt = await GenerateSalt()
	const userPassword = await GeneratePassword(password , salt)
	
	const createVendor = await Vendor.create({
		name : name,
		address : address ,
		pinCode : pinCode,
		foodType : foodType,
		email : email,
		password : userPassword,
		salt : salt,
		ownerName : ownerName,
		phone : phone,
		rating : 0,
		serviceAvailable : false,
		coverImages: []


	})

	return res.json(createVendor)



}

export const GetVendors = async(req : Request , res : Response , next : NextFunction) => {
   
	res.json({message : "Hello from the Admin"})


}

export const GetVendorsById = async(req : Request , res : Response , next : NextFunction) => {
   
	res.json({message : "Hello from the Admin"})


}