import objectivesModel from "../models/objectives.model.js";
import mongoose from "mongoose";

/**
 * Permet d'obtenir les informations d'un objectives  a partir d'une date
 */
 let getObjectivesAll = async (req, res) => {

    try
    {
        const obj = await objectivesModel.find();
        res.status(200).json(obj);
    }
    catch(err)
    {
        res.status(400).json({errors: err});
    }
    


};

let getObjectivesDate = async (req, res) => {

    if (req.param.date ) {
		objectivesModel.findOne(
			{ dateEnd: req.param.date },
			(err, docs) => {
				if(!err) res.send(docs);
				else console.log('Error to get data : ' + err);
			}
		);
	}
	else {
		res.status(400).send("not found");
	}

};


/**
 * Permet de créer une donnée d'un calendrier
 */
let createObjectives = async (req, res) => {

   let newObjectif = new objectivesModel({
        obj : req.body.obj,
        isDone : req.body.isDone,
        dateEnd : req.body.dateEnd
    });

    try {
        const obj = await newObjectif.save();
        return res.status(201).json(obj);
    }
    catch (err) {
        return res.status(400).send(err);
    }

};

/**
 * Permet de modifier les données d'un objectif
 */
let updateObjectives = async (req, res) => {

};


/**
 * Permet de supprimer une donnée d'un calendrier
 */
let deleteObjectives = (req, res) => {

};

export default {getObjectivesAll, getObjectivesDate, createObjectives, updateObjectives, deleteObjectives};