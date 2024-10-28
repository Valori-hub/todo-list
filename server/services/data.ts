import * as MongoDb from 'mongodb';
import { db } from '../shared/db_connection';
export async function updateUserData(userData: any) {
  try {
    const userExist = await db
      .collection('Users')
      .find({
        $or: [{ username: userData.username }, { email: userData.email }],
      })
      .toArray();
    // if (userExist === false) {
    //   const documents = await db.collection('Users').insertOne(userData);
    //   console.log('Account has been created');
    //   return {
    //     success: true,
    //     message: 'Account created successfully',
    //     data: documents,
    //   };
    // } else {
    //   return { success: false, message: 'User already exists' };
    // }
  } catch (error) {
    console.error('Error fetching documents:', error);
  }
}
