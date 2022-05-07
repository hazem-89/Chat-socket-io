export interface User {
  id: string;
  username: string;
}

export interface Message {
  content: string;
  user: User;
}

export interface Room {
  name: string;
  messages: Message[];
  members: User[];
}
