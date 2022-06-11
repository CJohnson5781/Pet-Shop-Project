import { Router } from 'express';
import { addPet, addPetPage, allPets, deletePet, displayPet, editPet, editPetPage } from '../controllers/petController';

const router = Router();

router.get('/', allPets);

router.get('/add', addPetPage);

router.post('/add', addPet);

router.get('/edit/:petId', editPetPage);

router.post('/edit/:petId', editPet);

router.post('/delete/:petId', deletePet);

router.get('/:petId', displayPet);

export default router;