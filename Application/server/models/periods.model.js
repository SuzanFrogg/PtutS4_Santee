import mongoose from "mongoose";

const periodsNestedSchema = mongoose.Schema({
	dateStart: {
		type: Date,
		required: true,
		default: Date.now
	},
	dateEnd: {
		type: Date,
		required: true,
		default: Date.now
	},
    flux : {
        type: Number,
        required: true
    }
});

const periodsSchema = mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		unique: true,
		required: true
	},
	periods: [periodsNestedSchema]
});

export default mongoose.model("periods", periodsSchema);