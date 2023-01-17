import express from 'express'
import { AdminRoute , VendorRoute  } from './routes'
import bodyParser from 'body-parser'
import mongoose, { ConnectOptions } from 'mongoose'


const dotenv = require('dotenv');

dotenv.config()



const app = express()



app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended : true}))

app.use('/admin' , AdminRoute)
app.use('/vendor' , VendorRoute)

mongoose.connect(process.env.MONGO_URI!, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
	// useCreateIndex : true

} as ConnectOptions | undefined).then(result => {
	console.log('DB CONNECTED')
}).catch(err => console.log('error' + err))




app.listen(8000 , () => {
	console.clear()
	console.log("App is listening to the port 8000")
})