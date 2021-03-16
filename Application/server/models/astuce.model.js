import mongoose from "mongoose";

const astuceSchema = mongoose.Schema({
    astuce: {
		type: String,
		required: true,
		unique: true
	},
});


export default mongoose.model("astuce", astuceSchema);