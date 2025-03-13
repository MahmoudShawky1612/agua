import { NextFunction, Response, Request } from 'express';
import { userRepo } from '../repos/user.repo';

export const createUser = async(
    req: Request,
    res: Response,
    next: NextFunction,
) =>{
    try {
        const user = await userRepo.createUser(req.body.username, req.body.gender);
        res.status(201).json({msg: "User Created Successfully!", user: user});
    } catch (error) {
        res.status(400).json({msg: "There's something wrong"});
    }
};

export const getUser = async(
    req: Request,
    res: Response,
    next: NextFunction,
) =>{
    try {
        const user = await userRepo.getUser(+req.params.userId);
        res.status(200).json({msg: "Success", user: user});
    } catch (error) {
        res.status(400).json({msg: `There's something wrong ${error}`});
    }
}



