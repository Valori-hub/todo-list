export interface Ilist {
  _id: string;
  name: string;
  icon: { filename: string; content: string };
  description: string;
  tasks: Itask[];
}
export interface UserData {
  username: string;
  todo: Ilist[];
}
export interface Itask {
  _id: string;
  color: string;
  date: string;
  description: string;
  list_id: string;
  title: string;
}
