import bcryptjs from "bcryptjs";
import User from "../models/user-model.js";
import { errorHandler } from "../utils/error.js";


export function test(req, res) {
    res.send('Api router is working');
}

export const updateUser=async (req, res,next)=> {
    if (req.user.id !== req.params.id) {
        return next(errorHandler(403, "You can update only your account"));

        try {

            if (req.body.password) {
                req.body.password = bcryptjs.hashSync(
                    req.body.password,10
                );//hash password
            }
            
            const updatedUser = await User.findByIdAndUpdate(req.params.id, {
                $set: {
                    username: req.body.username,
                    email: req.body.email,
                    password: req.body.password,
                    profilePicture: req.body.profilePicture,
                }
                
            },{new:true});//return updated user

            const { password, ...rest } = updatedUser._doc;

            res,status(200).json(rest);

        } catch (error) {
            next(error);
        }
    }
};
