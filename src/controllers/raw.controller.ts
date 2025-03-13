import { Request, Response } from 'express';
import { RawRepo } from '../repos/raw.repo';

export const getRaw = async(
    req: Request,
    res: Response,
) => {
    try {
       const raw = await RawRepo.updateRawStreak(+req.params.userId);
       res.status(200).json({raw:raw})
    } catch (error) {
        res.status(400).json({msg:"There's something wrong"})
    }
}