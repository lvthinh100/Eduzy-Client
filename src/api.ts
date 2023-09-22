import { SERVER } from "./constants/url";
import axios from "axios";
import { LoginData, SignUpData } from "./model/Student";
import { type } from "os";
import { AnswerType, FetchAnswerType, LBReqType } from "./model/Exam";

export const getUpcomingLesson = async (type: string) =>
  axios.get(`${SERVER}/api/lessons/upcoming/${type}`);
export const getAllLesson = async () => axios.get(`${SERVER}/api/lessons`);

export const signup = async (data: SignUpData) =>
  axios.post(`${SERVER}/api/auth/signup`, data, { withCredentials: true });

export const login = async (data: LoginData) =>
  axios.post(`${SERVER}/api/auth/login`, data, { withCredentials: true });

export const logout = async () =>
  axios.get(`${SERVER}/api/auth/logout`, { withCredentials: true });

export const getMe = async () =>
  axios.get(`${SERVER}/api/students/me`, { withCredentials: true });

// Exams
export const getExams = async () => axios.get(`${SERVER}/api/exams`);
export const getExamById = async (id: string) =>
  axios.get(`${SERVER}/api/exams/${id}`);

export const getExamByName = async (name: string) =>
  axios.get(`${SERVER}/api/exams/name/${name}`);

export const registerExam = async (examId: string, studentId: string) => {
  const requestData = { examId, studentId };

  const response = await axios.post(
    `${SERVER}/api/exams/registerExam`,
    requestData,
    {
      withCredentials: true,
    }
  );
  return response.data; // You can process the response as needed
};

//Filters
export const getFilters = async () => axios.get(`${SERVER}/api/filters`);

//Answers

export const postAnswer = async (data: AnswerType) => {
  const requestData = data;
  const response = await axios.post(`${SERVER}/api/answer`, requestData);
  return response.data; // You can process the response as needed
};

export const fetchAnswer = async (data: FetchAnswerType) => {
  const requestData = data;
  const response = await axios.post(`${SERVER}/api/answer/fetch`, requestData);
  return response.data; // You can process the response as needed
};

//Leader Board

export const getStudentLBs = async (data: LBReqType) => {
  const requestData = data;
  const response = await axios.post(`${SERVER}/api/leaderBoard`, requestData);
  return response.data; // You can process the response as needed
};
