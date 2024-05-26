import * as MongoDb from 'mongodb';
import { db } from '../shared/db_connection';

export async function userRegistration(userData: any) {
  try {
  } catch (error) {}
}
export async function userLogin(newItemData: {
  username: string;
  password: string;
}) {
  try {
    const userExist = await db.collection('Users').findOne({
      username: newItemData.username,
      password: newItemData.password,
    });
    if (userExist != null) {
      return { success: true, message: 'Logged in ', userExist };
    } else {
      return { success: false, message1: "Couldn't find", message2: 'account' };
    }
  } catch (error) {
    console.error('Error fetching documents:', error);
    return [];
  }
}
