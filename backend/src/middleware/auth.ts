import type {Request, Response, NextFunction} from 'express';
import { getAuth } from "@clerk/express";
import { requireAuth } from "@clerk/express";
import { User } from "../models/User";

export type authRequest = Request & {
    userId?: string
};

export const protectRoute = [
    requireAuth(),
    async (req: authRequest, res: Response, next: NextFunction) => {
        try{
            const { userId: clerkId } = getAuth(req);
            if (!clerkId) return res.sendStatus(401).json({message: "Unauthorised - Invalid token"});

            const user = await User.findOne({ clerkId });
            if (!user) return res.sendStatus(401).json({message: "User not found"});
            req.userId = user._id.toString();
            next();

        } catch(error){
            console.error("Error in protectRoute middleware", error);
            res.sendStatus(500).json({message: "Internal server error"});
        }
    }
]




