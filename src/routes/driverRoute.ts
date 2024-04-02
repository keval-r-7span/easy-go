import express from 'express';
const router = express.Router();

import {
  signUp,
  login,
  deleteDriver,
  updateDriver,
  availableDrivers,
  addVehicle,
  updateVehicle,
} from '../controllers/driverController';

import { validateRequest, validateAddVehicle } from '../validation/driverValidation';
import { validateUpdateRequest, validateUpdateVehicle } from '../validation/updateValidation';

router.post('/', validateRequest, signUp);
router.post('/login', login);
router.put('/:id', validateUpdateRequest, updateDriver);
router.delete('/:id', deleteDriver);
router.post('/vehicle', validateAddVehicle, addVehicle);
router.put('/vehicle/:id', validateUpdateVehicle, updateVehicle);
router.get('/', availableDrivers);

export default router;