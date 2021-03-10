import mongoose from "mongoose";

const weightNestedSchema = mongoose.Schema({
    entryDate: {
        type:Date,
        required: true,
        default: Date.now,
    },
    mass: {
        type: Number,
        required: true,
        default:0,
    }
});

const weightSchema = mongoose.Schema({
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        unique: true,
        required:true,
    },
    weightList: [weightNestedSchema],
});

export default mongoose.model("weight",weightSchema);