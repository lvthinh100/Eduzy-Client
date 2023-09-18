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

export const defaultUser: StudentInfo = {
  dateOfBirth: "1/1/2006",
  fullName: "",
  gender: "Nam", // Set the default gender here
  studentCode: "000000",
  studentType: "",
  username: "",
  coins: 0,
  crowns1: 0,
  crowns2: 0,
  crowns3: 0,
  _id: "",
};

export type SignUpData = {
  name: string;
  password: string;
  birth: Date;
  gender: Gender;
  expiredTime: Date;
};

export type LoginData = {
  username: string;
  password: string;
};
