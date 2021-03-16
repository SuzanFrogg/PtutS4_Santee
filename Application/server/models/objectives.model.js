import mongoose from "mongoose";

const objectifSchema = mongoose.Schema({
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


export default mongoose.model("calendar", objectifSchema);