import {Request , Response, NextFunction} from 'express'
import { VendorLoginInput } from '../dto'
import { ValidatePassword } from '../utility'
import { FindVendor } from './AdminController'


export const VendorLogin = async (req:Request , res : Response , next : NextFunction) => {

	 const {email , password} = <VendorLoginInput>req.body

	 const existingVendor = await FindVendor('' , email)

	 if(existingVendor !== null){
		//validation and give
		const valiidation = await ValidatePassword(password , existingVendor.password , existingVendor.salt)

		if(valiidation){
           return res.json(existingVendor)
		}
		else{
			return res.json({"message" : "Password is not valid"})
		}
	 }
	 
	 return res.json({"message" : "Login credentials not valid"})

	
}

export const  GetVendorProfile = async(req : Request , res : Response , next : NextFunction) => {
	
}

export const UpdateVendorProfile = async(req : Request , res : Response , next : NextFunction) => {
	
}

export const  UpdateVendorService= async(req : Request , res : Response , next : NextFunction) => {
	
}