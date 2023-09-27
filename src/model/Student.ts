import { Dayjs } from 'dayjs';
import { Gender } from './Standard';

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
  avatar: string;
  _id: string | null;
};

export const defaultUser: StudentInfo = {
  dateOfBirth: '1/1/2006',
  fullName: '',
  gender: 'Nam', // Set the default gender here
  studentCode: '000000',
  studentType: '',
  username: '',
  coins: 0,
  crowns1: 0,
  crowns2: 0,
  crowns3: 0,
  _id: null,
  avatar: 'nah',
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

export type StudentLBInfo = {
  //Show in Leader Board
  fullName: string;
  studentCode: string;
  coins: number;
  crowns1: number;
  crowns2: number;
  crowns3: number;
  score: number;
  type: string;
  avatar: string;
};

export type UpdateProfileData = {
  fullName: string;
  dateOfBirth: Date;
  gender: Gender;
};

export type ChangePasswordData = {
  password: string;
  password2: string;
};
