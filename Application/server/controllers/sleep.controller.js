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
    let newDataSleep = new sleepNestedSchema({
        dateStart: req.body.dateStart,
        dateEnd: req.body.dateEnd
    });

    let newSleep = new sleepModel({
        idUser: req.body.idUser,
        Sleep: newDataSleep
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
 * Permet de modifier les données de sleep
 */
let updateSleep = (req, res) => {

};

/**
 * Permet de supprimer une donnée de sleep
 */
let deleteSleep = (req, res) => {

};

export default {getSleep, createSleep, updateSleep, deleteSleep};