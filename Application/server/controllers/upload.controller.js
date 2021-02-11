import userModel from "../models/user.model.js";
import fileSystem from "fs";
import { promisify } from "util";
import stream from "stream";
const pipeline = promisify(stream.pipeline);
import errorsUtils from "../utils/errors.utils.js";
//Pour avoir le chemin du fichier
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

let uploadProfil = async (req, res) => {
	try {
		if (req.file.detectedMimeType !== "image/jpg" &&
		req.file.detectedMimeType !== "image/png" &&
		req.file.detectedMimeType !== "image/jpeg")
			throw Error("invalid file");
		
		//Supérieur à 500ko
		if (req.file.size > 500000)
			throw Error("max size");
	}
	catch (err) {
		const errors = errorsUtils.uploadErrors(err);
		return res.status(400).json({ errors });
	}

	const fileName = req.body.name + ".jpg";
	
	await pipeline(
		req.file.stream,
		fileSystem.createWriteStream(`${__dirname}/../../client/public/uploads/profil/${fileName}`)
	);

	try {
		await userModel.findByIdAndUpdate(
			req.body.userId,
			{ $set : {picture: fileName} },
			{ new: true, upsert: true, setDefaultsOnInsert: true },
			(err, docs) => {
				if (!err) return res.status(200).json(docs);
				else return res.status(500).json({ error: err });
			}
		)
	}
	catch (err) {
		return res.status(500).json({ error: err });
	}
}

export default {uploadProfil};