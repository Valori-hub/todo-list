import * as MongoDb from 'mongodb';
import { db } from '../shared/db_connection';
import * as interfaces from '../module/interfaces';

export async function userRegistration(userData: any) {
  try {
    const userExist =
      (
        await db
          .collection('Users')
          .find({
            $or: [{ username: userData.username }, { email: userData.email }],
          })
          .toArray()
      ).length > 0;
    if (userExist === false) {
      const documents = await db.collection('Users').insertOne(userData);
      console.log('Account has been created');
      return {
        success: true,
        message: 'Account created successfully',
        data: documents,
      };
    } else {
      return { success: false, message: 'User already exists' };
    }
  } catch (error) {
    console.error('Error fetching documents:', error);
  }
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
      const userData: interfaces.userObject =
        userExist as unknown as interfaces.userObject;
      return { success: true, message: 'Logged in ', userData };
    } else {
      return { success: false, message1: "Couldn't find account" };
    }
  } catch (error) {
    console.error('Error fetching documents:', error);
    return [];
  }
}
