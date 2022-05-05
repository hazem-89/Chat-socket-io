import { create } from "domain";

//alla events som kommer ifrån servern till clienten
export interface ServerToClientEvents {
  "chat message": (message: string) => void;
  welcome: (message: string) => void;
  roomList: (rooms: string[]) => void;
  joined: (room: string) => void;
  left: (room: string) => void;
}

/** Alla events som skickas från clienten till server */
export interface ClientToServerEvents {
  "chat message": (message: string) => void;
  join: (room: string) => void;
}

/** typer av funktioner som körs inom servern */
export interface InterServerEvents {
  ping: () => void;
}

/** info vi kan spara på en socket - alltså på clientrepresentation
 * datan kommer vara sparat på servern men det kommer vara en representation
 * av en client på servern.
 * OBS är viktigt.
 * Datan som sparas här är datan som kommer behövas över tid senare.
 */
export interface ServerSocketData {
  username: string;
  currentRoom: string;
  //chatHistory: string[];
  //rooms: string[];
}
