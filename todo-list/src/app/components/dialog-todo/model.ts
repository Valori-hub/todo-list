export interface Ilist {
  title: string;
  description: string;
  color: string;
}
export interface Itask {
  title: string;
  description: string;
  list?: any;
  data: Date;
}
