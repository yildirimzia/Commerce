import express from 'express';
import { isAuthenticated } from '../middleware/auth';
import { createBaby, getBabies, getBabyById, deleteBaby, addVaccineInformation, deleteVaccineInformation, addAllergyInformation, deleteAllergyInformation, addTeethInformation, deleteTeethInformation } from '../controllers/baby.controller';

const babyRouter = express.Router();

babyRouter.post('/create', isAuthenticated, createBaby);
babyRouter.get('/list', isAuthenticated, getBabies);
babyRouter.get('/detail/:id', isAuthenticated, getBabyById);
babyRouter.delete('/:id', isAuthenticated, deleteBaby);
babyRouter.post('/:id/add-vaccine', isAuthenticated, addVaccineInformation);
babyRouter.delete('/:id/delete-vaccine/:vaccineId', isAuthenticated, deleteVaccineInformation);
babyRouter.post('/:babyId/add-allergy', addAllergyInformation);
babyRouter.delete('/:id/delete-allergy/:allergyId', isAuthenticated, deleteAllergyInformation);
babyRouter.post('/:babyId/add-teeth', isAuthenticated, addTeethInformation);
babyRouter.delete('/:id/delete-teeth/:teethId', isAuthenticated, deleteTeethInformation);

export default babyRouter;