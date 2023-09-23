import { Dayjs } from "dayjs";
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
  avatar: string;
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

export type UpdateProfileData = {
  fullName: string;
  dateOfBirth: Date;
  gender: Gender;
};
