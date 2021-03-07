import mongoose from "mongoose";

const vaccinesNestedSchema = mongoose.Schema({
    name: {
        type : String,
        required: true
    },
    possibleStartAge: {
        type : Number,
        required: true
    },
    possibleEndAge: {
        type : Number,
        required: true
    },
    doseNeeded: {
        type: Number,
        required: true
    },
    doseMade : {
        type: Number,
        required: true
    }
});


const vaccinesSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        unique: true,
        required: true
    },
    vaccines: [vaccinesNestedSchema]
});


export default mongoose.model("vaccines", vaccinesSchema);