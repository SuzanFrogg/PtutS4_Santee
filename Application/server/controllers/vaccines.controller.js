import vaccinesModel from "../models/vaccines.model.js";
import mongoose from "mongoose";

/**
 * Permet d'obtenir les informations d'un vaccin 
 */
let getVaccines = async (req, res) => {
	vaccinesModel.find((err, docs) => {
        if(!err) res.send(docs);
        else console.log('Error to get data : ' + err);
    })
};

/**
 * Permet de créer une donnée de vaccin
 */
let createVaccines = async (req, res) => {
    let newVaccines = new vaccinesModel({
        idUser: req.body.idUser,
        vaccines: 
        {
            name: req.body.name,
            possibleStartAge: req.body.possibleStartAge,
            possibleEndAge: req.body.possibleEndAge,
            doseNeeded: req.body.doseNeeded,
            doseMade: req.body.doseMade
        }
    });

    try {
        const vaccines = await newVaccines.save();
        return res.status(201).json(vaccines);
    }
    catch (err)
    {
        return res.status(400).send(err);
    }
};

/**
 * Permet de modifier les données de vaccin
 */
let updateVaccines = (req, res) => {
    
    //Vérifie l'id
    if(!mongoose.isValidObjectId(req.params.id))
        return res.status(400).send("ID unknown : " + req.params.id);


    try {
        await vaccinesModel.findOneAndUpdate(
            {idUser: req.params.id},
            {
                
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
 * Permet de supprimer une donnée de vaccin
 */
let deleteVaccines = (req, res) => {

};

export default {getVaccines, createVaccines, updateVaccines, deleteVaccines};