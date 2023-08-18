import { SERVER } from "./constants/url";
import axios from "axios";
import { LoginData, SignUpData } from "./model/Student";

export const getUpcomingLesson = async () =>
  axios.get(`${SERVER}/api/lessons/upcoming`);
export const getAllLesson = async () => axios.get(`${SERVER}/api/lessons`);

export const signup = async (data: SignUpData) =>
  axios.post(`${SERVER}/api/auth/signup`, data, { withCredentials: true });

export const login = async (data: LoginData) =>
  axios.post(`${SERVER}/api/auth/login`, data, { withCredentials: true });

export const logout = async () =>
  axios.get(`${SERVER}/api/auth/logout`, { withCredentials: true });

export const getMe = async () =>
  axios.get(`${SERVER}/api/students/me`, { withCredentials: true });
