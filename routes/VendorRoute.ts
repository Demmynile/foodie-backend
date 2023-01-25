import express , {Request , Response , NextFunction } from 'express'
import { VendorLogin } from '../controllers'

const router = express.Router()

router.post('/login' , VendorLogin)
router.get('/profile' , )
router.patch('/profile' , )
router.patch('/service' , )

router.get('/' , (req : Request , res : Response , next:NextFunction ) => {
	res.json({message : "Hello from the Vendor"})
})


export {router as VendorRoute }