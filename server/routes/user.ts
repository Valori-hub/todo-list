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
router.post('/login', async (req: ExpressRequest, res: Response) => {
  try {
    const usernameLogin = req.body.userObject;
    const result = await users.userLogin(usernameLogin);

    if (Array.isArray(result)) {
      res.status(401).json({ error: 'Invalid credentials' });
      return;
    } else if (result.success && result.userExist) {
      // req.session.userId = usernameLogin.username;
      // console.log('token has been created!');
    }
    res.status(201).json({ data: result });
  } catch (error) {
    console.error('Error finding user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
export { router };
