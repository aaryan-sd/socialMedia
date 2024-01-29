import mongoose, { mongo } from "mongoose";

const connectDB = async () => {
    try{
        const connectionInstance = await mongoose.connect("mongodb+srv://aaryan8sd:HSXSxaLPyO2YJLxl@redditcluster.asxkgos.mongodb.net/reddit");
          console.log('mongodb connected');
    }catch(error){
        console.error(error);
    }
}

export default connectDB;