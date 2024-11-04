export interface Ilist {
  _id: string;
  title: string;
  icon: { filename: string; content: string };
  description: string;
  tasks: [];
}
export interface UserData {
  username: string;
  todo: Ilist[];
}
