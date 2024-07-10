import { ObjectId } from 'mongodb';

export interface userObject {
  username: string;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  _id: ObjectId;
  todo: [];
}
export interface IOriginalObject {
  firstName: string | null;
  lastName: string | null;
  todo: any[] | null;
  username: string | null;
}
