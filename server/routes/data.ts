import express, { Request as ExpressRequest, Response } from 'express';
import * as data from '../services/data';
const router = express.Router();
router.post('/post_task', async (req: ExpressRequest, res: Response) => {
  try {
    const userData = req.body.taskObject;
    const username = req.body.username;
    const list_id = req.body.list_id;
    const result = await data.updateTask(userData, username, list_id);
    res.status(201).json({ data: result });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
router.post('/post_list', async (req: ExpressRequest, res: Response) => {
  try {
    const userData = req.body.listObject;
    const username = req.body.username;
    const result = await data.updateList(userData, username);
    res.status(201).json({ data: result });
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});
export { router };
