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

const calendarSchema = mongoose.Schema({

	objectives: [objectifSchema]
});

export default mongoose.model("calendar", calendarSchema);