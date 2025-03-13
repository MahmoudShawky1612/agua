import express from "express";
const router = express.Router();

import {
    createUser,
    getUser
} from '../controllers/user.controller';

router.post('/create-user', createUser);
router.get('/get-user/:userId', getUser);

export default router;