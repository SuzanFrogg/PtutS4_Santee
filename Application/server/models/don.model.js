import mongoose from "mongoose";

const donNestedSchema = mongoose.Schema({
	typeDon: {
		type: String,
		required: true,
		maxlength: 9
	},
    dateDon: {
		type: Date,
		required: true,
		default: Date.now
	},
    nbDonSang: {
        type : Number,
        required: true
    },
    nbDonPlasma: {
        type : Number,
        required: true
    },
    nbDonPlaquette: {
        type : Number,
        required: true
    },
    nbPersonneSauve: {
        type : Number,
        required: true
    }
});

const donSchema = mongoose.Schema({
	userId: {
		type: mongoose.Schema.Types.ObjectId,
		unique: true,
		required: true
	},
	Don: [donNestedSchema]
});

export default mongoose.model("don", donSchema);