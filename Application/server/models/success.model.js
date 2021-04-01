import mongoose from "mongoose";


const successSchema = mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	},
    desc: {
		type: String,
		required: true,
		unique: true
	},
    xp: {
		type: Number,
		required: true,
		unique: false
	}
	
});

export default mongoose.model("success", successSchema);