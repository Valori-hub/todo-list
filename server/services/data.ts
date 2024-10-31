import * as MongoDb from 'mongodb';
import { db } from '../shared/db_connection';
export async function updateTask(userData: any, username: any, list_id: any) {
  try {
    const user = await db.collection('Users').findOne({ username: username });
    if (user) {
      const todoList = user.todo.find((todo: any) => todo._id === list_id);
      if (todoList) {
        const newTask = {
          _id: new MongoDb.ObjectId(),
          title: userData.title,
          description: userData.description,
          color: userData.color,
          date: userData.date,
          list: userData.list,
        };
        todoList.tasks.push(newTask);
        await db
          .collection('Users')
          .updateOne({ username: username }, { $set: { todo: user.todo } });
        console.log('dziala');
        return { success: true, message: 'Task has been posted' };
      }
    } else {
      console.error('User not found.');
      return { success: false, message: 'Task has not been posted' };
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}
export async function updateList(userData: any, username: any) {
  try {
    const user = await db.collection('Users').findOne({ username: username });
    if (user) {
      const newList = {
        _id: new MongoDb.ObjectId(),
        name: userData.name,
        color: userData.color,
        tasks: [],
        icon: userData.icon,
      };
      user.todo.push(newList);
      await db
        .collection('Users')
        .updateOne({ username: username }, { $set: { todo: user.todo } });
      return { success: true, message: 'List has been posted' };
    } else {
      console.error('User not found.');
      return { success: false, message: 'List has not been posted' };
    }
  } catch (error) {
    console.error('An error occurred:', error);
  }
}
