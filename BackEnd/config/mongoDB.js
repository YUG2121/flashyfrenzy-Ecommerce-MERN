import mongoose from "mongoose";

const DBConnect = async () => {
  try {
    mongoose
      .connect(process.env.MONGO_URI)
      .then((conn) =>
        console.log(`DataBase is Connected with -> ${conn.connection.host}`)
      );
  } catch (err) {
    console.log(err)
    process.exit(1)
    
  }
};
export default DBConnect;
