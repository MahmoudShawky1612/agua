import { NextFunction, Response, Request } from 'express';
import { userRepo } from '../repos/user.repo';

export const createUser = async(
    req: Request,
    res: Response,
    next: NextFunction,
) =>{
    try {
        const user = await userRepo.createUser(req.body.username);
        res.status(201).json({msg: "User Created Successfully!"});
    } catch (error) {
        res.status(400).json(error);
    }
}