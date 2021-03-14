import mongoose from "mongoose";

const donNestedSchema = mongoose.Schema({
	dateDon: {
		type: Date,
		required: true,
		default: Date.now
	}
});

const donSchema = mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		required: true,
		unique: true
	},
	DonsSang: [donNestedSchema],
	DonsPlasma: [donNestedSchema],
	DonsPlaquette: [donNestedSchema]
});

export default mongoose.model("don", donSchema);