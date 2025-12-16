import express from 'express';
import {testController} from '../controllers/test.controller.js';

//route object
const router = express.Router();

//test route
router.get('/test', testController);

export default router;