export interface IUser {
  name: string;
  id: number;
  isCurrent: boolean;
}

export interface IMessage {
  text: string;
  id: number;
  userId: number;
  timestamp: Date;
  userName?: string;
}

export interface IConfig {
  placeholder: string;
  buttonLabel: string;
}

export interface IPMessage {
  text: string;
  id: number;
  userId: number;
  timestamp: Date;
  userName?: string;
}


export interface Ichat{

}