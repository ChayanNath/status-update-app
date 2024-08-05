export interface UserRegistration {
  firstName: string;
  lastName: string;
  username: string;
  password: string;
}

export interface User {
  id: string;
  firstName: string;
  lastName: string;
  isAdmin: boolean;
  team: string;
  image?: string;
}

export interface UserUpdate {
  _id: string;
  title: string;
  description: string;
  date: string;
  day: string;
}

export interface DateRange {
  from: Date;
  to: Date | undefined;
}

export interface TeamMember {
  id: string;
  firstName: string;
  lastName: string;
}
