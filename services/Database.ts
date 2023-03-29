import mongoose, { ConnectOptions } from "mongoose";
import dotenv from "dotenv";

export default async () => {
//importing the dotenv library
  dotenv.config();

  try {
    await mongoose.connect(process.env.MONGO_URI!, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      //   useCreateIndex: true,
    } as ConnectOptions);

    console.log("DB CONNECTED");
  } catch (ex) {
    console.log(ex);
  }
};
