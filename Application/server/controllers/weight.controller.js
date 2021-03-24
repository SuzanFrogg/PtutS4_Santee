import weightModel from "../models/weight.model.js";
import weightNestedSchema from "../models/weight.model.js";
import mongoose from "mongoose";

/**
 * Permet d'obtenir toutes les informations de poids
 */
let getWeight = async(req,res) => {
    if (req.user._id) {
		weightModel.findOne(
			{ userId: req.user._id },
			(err, docs) => {
				if(!err) res.send(docs);
				else console.log('Error to get data : ' + err);
			}
		);
	}
	else {
		res.status(400).send("no user");
	}
};

/**
 * Permet de créer une nouvelle donnée de poids
 */
 let createWeight = async (req, res) => {
	let newWeight = new weightModel({
		userId: req.body.userId,
		Weight: {
			entryDate: req.body.entryDate,
			mass: req.body.mass,
            		height: req.body.height
		}
	});

    try {
		const weight = await newWeight.save();
		return res.status(201).json(weight);
	}
	catch (err)
	{
		return res.status(400).send(err);
	}
};

/**
 * Permet de modifier les données de poids
 * @param {*} req 
 * @param {*} res 
 * @returns le poids modifié
 */
let updateWeight = async (req,res) => {
    try {
        //Vérification des id
        if(!mongoose.isValidObjectId(req.params.weightId))
            return res.status(400).json("wrong id : " + req.params.weightId);
        if(!mongoose.isValidObjectId(req.body.userId))
            return res.status(400).json("wrong id : " + req.body.userId);

        const docs = await weightModel.findOneAndUpdate({
            userId : req.body.userId, "Weight._id":req.params.weightId
            },
            {
                $set: {
                    "Weight.$.entryDate": req.body.entryDate,
                    "Weight.$.mass": req.body.mass,
                    "Weight.$.height": req.body.height
                },
            },
            {
                projection: {Weight :{ $elemMatch: { _id: req.params.weightId }}},
                new:true,
            }
        );
        if(docs) return res.status(200).json(docs);
        else return res.status(404).json({error: "not found"});
    }
    catch (err) {
        return res.status(500).json({error :err});
    }
};


let addWeight = async(req,res) => {
    try {
        if(!mongoose.isValidObjectId(req.body.userId))
            return res.status(400).send("wrong id : "+req.body.userId);

        const docs = await weightModel.findOneAndUpdate({
            userId : req.body.userId },
            {
                $push: {
                    Weight: {
                        entryDate:req.body.entryDate,
                        mass:req.body.mass,
                        height:req.body.height
                    }
                }
            },
            {
                projection: { Weight :{$slice: -1 } },
                new : true,
            }
        );
        if(docs) return res.status(200).json(docs);
        else return res.status(400).json({error : "not found"});
    }
    catch (err) {
        return res.status(500).json({error : err});
    }
};

let deleteWeight = (req,res) => {
    if(!mongoose.isValidObjectId(req.params.id))
    return res.status(400).send("wrong id : " + req.params.id);

    weightModel.findOneAndUpdate( {
        userId: req.body.userId, "Weight._id": req.params.weightId },
        {
            $pull: {
                Weight: {
                    _id:req.params.weightId
                }
            }
        },
        {
            new : true,
        },
        (err,docs) => {
            if(!err) res.send(docs);
            else console.log("Delete error "+ err);
        }
    );
};


export default{getWeight,createWeight,updateWeight,addWeight,deleteWeight};