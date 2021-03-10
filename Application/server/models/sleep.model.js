import mongoose from "mongoose";

const sleepNestedSchema = mongoose.Schema({
	dateStart: {
		type: Date,
		required: true,
		default: Date.now
	},
	dateEnd: {
		type: Date,
		required: true,
		default: Date.now
	}
});

const sleepSchema = mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		unique: true
	},
	Sleep: [sleepNestedSchema]
});

export default mongoose.model("sleep", sleepSchema);