import { RequestHandler } from "express";
import { Pet } from "../models/pet";

export const allPets: RequestHandler = async (req, res, next) => {
    let petList: Pet[] = await Pet.findAll();
    res.render('allPets', { petList });
}

export const displayPet: RequestHandler = async (req, res, next) => {
    let friendId = req.params.petId;
    let petFriend: Pet | null = await Pet.findByPk(friendId);
    
    if (petFriend) {
        res.render('petDetail', { foundPet: petFriend });
    }
    else {
        res.status(404).render('error', { message: 'That friend not found' });
    }
}

export const addPetPage: RequestHandler = (req, res, next) => {
    res.render('add-Pet');
}

export const addPet: RequestHandler = async (req, res, next) => {
    let newPet: Pet = req.body;
    await Pet.create(newPet);
    res.redirect('/pet');
}

export const editPetPage: RequestHandler = async (req, res, next) => {
    let friendId = req.params.petId;
    let petFriend: Pet | null = await Pet.findOne({ 
        where: { petId: friendId } });
        
    if (petFriend) {
        res.render('editPet', { foundPet: petFriend });
    }
    else {
        res.status(404).render('error', { message: 'That friend not found' });
    }
}

export const editPet: RequestHandler = async (req, res, next) => {
    let friendId = req.params.petId;
    let updatedPet: Pet = req.body;

    let [updated] = await Pet.update(updatedPet, {
        where: { petId: friendId }
    });

    if (updated === 1) {
        res.redirect('/pet');
    }
    else {
        res.render('error', { message: 'That friend not found' });
    }
}

export const deletePet: RequestHandler = async (req, res, next) => {
    let friendId = req.params.petId;

    let deleted = await Pet.destroy({
        where: { petId: friendId }
    });

    if (deleted) {
        res.redirect('/pet')
    }
    else {
        res.status(404).render('error', { message: 'Cannot find item' });
    }
}