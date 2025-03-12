import express from "express";
const router = express.Router();

import {
    createUser,
} from '../controllers/user.controller';

router.post('/create-user', createUser);

export default router;