import sleepModel from "../models/sleep.model.js";
import sleepNestedSchema from "../models/sleep.model.js";
import mongoose from "mongoose";

/**
 * Permet d'obtenir les informations d'un sommeil 
 */
let getSleep = async (req, res) => {
	sleepModel.find((err, docs) => {
        if(!err) res.send(docs);
        else console.log('Error to get data : ' + err);
    })
};

/**
 * Permet de créer une donnée de sleep
 */
let createSleep = async (req, res) => {

    let newSleep = new sleepModel({
        idUser: req.body.idUser,
        Sleep: {
        dateStart: req.body.dateStart,
        dateEnd: req.body.dateEnd
    }
    });

    try {
        const sleep = await newSleep.save();
        return res.status(201).json(sleep);
    }
    catch (err)
    {
        return res.status(400).send(err);
    }
};

/**
 * Permet de modifier les donnée de sleep
 */
let updateSleep =   async (req, res) => {
    //Vérifie l'id
    if(!mongoose.isValidObjectId(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

    try {
		await sleepModel.findOneAndUpdate(
            {idUser: req.params.id},
			{
				$set: {
					dateStart: req.body.dateStart,
					dateEnd: req.body.dateEnd
				}
			},
			{ new: true},
			(err, docs) => {
				if (!err) return res.status(200).json(docs);
				else return res.status(500).json({ error: err });
			}
		)
	}
	catch (err) {
		return res.status(500).json({ error: err });
	}
};

/**
 * Permet de supprimer une donnée de sleep
 */
let deleteSleep = (req, res) => {
    if(!mongoose.isValidObjectId(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);

	sleepModel.findByIdAndRemove(req.params.id, (err, docs) => {
        if(!err) res.send(docs);
        else console.log("Delete error : " + err);
    });
};

export default {getSleep, createSleep, updateSleep, deleteSleep};