import mongoose, {Schema} from "mongoose";

const followerSchema = new Schema({
    follower:{
        type: mongoose.Schema.Types.ObjectId,  
        ref: "User"
    },
    following:{
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User"
    }
},{timestamps: true})

export const Follower = mongoose.model("Follower", followerSchema);