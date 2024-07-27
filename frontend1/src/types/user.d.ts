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
}
