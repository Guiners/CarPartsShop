import { Request, Response } from 'express';
const UserService = require('../services/UserService');

const registerUser = async (req: Request, res: Response) => {
    try {
        await UserService.register(req.body);
        res.status(200).json({ "message": `Register completed` });
    } catch (error) {
        return res.json({ "message": `${error}`});
    }
}

const loginUser = async (req: Request, res: Response) => {
    try {
        const foundUser = await UserService.login(req.body);
        res.status(200).json(foundUser);
    } catch (error) {
        return res.json({ "message": `${error}`});
    }
}

const logoutUser = async (req: Request, res: Response) => {
    try {
        await UserService.logout(req.body.token)
        res.status(202).json({ "message": `Logout completed` });
    } catch (error) {
        return res.json({ "message": `${error}`});
    }
}

module.exports = { registerUser, loginUser, logoutUser };