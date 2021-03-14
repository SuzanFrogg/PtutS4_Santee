import mongoose from "mongoose";

const allergyNestedSchema = mongoose.Schema({
    toAvoid: {
        type : String,
        required: true
    }
   
});


const allergySchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    allergies: [allergyNestedSchema]
});


export default mongoose.model("allergy", allergySchema);