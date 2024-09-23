import { SafeHtml } from '@angular/platform-browser';
export interface Iuser {
  firstName: string;
  lastName: string;
  todo: [Ilist];
  username: string;
}
export interface Ilist {
  title: string;
  description: string;
  color?: string;
  icon: { filename: string; content: SafeHtml };
  tasks: [];
}
export interface Itask {
  title: string;
  description: string;
  list?: any;
  data: Date;
}
