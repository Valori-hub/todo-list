import express, { Request as ExpressRequest, Response } from 'express';
import * as users from '../services/user';

const router = express.Router();

router.get('signup', async (req: ExpressRequest, res: Response) => {
  try {
    const userData = req.body.userData;
    const document = users.userRegistration(userData);
    // res.status(201).json({ searchResults: result });
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
export { router };
