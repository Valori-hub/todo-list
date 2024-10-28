import express, { Request as ExpressRequest, Response } from 'express';
import * as data from '../services/data';
const router = express.Router();
router.post('/update_data', async (req: ExpressRequest, res: Response) => {
  try {
    const userData = req.body.userObject;
    const result = await data.updateUserData(userData);
    res.status(201).json({ data: result });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
export { router };
