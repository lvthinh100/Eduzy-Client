import { Gender } from "./Standard";

export type StudentInfo = {
  dateOfBirth: string;
  fullName: string;
  gender: Gender;
  studentCode: string;
  studentType: string;
  username: string;
  _id: string;
};

export type SignUpData = {
  name: string;
  password: string;
  birth: Date;
  gender: Gender;
};

export type LoginData = {
  username: string;
  password: string;
};
