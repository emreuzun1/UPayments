export interface Object {
  id: string;
  name: string;
  avatar: string;
  developerEmail: string;
  price: number;
  category: string;
  description: string;
}

export interface CreateObjectInterface {
  name: string;
  avatar: string;
  developerEmail: string;
  price: number;
  category: string;
  description: string;
}
