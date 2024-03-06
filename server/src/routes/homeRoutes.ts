import express from 'express';
import { Request, Response } from 'express';
const router = express.Router();

const homePage = async (req: Request, res: Response) => {
    res.status(200).send(`Homepage`);
}

router.route('/')
    .get(homePage)

    
module.exports = router;