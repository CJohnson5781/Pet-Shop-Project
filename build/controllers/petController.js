"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deletePet = exports.editPet = exports.editPetPage = exports.addPet = exports.addPetPage = exports.displayPet = exports.allPets = void 0;
const pet_1 = require("../models/pet");
const allPets = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let petList = yield pet_1.Pet.findAll();
    res.render('allPets', { petList });
});
exports.allPets = allPets;
const displayPet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let friendId = req.params.petId;
    let petFriend = yield pet_1.Pet.findByPk(friendId);
    if (petFriend) {
        res.render('petDetail', { foundPet: petFriend });
    }
    else {
        res.status(404).render('error', { message: 'That friend not found' });
    }
});
exports.displayPet = displayPet;
const addPetPage = (req, res, next) => {
    res.render('add-Pet');
};
exports.addPetPage = addPetPage;
const addPet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let newPet = req.body;
    yield pet_1.Pet.create(newPet);
    res.redirect('/pet');
});
exports.addPet = addPet;
const editPetPage = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let friendId = req.params.petId;
    let petFriend = yield pet_1.Pet.findOne({
        where: { petId: friendId }
    });
    if (petFriend) {
        res.render('editPet', { foundPet: petFriend });
    }
    else {
        res.status(404).render('error', { message: 'That friend not found' });
    }
});
exports.editPetPage = editPetPage;
const editPet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let friendId = req.params.petId;
    let updatedPet = req.body;
    let [updated] = yield pet_1.Pet.update(updatedPet, {
        where: { petId: friendId }
    });
    if (updated === 1) {
        res.redirect('/pet');
    }
    else {
        res.render('error', { message: 'That friend not found' });
    }
});
exports.editPet = editPet;
const deletePet = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let friendId = req.params.petId;
    let deleted = yield pet_1.Pet.destroy({
        where: { petId: friendId }
    });
    if (deleted) {
        res.redirect('/pet');
    }
    else {
        res.status(404).render('error', { message: 'Cannot find item' });
    }
});
exports.deletePet = deletePet;
