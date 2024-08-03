export interface Members {
  id: string;
  name: string;
  image?: string;
}

export interface Team {
  _id: string;
  name: string;
  description: string;
  members: Members[];
}
