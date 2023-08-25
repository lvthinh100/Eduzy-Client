import { Gender } from "./Standard";

export type StudentInfo = {
  dateOfBirth: string;
  fullName: string;
  gender: Gender;
  studentCode: string;
  studentType: string;
  username: string;
  coins: number;
  crowns1: number;
  crowns2: number;
  crowns3: number;
  _id: string;
};

export type SignUpData = {
  name: string;
  password: string;
  birth: string;
  gender: Gender;
};

export type LoginData = {
  username: string;
  password: string;
};
