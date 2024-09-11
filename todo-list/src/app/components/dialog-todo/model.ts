export interface Ilist {
  title: string;
  description: string;
  color: string;
  tasks: [];
}
export interface Itask {
  title: string;
  description: string;
  list?: any;
  data: Date;
}
