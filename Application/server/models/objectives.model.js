import mongoose from "mongoose";

const objectifNesteedSchema = mongoose.Schema({
	obj: {
		type: String,
		required: true
	},
    isDone:{
        type : Boolean,
        required: true
    },
	dateEnd: {
		type: Date,
		required: true,
		default: Date.now
	}
});

const objectifSchema = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        unique: true
    },
    objectives: [objectifNesteedSchema]
});


export default mongoose.model("calendar", objectifSchema);