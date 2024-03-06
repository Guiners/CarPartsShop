import express from 'express';
import { Request, Response } from 'express';
const router = express.Router();

const homePage = async (req: Request, res: Response) => {
    let productList = ['prod1', 'prod2', 'prod3'];
    return await res.status(200).json({ products: productList });
}

router.get('/', homePage);

module.exports = router;