import express, { Request as ExpressRequest, Response } from 'express';
import * as users from '../services/user';
import { ObjectId } from 'mongodb';

declare module 'express-session' {
  interface SessionData {
    userId: ObjectId;
    username: string;
  }
}
const router = express.Router();

router.post('/signup', async (req: ExpressRequest, res: Response) => {
  try {
    const userData = req.body.userObject;
    const result = await users.userRegistration(userData);
    res.status(201).json({ data: result });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.post('/login', async (req: ExpressRequest, res: Response) => {
  try {
    const user = req.body.userObject;
    const result = await users.userLogin(user);
    if (Array.isArray(result)) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    } else if (result.success && result.userData) {
      if (!req.session) {
        console.error('Session is not initialized');
        res.status(500).json({ error: 'Session is not initialized' });
        return;
      }
      if (!result.userData) {
        console.error('User does not exist');
        res.status(401).json({ error: 'User does not exist' });
        return;
      }
      const { email, password, _id, ...filteredUserData } = result.userData;
      const { userData, ...resultObjectData } = result;
      req.session.username = result.userData.username;
      req.session.userId = result.userData._id;
      console.log('Token has been created!');
      res
        .status(201)
        .json({ result: resultObjectData, userData: filteredUserData });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  } catch (error) {
    console.error('Error finding user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.post('/logout', (req: ExpressRequest, res: Response) => {
  if (!req.session) {
    return res.status(400).send({ message: 'No session to destroy' });
  }
  req.session.destroy((err) => {
    if (err) {
      console.error('Session destroy error:', err);
      return res.status(500).send({ message: 'Logout failed' });
    }
    res.clearCookie('connect.sid');
    res.send({ message: 'Logged out' });
  });
});
router.get('/session-info', (req: ExpressRequest, res: Response) => {
  if (req.session.userId) {
    res.json({
      userId: req.session.userId,
      username: req.session.username,
    });
  } else {
    res.status(401).json({ message: 'Not authenticated' });
  }
});
export { router };
